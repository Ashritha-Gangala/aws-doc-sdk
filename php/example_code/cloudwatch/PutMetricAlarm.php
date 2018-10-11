<?php
/**
 * Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 *  ABOUT THIS PHP SAMPLE: This sample is part of the SDK for PHP Developer Guide topic at
 * https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/cw-examples-work-with-alarms.html
 *
 */
require 'vendor/autoload.php';

use Aws\CloudWatch\CloudWatchClient;
use Aws\Exception\AwsException;

/**
 * Put Metric Alarm
 *
 * This code expects that you have AWS credentials set up per:
 * https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/guide_credentials.html
 */

$client = new CloudWatchClient([
    'profile' => 'default',
    'region' => 'us-west-2',
    'version' => '2010-08-01'
]);

try {
    $result = $client->putMetricAlarm(array(
        // AlarmName is required
        'AlarmName' => 'string',
        // MetricName is required
        'MetricName' => 'string',
        // Namespace is required
        'Namespace' => 'string',
        // Statistic is required
        //string: SampleCount | Average | Sum | Minimum | Maximum
        'Statistic' => 'string',
        // Period is required
        'Period' => integer,
        'Unit' => 'Count/Second',
        // EvaluationPeriods is required
        'EvaluationPeriods' => integer,
        // Threshold is required
        'Threshold' => interger,
        // ComparisonOperator is required
        // string: GreaterThanOrEqualToThreshold | GreaterThanThreshold | LessThanThreshold | LessThanOrEqualToThreshold
        'ComparisonOperator' => 'string',
    ));
    var_dump($result);
} catch (AwsException $e) {
    // output error message if fails
    error_log($e->getMessage());
}
 

//snippet-sourcedescription:[<<FILENAME>> demonstrates how to ...]
//snippet-keyword:[PHP]
//snippet-keyword:[Code Sample]
//snippet-service:[<<ADD SERVICE>>]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[]
//snippet-sourceauthor:[AWS]

