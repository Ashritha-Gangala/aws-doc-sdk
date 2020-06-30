/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with Version 3 (V3) of the AWS JavaScript SDK,
which is scheduled for release later in 2020. The prerelease version of the SDK is available
at https://github.com/aws/aws-sdk-js-v3. The 'SDK for JavaScript Developer Guide' for V3 is also
scheduled for release later in 2020, and the topic containing this example will be hosted at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cloudwatch-examples-sending-events.html.

Purpose:
cwe_putrule.js demonstrates how to create or update an Amazon CloudWatch Events rule.

Inputs:
- REGION IAM_ROLE_ARN

Running the code:
node cw_deletealarm.js REGION IAM_ROLE_ARN
*/
// snippet-start:[cwEvents.JavaScript.v3.cwe.putRule]
// Import required AWS SDK clients and commands for Node.js
const {CloudWatchEvents, PutRuleCommand} = require("@aws-sdk/client-cloudwatch-events");
// Set the AWS Region
const region = process.argv[2];
// Create CloudWatch service object
const cwevents = new CloudWatchEvents(region);
// Set the parameters
const params = {
  Name: 'DEMO_EVENT',
  RoleArn: process.argv[3],
  ScheduleExpression: 'rate(5 minutes)',
  State: 'ENABLED'
};

async function run() {
  try {
      const data = await cwevents.send(new PutRuleCommand(params));
    console.log("Success, scheduled rule created; Rule ARN:", data.RuleArn);
  }
  catch(err){
    console.log("Error", err);
  }
};
run();
// snippet-end:[cwEvents.JavaScript.v3.cwe.putRule]
exports.run = run; //for unit tests only
