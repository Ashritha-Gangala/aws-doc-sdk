# AWS Auto Scaling code examples for the SDK for Java

## Overview
This README discusses how to run and test the AWS SDK for Java (V2) examples for AWS Auto Scaling.

AWS Auto Scaling lets you build scaling plans that automate how groups of different resources respond to changes in demand.

## ⚠️ Important
* The SDK for Java examples perform AWS operations for the account and AWS Region for which you've specified credentials. Running these examples might incur charges on your account. For details about the charges you can expect for a given service and API operation, see [AWS Pricing](https://aws.amazon.com/pricing/).
* Running the tests might result in charges to your AWS account.
* We recommend that you grant your code least privilege. At most, grant only the minimum permissions required to perform the task. For more information, see [Grant least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege). 
* This code is not tested in every AWS Region. For more information, see [AWS Regional Services](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services).

## Code examples

### Single action

The following examples use the **AutoScalingClient** object:

- [Creating an Auto Scaling group](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/appsync/src/main/java/com/example/appsync/CreateAutoScalingGroup.java) (CreateAutoScalingGroup command)
- [Deleting an Auto Scaling group](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/appsync/src/main/java/com/example/appsync/DeleteAutoScalingGroup.java) (DeleteAutoScalingGroup command)
- [Getting information about the Auto Scaling group](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/appsync/src/main/java/com/example/appsync/DescribeAutoScalingInstances.java) (DescribeAutoScalingGroups command)
- [Removing an instance from an Auto Scaling group](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javav2/example_code/appsync/src/main/java/com/example/appsync/DetachInstances.java) (DetachInstances command)

## Running the AWS Auto Scaling Java files

Some of these examples perform *destructive* operations on AWS resources, such as deleting an AWS Auto Scaling group. **Be very careful** when running an operation that deletes or modifies AWS resources in your account. We recommend creating separate test-only resources when experimenting with these examples.

To run these examples, set up your development environment. For more information, 
see [Get started with the SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html). 


 ## Testing the AWS Auto Scaling Java files

You can test the Java code examples for AWS Auto Scaling by running a test file named **AutoScaleTest**. This file uses JUnit 5 to run the JUnit tests and is located in the **src/test/java** folder. For more information, see [https://junit.org/junit5/](https://junit.org/junit5/).

You can run the JUnit tests from an IDE, such as IntelliJ, or from the command line. As each test runs, you can view messages that inform you if the various tests succeed or fail. For example, the following message informs you that Test 3 passed.

	Test 3 passed

**WARNING**: _Running these JUnit tests manipulates real Amazon resources and might incur charges on your account._

 ### Properties file
Before running the AWS Elastic Beanstalk JUnit tests, you must define values in the **config.properties** file located in the **resources** folder. This file contains values that are required to run the JUnit tests. For example, you define a crawler name used in the tests. If you do not define all values, the JUnit tests fail.

Define these values to successfully run the JUnit tests:

- **groupName** - The name of the Auto Scaling group.  
- **groupNameSc** - The name of the Auto Scaling group used in the scenario.  
- **launchTemplateName** - The name of the launch template. 
- **vpcZoneId** - A subnet Id for a virtual private cloud (VPC) where instances in the Auto Scaling group can be created. 
- **serviceLinkedRoleARN** - The Amazon Resource Name (ARN) of the service-linked role that the Auto Scaling group uses.

## Additional resources
* [Developer Guide - AWS SDK for Java](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/home.html).
* [Developer Guide - Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html).

Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. SPDX-License-Identifier: Apache-2.0

