/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/

#include "autoscaling_gtests.h"
#include <fstream>
#include <aws/core/client/ClientConfiguration.h>

Aws::SDKOptions AwsDocTest::AutoScaling_GTests::s_options;
std::unique_ptr<Aws::Client::ClientConfiguration> AwsDocTest::AutoScaling_GTests::s_clientConfig;

void AwsDocTest::AutoScaling_GTests::SetUpTestSuite() {
    InitAPI(s_options);

    // s_clientConfig must be a pointer because the client config must be initialized
    // after InitAPI.
    s_clientConfig = std::make_unique<Aws::Client::ClientConfiguration>();
}

void AwsDocTest::AutoScaling_GTests::TearDownTestSuite() {
     ShutdownAPI(s_options);

}

void AwsDocTest::AutoScaling_GTests::SetUp() {
    m_savedBuffer = std::cout.rdbuf();
    std::cout.rdbuf(&m_coutBuffer);

    m_savedInBuffer = std::cin.rdbuf();
    std::cin.rdbuf(&m_cinBuffer);

    // The following code is needed for the AwsDocTest::MyStringBuffer::underflow exception.
    // Otherwise, we get an infinite loop when the buffer is empty.
    std::cin.exceptions(std::ios_base::badbit);
}

void AwsDocTest::AutoScaling_GTests::TearDown() {
    if (m_savedBuffer != nullptr) {
        std::cout.rdbuf(m_savedBuffer);
        m_savedBuffer = nullptr;
    }

    if (m_savedInBuffer != nullptr) {
        std::cin.rdbuf(m_savedInBuffer);
        std::cin.exceptions(std::ios_base::goodbit);
        m_savedInBuffer = nullptr;
    }
}

void AwsDocTest::AutoScaling_GTests::AddCommandLineResponses(
        const std::vector<std::string> &responses) {

    std::stringstream stringStream;
    for (auto &response: responses) {
        stringStream << response << "\n";
    }
    m_cinBuffer.str(stringStream.str());
}

Aws::String AwsDocTest::AutoScaling_GTests::preconditionError() {
    return "Failed to meet precondition.";
}


int AwsDocTest::MyStringBuffer::underflow() {
    int result = basic_stringbuf::underflow();
    if (result == EOF) {
        std::cerr << "Error AwsDocTest::MyStringBuffer::underflow." << std::endl;
        throw std::underflow_error("AwsDocTest::MyStringBuffer::underflow");
    }

    return result;
}

