//snippet-sourcedescription:[Scenario.java demonstrates how to perform various operations.]
//snippet-keyword:[SDK for Java v2]
//snippet-keyword:[Code Sample]
//snippet-service:[Amazon DynamoDB]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[02/11/2022]
//snippet-sourceauthor:[scmacdon - aws]

/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

package com.example.dynamodb;

import com.fasterxml.jackson.databind.JsonNode;
import software.amazon.awssdk.core.waiters.WaiterResponse;
import software.amazon.awssdk.enhanced.dynamodb.*;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;
import software.amazon.awssdk.services.dynamodb.waiters.DynamoDbWaiter;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.io.File;
import java.io.IOException;
import java.util.*;


/**
 * To run this Java V2 code example, ensure that you have setup your development environment, including your credentials.
 *
 * For information, see this documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
 *
 *  This example performs these tasks:
 *
 * 1. Create the Movie table with partition and sort key.
 * 2. Put data into the Amazon DynamoDB table from a JSON document.
 * 3. Add a new item.
 * 4. Get an item by Key and sort key
 * 5. Update an item.
 * 6. Use a Scan to query items using the Enhanced client
 * 7. Query all items where the year is 2013 using the Enhanced Client
 * 8. Delete the table.
 */

public class Scenario {

    public static void main(String[] args) throws IOException {

            String tableName = "Movies";

            Region region = Region.US_EAST_1;
            DynamoDbClient ddb = DynamoDbClient.builder()
                    .region(region)
                    .build();

            System.out.println("******* Creating an Amazon DynamoDB table named Movies with a key named year and a sort key named title.");
            createTable(ddb, tableName);

            System.out.println("******* Loading data into the Amazon DynamoDB table.");
            loadData(ddb, tableName);

            System.out.println("******* Getting data from the Movie table.");
            getItem(ddb) ;

            System.out.println("******* Putting a record into the Amazon DynamoDB table.");
            putRecord(ddb);

            System.out.println("******* Updating a record");
            updateTableItem(ddb, tableName)  ;

            System.out.println("******* Scanning the Amazon DynamoDB table.");
            scanMovies(ddb, tableName);

            System.out.println("******* Querying the Movies released in 2013.");
            queryTable(ddb);

            System.out.println("******* Deleting the Amazon DynamoDB table.");
            deleteDynamoDBTable(ddb, tableName);
            ddb.close();
        }

