# Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You
# may not use this file except in compliance with the License. A copy of
# the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
# ANY KIND, either express or implied. See the License for the specific
# language governing permissions and limitations under the License.

import boto3

# Create IAM client
iam = boto3.client('iam')

policy_arn='arn:aws:iam::aws:policy/AWSLambdaExecute'

# Get policy
get_policy_response = iam.get_policy(
    PolicyArn=policy_arn
)

version_id = get_policy_response['Policy']['DefaultVersionId']

# Get default version of policy
get_policy_version_response = iam.get_policy_version(
    PolicyArn=policy_arn,
    VersionId=version_id,
)

policy_document = get_policy_version_response['PolicyVersion']['Document']

print("IAM Policy Version: " + policy_document['Version'])
print("Statements: ")
for statement in policy_document['Statement']:
    print(statement)

print("\n\rUnformatted Policy Document: \n\r" + str(policy_document))
 

#snippet-sourceauthor: [jschwarzwalder]

#snippet-sourcedescription:[Description]

#snippet-service:[AWSService]

#snippet-sourcetype:[full example]

#snippet-sourcedate:[N/A]

