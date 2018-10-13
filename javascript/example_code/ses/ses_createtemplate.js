//snippet-sourceauthor: [daviddeyo]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[5/25/18]

// Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Apache-2.0 License on an "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND.   

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples-creating-template.html
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'REGION'});

// Create createTemplate params JSON
var params = {
  Template: { 
    TemplateName: 'TEMPLATE_NAME', /* required */
    HtmlPart: 'HTML_CONTENT',
    SubjectPart: 'SUBJECT_LINE',
    TextPart: 'TEXT_CONTENT'
  }
};

// Create the promise and SES service object
var templatePromise = new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(params).promise();

// Handle promise's fulfilled/rejected states
templatePromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
