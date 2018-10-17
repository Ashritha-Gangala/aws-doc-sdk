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
try:
    ec2 = boto3.resource('ec2', region_name='REGION')
    subnet = ec2.Subnet('SUBNET')
    instances = subnet.create_instances(ImageId='IMAGE_ID', InstanceType='INSTANCE_TYPE',
                                        MaxCount='NO_OF_INSTANCE',
                                        MinCount='NO_OF_INSTANCE',
                                        KeyName='KEY_PAIR_NAME', SecurityGroups=[], SecurityGroupIds=['SECURITY_GROUP'])
    print(instances)

except BaseException as exe:
    print(exe)
