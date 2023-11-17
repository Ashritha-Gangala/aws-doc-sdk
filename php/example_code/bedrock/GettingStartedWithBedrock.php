<?php

# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

# snippet-start:[php.example_code.bedrock.basics.scenario]
namespace Bedrock;

use AwsUtilities\RunnableExample;

class GettingStartedWithBedrock implements RunnableExample
{
    protected BedrockService $bedrockService;

    public function runExample()
    {
        echo("\n");
        echo("--------------------------------------------------------------\n");
        print("Welcome to the Amazon Bedrock getting started demo using PHP!\n");
        echo("--------------------------------------------------------------\n");

        $clientArgs = [
            'region' => 'us-east-1',
            'version' => 'latest',
            'profile' => 'default',
        ];

        $bedrockService = new BedrockService($clientArgs);

        echo "Let's retrieve the available foundation models (FMs).\n";

        $result = $bedrockService->listFoundationModels();
        foreach ($result["modelSummaries"] as $model) {
            echo "\n==========================================\n";
            echo " Model: {$model["modelId"]}\n";
            echo "------------------------------------------\n";
            echo " Name: {$model["modelName"]}\n";
            echo " Provider: {$model["providerName"]}\n";
            echo " Input modalities: " . json_encode($model["inputModalities"]) . "\n";
            echo " Output modalities: " . json_encode($model["outputModalities"]) . "\n";
            echo " Supported customaizations: " . json_encode($model["customizationsSupported"]) . "\n";
            echo " Supported inference types: " . json_encode($model["inferenceTypesSupported"]) . "\n";
            echo "==========================================\n";
        }
    }

    public function helloService() {}

    public function cleanUp() {}
}
# snippet-end:[php.example_code.bedrock.basics.scenario]
