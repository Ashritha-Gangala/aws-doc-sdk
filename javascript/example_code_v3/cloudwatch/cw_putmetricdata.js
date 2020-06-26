/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This sample is part of the SDK for JavaScript Developer Guide (scheduled for release September 2020) topic at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide//cloudwatch-examples-getting-metrics.html.

Purpose:
cw_putmetricdata.js demonstrates how to publish metric data to Amazon CloudWatch.

Inputs:
- REGION

Running the code:
node cw_putmetricdata.js REGION
*/
// snippet-start:[cw.JavaScript.v3.metrics.putMetricData]
// Import required AWS SDK clients and commands for Node.js
const {CloudWatch, PutMetricDataCommand} = require("@aws-sdk/client-cloudwatch");
// Set the AWS Region
const region = process.argv[2];
// Create CloudWatch service object
const cw = new CloudWatch(region);
// Set the parameters
const params = {
  MetricData: [
    {
      MetricName: 'PAGES_VISITED',
      Dimensions: [
        {
          Name: 'UNIQUE_PAGES',
          Value: 'URLS'
        },
      ],
      Unit: 'None',
      Value: 1.0
    },
  ],
  Namespace: 'SITE/TRAFFIC'
};

async function run() {
  try {
    const data = await cw.send(new PutMetricDataCommand(params));
    console.log("Success, alarm deleted; requestID:", data.$metadata.requestId);
  }
  catch(err){
    console.log("Error", err);
  }
};
run();
// snippet-end:[cw.JavaScript.v3.metrics.putMetricData]
exports.run = run; //for unit tests only
