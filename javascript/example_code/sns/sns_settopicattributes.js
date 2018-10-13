//snippet-sourceauthor: [daviddeyo]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[5/25/18]

// Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache-2.0 License on an "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND.   

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-managing-topics.html 
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});

// Create setTopicAttributes parameters
var params = {
  AttributeName: 'DisplayName', /* required */
  TopicArn: 'TOPIC_ARN', /* required */
  AttributeValue: 'First Topic'
};

// Create promise and SNS service object
var setTopicAttribsPromise = new AWS.SNS({apiVersion: '2010-03-31'}).setTopicAttributes(params).promise();

// handle promise's fulfilled/rejected states
setTopicAttribsPromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
