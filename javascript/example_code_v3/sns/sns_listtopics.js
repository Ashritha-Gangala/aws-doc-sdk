/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS JavaScript SDK, 
which is scheduled for release later in 2020. The pre-release version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/sns-examples-managing-topics.html.

Purpose:
sns_listtopics.js demonstrates how to retrieve a list of Amazon SNS topics.

Inputs:
- REGION (into command line below)

Running the code:
node sns_listtopics.js REGION
 */
// snippet-start:[sns.JavaScript.v3.topics.listTopics]
// Import required AWS SDK clients and commands for Node.js
const {SNS, ListTopicsCommand} = require("@aws-sdk/client-sns");
// Set the AWS Region
const region = process.argv[2];
// Create SNS service object
const sns = new SNS(region);

async function run() {
    try {
        const data = await sns.send(new ListTopicsCommand({}));
        console.log(data.Topics);
    } catch (err) {
        console.error(err, err.stack);
    }
};
run();
// snippet-end:[sns.JavaScript.v3.topics.listTopics]
exports.run = run; //for unit tests only
