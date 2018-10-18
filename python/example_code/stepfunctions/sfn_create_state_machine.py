# Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# This file is licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License. A copy of the
# License is located at
#
# http://aws.amazon.com/apache2.0/
#
# This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the specific
# language governing permissions and limitations under the License.


import boto3

#The name of the state machine
SF_NAME = 'name'

# The Amazon States Language definition of the state machine
SF_DEFINITION = 'definition'

#Arn of the IAM role to use for this state machine
ROLE_ARN = 'roleArn'

sfn = boto3.client('stepfunctions')

response = sfn.create_state_machine(
    name= SF_NAME,
    definition=SF_DEFINITION,
    roleArn=ROLE_ARN
)

#print the statemachine Arn
print(response.get('stateMachineArn'))
