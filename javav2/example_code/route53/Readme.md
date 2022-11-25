# Amazon Route 53 code examples for the SDK for Java

## Overview
This README discusses how to run and test the AWS SDK for Java (v2) examples for Amazon Route 53.

Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. Route 53 connects user requests to internet applications running on AWS or on-premises.

## ⚠️ Important
* The SDK for Java examples perform AWS operations for the account and AWS Region for which you've specified credentials. 
* Running these examples might incur charges on your account. For details about the charges you can expect for a given service and API operation, see [AWS Pricing](https://aws.amazon.com/pricing/).
* We recommend that you grant your code least privilege. At most, grant only the minimum permissions required to perform the task. For more information, see [Grant least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege). 
* This code is not tested in every AWS Region. For more information, see [AWS Regional Services](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services).

## Code examples

The credential provider used in all code examples is ProfileCredentialsProvider. For more information, see [Using credentials](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/credentials.html).

### Get started

- [Hello service](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/HelloRoute53.java) (describeServices command)

### Single action

Code excerpts that show you how to call individual service functions.

- [Create a new health check](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/CreateHealthCheck.java) (createHealthCheck command)
- [Create a hosted zone](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/CreateHostedZone.java) (createHostedZone command)
- [Delete a health check](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/DeleteHealthCheck.java) (deleteHealthCheck command)
- [Delete a hosted zone](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/DeleteHostedZone.java) (deleteHostedZone command)
- [Get the status of a specific health check](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/GetHealthCheckStatus.java) (getHealthCheckStatus command)
- [List health checks](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/ListHealthChecks.java) (listHealthChecks command)
- [List hosted zones](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/ListHostedZones.java) (listHostedZones command)
- [List resource record sets](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/ListResourceRecordSets.java) (listResourceRecordSets command)
- [Update a health check](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/UpdateHealthCheck.java) (updateHealthCheck command)

### Scenario 

Code examples that show you how to accomplish a specific task by calling multiple functions within the same service.

- [Get started with domains](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/route53/src/main/java/com/example/route/Route53Scenario.java) (Multiple commands)

## Run the Amazon Route 53 Java files

**Be very careful** when running an operation that deletes or modifies AWS resources in your account. We recommend creating separate test-only resources when experimenting with these examples.

To run these examples, set up your development environment. For more information, 
see [Get started with the SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html). 


 ## Test the Amazon Route 53 Java files

You can test the Java code example for Amazon Route 53 by running a test file named **Route53Test**. This file uses JUnit 5 to run the JUnit tests and is located in the **src/test/java** folder. For more information, see [https://junit.org/junit5/](https://junit.org/junit5/).

You can run the JUnit tests from an IDE, such as IntelliJ, or from the command line. As each test runs, you can view messages that inform you if the various tests succeed or fail. For example, the following message informs you that Test 3 passed.

	Test 3 passed

**WARNING**: _Running these JUnit tests manipulates real AWS resources and might incur charges on your account._

 ### Properties file
Before running the JUnit tests, you must define values in the **config.properties** file located in the **resources** folder. This file contains values that are required to run the JUnit tests. If you do not define all values, the JUnit tests fail.

Define this value to successfully run the JUnit tests:

- **domainName** - The fully qualified domain name.
- **domainSuggestionSc** - The domain suggestion (for example, findmy.accountants).
- **domainTypeSc** - The domain type (for example, com).

## Additional resources
* [Developer Guide - AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html).
* [Developer Guide - Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).
* [Interface Route53Client](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/route53/Route53Client.html).
* [Interface Route53DomainsClient](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/route53domains/Route53DomainsClient.html).

Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. SPDX-License-Identifier: Apache-2.0
