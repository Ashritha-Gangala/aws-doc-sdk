/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

#include "cognito_gtests.h"
#include <fstream>
#include <aws/core/client/ClientConfiguration.h>

Aws::SDKOptions AwsDocTest::Cognito_GTests::s_options;
std::unique_ptr<Aws::Client::ClientConfiguration> AwsDocTest::Cognito_GTests::s_clientConfig;

void AwsDocTest::Cognito_GTests::SetUpTestSuite() {
    InitAPI(s_options);

    // s_clientConfig must be a pointer because the client config must be initialized
    // after InitAPI.
    s_clientConfig = std::make_unique<Aws::Client::ClientConfiguration>();
}

void AwsDocTest::Cognito_GTests::TearDownTestSuite() {
     ShutdownAPI(s_options);

}

void AwsDocTest::Cognito_GTests::SetUp() {
    m_savedBuffer = std::cout.rdbuf();
    std::cout.rdbuf(&m_coutBuffer);
}

void AwsDocTest::Cognito_GTests::TearDown() {
    if (m_savedBuffer != nullptr) {
        std::cout.rdbuf(m_savedBuffer);
        m_savedBuffer = nullptr;
    }
}

Aws::String AwsDocTest::Cognito_GTests::preconditionError() {
    return "Failed to meet precondition.";
}

