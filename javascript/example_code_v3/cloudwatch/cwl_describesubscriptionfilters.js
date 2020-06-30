/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS JavaScript SDK,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cloudwatch-examples-subscriptions.html

Purpose:
cwl_describesubscriptionfilters.js demonstrates how to list the subscription filters for an Amazon CloudWatch Logs group.

Inputs: (all into command line below)
- REGION
- GROUP_NAME

Running the code:
node cwl_describesubscriptionfilters.js REGION GROUP_NAME
*/
// snippet-start:[cwLogs.JavaScript.v3.cwl.describeSubscriptionFilters]
// Import required AWS SDK clients and commands for Node.js
const {CloudWatchLogs, DescribeSubscriptionFiltersCommand} = require("@aws-sdk/client-cloudwatch-logs");
// Set the AWS Region
const region = process.argv[2];
// Create CloudWatch service object
const cwl = new CloudWatchLogs(region);
// Set the parameters
const params = {
  logGroupName: process.argv[3],
  limit: 5
};

async function run() {
  try {
    const data = await cwl.send(new DescribeSubscriptionFiltersCommand(params));
    console.log("Success", data.subscriptionFilters);
  }
  catch(err){
    console.log("Error", err);
  }
};
run();
// snippet-end:[cwLogs.JavaScript.v3.cwl.describeSubscriptionFilters]
exports.run = run; //for unit tests only
