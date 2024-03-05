# Amazon Bedrock Runtime code examples for the SDK for .NET

## Overview

Shows how to use the AWS SDK for .NET to work with Amazon Bedrock Runtime.

<!--custom.overview.start-->
<!--custom.overview.end-->

_Amazon Bedrock Runtime is a fully managed service that makes it easy to use foundation models from third-party providers and Amazon._

## ⚠ Important

* Running this code might result in charges to your AWS account. For more details, see [AWS Pricing](https://aws.amazon.com/pricing/) and [Free Tier](https://aws.amazon.com/free/).
* Running the tests might result in charges to your AWS account.
* We recommend that you grant your code least privilege. At most, grant only the minimum permissions required to perform the task. For more information, see [Grant least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege).
* This code is not tested in every AWS Region. For more information, see [AWS Regional Services](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services).

<!--custom.important.start-->
<!--custom.important.end-->

## Code examples

### Prerequisites

For prerequisites, see the [README](../README.md#Prerequisites) in the `dotnetv3` folder.


<!--custom.prerequisites.start-->
<!--custom.prerequisites.end-->

### Single actions

Code excerpts that show you how to call individual service functions.

- [Image generation with Amazon Titan Image Generator G1](Actions/InvokeModelAsync.cs#L450) (`InvokeModel`)
- [Image generation with Stability.ai Stable Diffusion XL](Actions/InvokeModelAsync.cs#L518) (`InvokeModel`)
- [Text generation with AI21 Labs Jurassic-2](Actions/InvokeModelAsync.cs#L164) (`InvokeModel`)
- [Text generation with Amazon Titan Text G1](Actions/InvokeModelAsync.cs#L277) (`InvokeModel`)
- [Text generation with Anthropic Claude 2](Actions/InvokeModelAsync.cs#L18) (`InvokeModel`)
- [Text generation with Anthropic Claude 2 with a response stream](Actions/InvokeModelAsync.cs#L76) (`InvokeModelWithResponseStream`)
- [Text generation with Meta Llama 2 Chat](Actions/InvokeModelAsync.cs#L221) (`InvokeModel`)
- [Text generation with Mistral 7B](Actions/InvokeModelAsync.cs#L338) (`InvokeModel`)
- [Text generation with Mixtral 8x7B](Actions/InvokeModelAsync.cs#L394) (`InvokeModel`)


<!--custom.examples.start-->
<!--custom.examples.end-->

## Run the examples

### Instructions

For general instructions to run the examples, see the
[README](../README.md#building-and-running-the-code-examples) in the `dotnetv3` folder.

Some projects might include a settings.json file. Before compiling the project,
you can change these values to match your own account and resources. Alternatively,
add a settings.local.json file with your local settings, which will be loaded automatically
when the application runs.

After the example compiles, you can run it from the command line. To do so, navigate to
the folder that contains the .csproj file and run the following command:

```
dotnet run
```

Alternatively, you can run the example from within your IDE.


<!--custom.instructions.start-->
<!--custom.instructions.end-->



### Tests

⚠ Running tests might result in charges to your AWS account.


To find instructions for running these tests, see the [README](../README.md#Tests)
in the `dotnetv3` folder.



<!--custom.tests.start-->
<!--custom.tests.end-->

## Additional resources

- [Amazon Bedrock Runtime User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [Amazon Bedrock Runtime API Reference](https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html)
- [SDK for .NET Amazon Bedrock Runtime reference](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/Bedrock-runtime/NBedrock-runtime.html)

<!--custom.resources.start-->
<!--custom.resources.end-->

---

Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0