    // Create a table with a Sort key.
    public static void createTable(DynamoDbClient ddb, String tableName) {

        DynamoDbWaiter dbWaiter = ddb.waiter();
        ArrayList<AttributeDefinition> attributeDefinitions = new ArrayList<AttributeDefinition>();

        // Define attributes.
        attributeDefinitions.add(AttributeDefinition.builder()
                .attributeName("year")
                .attributeType("N")
                .build());

        attributeDefinitions.add(AttributeDefinition.builder()
                .attributeName("title")
                .attributeType("S")
                .build());

        ArrayList<KeySchemaElement> tableKey = new ArrayList<KeySchemaElement>();
        KeySchemaElement key = KeySchemaElement.builder()
                .attributeName("year")
                .keyType(KeyType.HASH)
                .build();

        KeySchemaElement key2 = KeySchemaElement.builder()
                .attributeName("title")
                .keyType(KeyType.RANGE) // Sort
                .build();

        // Add KeySchemaElement objects to the list.
        tableKey.add(key);
        tableKey.add(key2);

        CreateTableRequest request = CreateTableRequest.builder()
                .keySchema(tableKey)
                .provisionedThroughput(ProvisionedThroughput.builder()
                        .readCapacityUnits(new Long(10))
                        .writeCapacityUnits(new Long(10))
                        .build())
                .attributeDefinitions(attributeDefinitions)
                .tableName(tableName)
                .build();

        try {
            CreateTableResponse response = ddb.createTable(request);
            DescribeTableRequest tableRequest = DescribeTableRequest.builder()
                    .tableName(tableName)
                    .build();

            // Wait until the Amazon DynamoDB table is created.
            WaiterResponse<DescribeTableResponse> waiterResponse =  dbWaiter.waitUntilTableExists(tableRequest);
            waiterResponse.matched().response().ifPresent(System.out::println);
            String newTable = response.tableDescription().tableName();
            System.out.println("The " +newTable + " was successfully created.");

        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    // Query the table
    public static void queryTable(DynamoDbClient ddb) {
            try {

                DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
                        .dynamoDbClient(ddb)
                        .build();

                DynamoDbTable<Movies> custTable = enhancedClient.table("Movies", TableSchema.fromBean(Movies.class));

                    QueryConditional queryConditional = QueryConditional
                            .keyEqualTo(Key.builder()
                                    .partitionValue(2013)
                                    .build());

                    // Get items in the table and write out the ID value
                    Iterator<Movies> results = custTable.query(queryConditional).items().iterator();
                    String result="";

                    while (results.hasNext()) {
                        Movies rec = results.next();
                        System.out.println("The title of the movie is "+rec.getTitle());
                        System.out.println("The movie information  is "+rec.getInfo());
                    }

                } catch (DynamoDbException e) {
                    System.err.println(e.getMessage());
                    System.exit(1);
                }
        }

        // Scan the table.
        public static void scanMovies(DynamoDbClient ddb, String tableName) {

            System.out.println("******* Scanning all movies.\n");

            try{
                DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
                        .dynamoDbClient(ddb)
                        .build();

                DynamoDbTable<Movies> custTable = enhancedClient.table("Movies", TableSchema.fromBean(Movies.class));
                Iterator<Movies> results = custTable.scan().items().iterator();
                while (results.hasNext()) {

                    Movies rec = results.next();
                    System.out.println("The movie title is "+rec.getTitle());
                    System.out.println("The movie year is " +rec.getYear());
                }

            } catch (DynamoDbException e) {
                System.err.println(e.getMessage());
                System.exit(1);
            }
        }

        // Load data into the table.
        public static void loadData(DynamoDbClient ddb, String tableName) throws IOException {

            JsonParser parser = new JsonFactory().createParser(new File("C:\\AWS\\moviedata.json"));
            com.fasterxml.jackson.databind.JsonNode rootNode = new ObjectMapper().readTree(parser);
            Iterator<JsonNode> iter = rootNode.iterator();
            ObjectNode currentNode;
            int t = 0 ;
            while (iter.hasNext()) {

                //only add 200 Movies to the table
                if (t == 200)
                    break ;
                currentNode = (ObjectNode) iter.next();

                int year = currentNode.path("year").asInt();
                String title = currentNode.path("title").asText();
                String info =  currentNode.path("info").toString();

                putMovie(ddb, tableName, year, title, info);
                t++;
            }
       }

        // Populate the table with data.
        public static void putMovie(DynamoDbClient ddb,
                String tableName,
                int year,
                String title,
                String info) {

            String yr =String.valueOf(year);
            HashMap<String, AttributeValue> item = new HashMap<String, AttributeValue>();

            item.put("year", AttributeValue.builder().n(yr).build());
            item.put("title", AttributeValue.builder().s(title).build());
            item.put("info",  AttributeValue.builder().s(info).build());

            PutItemRequest request = PutItemRequest.builder()
                    .tableName(tableName)
                    .item(item)
                    .build();

            try {
                ddb.putItem(request);
                System.out.println("Added "+ title +" to the Movie table.");

            } catch (DynamoDbException e) {
                System.err.println(e.getMessage());
                System.exit(1);
            }
        }

    // Update the record to include show directors.
    public static void updateTableItem(DynamoDbClient ddb, String tableName  ){

        HashMap<String,AttributeValue> itemKey = new HashMap<String,AttributeValue>();

        // Specify the key and sort key
        itemKey.put("year", AttributeValue.builder().n("1933").build());
        itemKey.put("title", AttributeValue.builder().s("King Kong").build());

        HashMap<String,AttributeValueUpdate> updatedValues =
                new HashMap<String,AttributeValueUpdate>();

        // Update the column specified by name with updatedVal
        updatedValues.put("info", AttributeValueUpdate.builder()
                .value(AttributeValue.builder().s("{\"directors\":[\"Merian C. Cooper\",\"Ernest B. Schoedsack\"]").build())
                .action(AttributeAction.PUT)
                .build());

        UpdateItemRequest request = UpdateItemRequest.builder()
                .tableName(tableName)
                .key(itemKey)
                .attributeUpdates(updatedValues)
                .build();

        try {
            ddb.updateItem(request);
        } catch (ResourceNotFoundException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }

        System.out.println("Item was updated!");
    }

    public static void deleteDynamoDBTable(DynamoDbClient ddb, String tableName) {

        DeleteTableRequest request = DeleteTableRequest.builder()
                .tableName(tableName)
                .build();

        try {
            ddb.deleteTable(request);

        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
        System.out.println(tableName +" was successfully deleted!");
    }

    public static void putRecord(DynamoDbClient ddb) {

        try {

            // Create a DynamoDbEnhancedClient and use the DynamoDbClient object.
            DynamoDbEnhancedClient enhancedClient = DynamoDbEnhancedClient.builder()
                    .dynamoDbClient(ddb)
                    .build();

            // Create a DynamoDbTable object based on Issues.
            DynamoDbTable<Movies> table = enhancedClient.table("Movies", TableSchema.fromBean(Movies.class));

                // Populate the Table
            Movies record = new Movies();
            record.setYear(2020);
            record.setTitle("My Movie2");
            record.setInfo("no info");

            // Put the data into a DynamoDB table
            table.putItem(record);

        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
        System.out.println("Added a new issue to the table.");
    }

    public static void getItem(DynamoDbClient ddb) {

            HashMap<String,AttributeValue> keyToGet = new HashMap<String,AttributeValue>();

            keyToGet.put("year", AttributeValue.builder()
                    .n("1933")
                    .build());

            keyToGet.put("title", AttributeValue.builder()
                    .s("King Kong")
                    .build());

            GetItemRequest request = GetItemRequest.builder()
                    .key(keyToGet)
                    .tableName("Movies")
                    .build();

            try {
                Map<String,AttributeValue> returnedItem = ddb.getItem(request).item();

                if (returnedItem != null) {
                    Set<String> keys = returnedItem.keySet();
                    System.out.println("Amazon DynamoDB table attributes: \n");

                    for (String key1 : keys) {
                        System.out.format("%s: %s\n", key1, returnedItem.get(key1).toString());
                    }
                } else {
                    System.out.format("No item found with the key %s!\n", "year");
                }
            } catch (DynamoDbException e) {
                System.err.println(e.getMessage());
                System.exit(1);
            }
    }
}

