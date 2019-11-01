#Sending messages to the queue

import boto3

client = boto3.client('sqs')

#Config
i=0
limit = 10

while i < limit:
    response = client.send_message(
        QueueUrl='<Provide your FIFO queue URL>',
        MessageBody='this is message ' + str(i+2), MessageGroupId = '2'
    )
    print(
        "RequestId: " + response['ResponseMetadata']['HTTPHeaders']['x-amzn-requestid'] + " | " +
        "TimeStamp: " + response['ResponseMetadata']['HTTPHeaders']['date'] + " | "
        "MessageId: " + response['MessageId']
    )
    i += 1
