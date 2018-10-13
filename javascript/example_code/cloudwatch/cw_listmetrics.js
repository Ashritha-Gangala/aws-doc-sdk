//snippet-sourceauthor: [daviddeyo]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[5/25/18]

// Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache-2.0 License on an "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND.   

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide//cloudwatch-examples-getting-metrics.html 
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create CloudWatch service object
var cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

var params = {
  Dimensions: [
    {
      Name: 'LogGroupName', /* required */
    },
  ],
  MetricName: 'IncomingLogEvents',
  Namespace: 'AWS/Logs'
};

cw.listMetrics(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Metrics", JSON.stringify(data.Metrics));
  }
});
