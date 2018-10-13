//snippet-sourceauthor: [soo-aws]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[N/A]

/*
 * Copyright 2011-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *    http://aws.amazon.com/apache2.0
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES
 * OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and
 * limitations under the License.
 */
package com.example.sqs;
import software.amazon.awssdk.services.sqs.SQSClient;
import software.amazon.awssdk.services.sqs.model.ChangeMessageVisibilityBatchRequest;
import software.amazon.awssdk.services.sqs.model.ChangeMessageVisibilityBatchRequestEntry;
import software.amazon.awssdk.services.sqs.model.ChangeMessageVisibilityRequest;
import software.amazon.awssdk.services.sqs.model.CreateQueueRequest;
import software.amazon.awssdk.services.sqs.model.SQSException;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;
import software.amazon.awssdk.services.sqs.model.CreateQueueResponse;
import software.amazon.awssdk.services.sqs.model.GetQueueUrlRequest;
import software.amazon.awssdk.services.sqs.model.QueueNameExistsException;
import software.amazon.awssdk.services.sqs.model.ReceiveMessageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

public class VisibilityTimeout
{
    // Change the visibility timeout for a single message
    public static void changeMessageVisibilitySingle(
            String queue_url, int timeout)
    {
    	SQSClient sqs = SQSClient.builder().build();

        // Get the receipt handle for the first message in the queue.
    	ReceiveMessageRequest receiveRequest = ReceiveMessageRequest.builder()
    			.queueUrl(queue_url)
    			.build();
        String receipt = sqs.receiveMessage(receiveRequest)
                            .messages()
                            .get(0)
                            .receiptHandle();

        ChangeMessageVisibilityRequest visibilityRequest = ChangeMessageVisibilityRequest.builder()
        		.queueUrl(queue_url)
        		.receiptHandle(receipt)
        		.visibilityTimeout(timeout)
        		.build();
        sqs.changeMessageVisibility(visibilityRequest);
    }

    // Change the visibility timeout for multiple messages.
    public static void changeMessageVisibilityMultiple(
            String queue_url, int timeout)
    {
        SQSClient sqs = SQSClient.builder().build();

        List<ChangeMessageVisibilityBatchRequestEntry> entries =
            new ArrayList<ChangeMessageVisibilityBatchRequestEntry>();
        
        ReceiveMessageRequest receiveRequest = ReceiveMessageRequest.builder()
    			.queueUrl(queue_url)
    			.build();

        String receipt = sqs.receiveMessage(receiveRequest)
        		.messages()
                .get(0)
                .receiptHandle();
        
        entries.add(ChangeMessageVisibilityBatchRequestEntry.builder()
        		.id("unique_id_msg1")
        		.receiptHandle(receipt)
        		.visibilityTimeout(timeout)
        		.build());

        entries.add(ChangeMessageVisibilityBatchRequestEntry.builder()
        		.id("unique_id_msg2")
        		.receiptHandle(receipt)
        		.visibilityTimeout(timeout + 200)
        		.build());

        ChangeMessageVisibilityBatchRequest batchRequest = ChangeMessageVisibilityBatchRequest.builder()
        		.queueUrl(queue_url)
        		.entries(entries)
        		.build();
        sqs.changeMessageVisibilityBatch(batchRequest);
    }

    public static void main(String[] args)
    {
        final String queue_name = "testQueue" + new Date().getTime();
        SQSClient sqs = SQSClient.builder().build();

        // first, create a queue (unless it exists already)
        
        CreateQueueRequest createRequest = CreateQueueRequest.builder()
        		.queueName(queue_name)
        		.build();
        try {
            CreateQueueResponse cq_result = sqs.createQueue(createRequest);
        } catch (QueueNameExistsException e) {
        	throw e;
        	
        	
        }

        GetQueueUrlRequest getRequest = GetQueueUrlRequest.builder()
        		.queueName(queue_name)
        		.build();
        final String queue_url = sqs.getQueueUrl(getRequest).queueUrl();

        // Send some messages to the queue
        for (int i = 0; i < 20; i++) {
        	SendMessageRequest sendRequest = SendMessageRequest.builder()
        			.queueUrl(queue_url)
        			.messageBody("This is message " + i)
        			.build();
            sqs.sendMessage(sendRequest);
        }

        // change visibility timeout (single)
        changeMessageVisibilitySingle(queue_url, 3600);

        // change visibility timeout (multiple)
        changeMessageVisibilityMultiple(queue_url, 2000);
    }
}

