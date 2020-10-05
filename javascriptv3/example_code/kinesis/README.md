# TypeScript environment for Amazon Kinesis examples
This is a workspace where you can find working AWS SDK for JavaScript version 3 (v3) Amazon Kinesis examples. 

The [preview version of the AWS SDK for JavaScript v3](https://github.com/aws/aws-sdk-js-v3) is available. 

Once it's released, see the [AWS SDK for JavaScript v3 Developer Guide](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/kinesis-examples.html) for the topic containing these examples.

Amazon Kinesis makes it easy to collect, process, and analyze real-time, streaming data so you can get timely insights and react quickly to new information.

**NOTE:** The AWS SDK for JavaScript v3 is written in TypeScript so, for consistency, these examples are also in TypeScript. TypeScript extends of JavaScript so these examples can also be run as JavaScript. For more information, see [TypeScript homepage](https://www.typescriptlang.org/).

# Getting started

1. Clone the [AWS SDK Code Samples repo](https://github.com/awsdocs/aws-doc-sdk-examples) to your local environment. See [the Github documentation](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) for instructions.

1. Install the dependencies listed in the package.json.

**Note**: These include the client module for the AWS services required in these example, 
which is *@aws-sdk/client-kinesis*.
```
npm install ts-node -g // If using JavaScript, enter 'npm install node -g' instead
cd javascriptv3/example_code/kinesis
npm install
```
3. If you're using JavaScript, change the sample file extension from ```.ts``` to ```.js```.


4. In your text editor, update user variables specified in the ```Inputs``` section of the sample file.

5. Run sample code:
```
cd src
ts-node [example name].ts // e.g., ts-node kinesis-example.ts
```
