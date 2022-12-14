/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

/**
 * Before running this C++ code example, set up your development environment, including your credentials.
 *
 * For more information, see the following documentation topic:
 *
 * https://docs.aws.amazon.com/sdk-for-cpp/v1/developer-guide/getting-started.html
 *
 * Purpose
 *
 * Demonstrates using the AWS SDK for C++ to create an S3 bucket and upload objects to S3 buckets.
 *
 * 1. Create a bucket.
 * 2. Upload a local file to the bucket.
 * 3. Download the object to a local file.
 * 4. Copy the object to a different "folder" in the bucket.
 * 5. List objects in the bucket.
 * 6. Delete all objects in the bucket.
 * 7. Delete the bucket.
 *
 */

// snippet-start:[cpp.example_code.autoscaling.groups_and_instances_scenario]
#include <iostream>
#include <aws/core/Aws.h>
#include <aws/autoscaling/AutoScalingClient.h>

namespace AwsDoc {
    namespace AutoScaling {
        bool groupsAndInstancesScenario(const Aws::Client::ClientConfiguration &clientConfig);
    } // AutoScaling
} // AwsDoc


//! Scenario TODO:(developer).
/*!
  \sa S3_GettingStartedScenario()
  \param clientConfig Aws client configuration.
 */
bool AwsDoc::AutoScaling::groupsAndInstancesScenario(const Aws::Client::ClientConfiguration &clientConfig) {

    Aws::AutoScaling::AutoScalingClient client(clientConfig);



    return true;
}
// snippet-end:[cpp.example_code.s3.Scenario_GettingStarted]

#ifndef TESTING_BUILD

int main(int argc, const char *argv[]) {

    if (argc != 3) {
        std::cout << "Usage:\n" <<
                  "    <uploadFilePath> <saveFilePath>\n\n" <<
                  "Where:\n" <<
                  "   uploadFilePath - The path where the file is located (for example, C:/AWS/book2.pdf).\n" <<
                  "   saveFilePath - The path where the file is saved after it's " <<
                  "downloaded (for example, C:/AWS/book2.pdf). " << std::endl;
        return 1;
    }

    Aws::String objectPath = argv[1];
    Aws::String savePath = argv[2];

    Aws::SDKOptions options;
    InitAPI(options);

    {
        Aws::Client::ClientConfiguration clientConfig;
        AwsDoc::S3::S3_GettingStartedScenario(objectPath, savePath, clientConfig);
    }

    ShutdownAPI(options);

    return 0;
}

#endif // TESTING_BUILD


