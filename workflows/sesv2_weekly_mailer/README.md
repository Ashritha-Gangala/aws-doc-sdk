# Amazon SES v2 Coupon Newsletter Workflow

This workflow demonstrates how to use the Amazon Simple Email Service (SES) v2 to send a coupon newsletter to a list of contacts. It covers the following key steps:

1. **Prepare the Application**

   - Create a verified email identity for the "send/reply" email addresses.
   - Create a contact list to store the newsletter subscribers.

2. **Gather Subscriber Email Addresses**

   - Allow subscribers to sign up for the newsletter by providing their email addresses.
   - Send a welcome email to each new subscriber.

3. **Send the Coupon Newsletter**

   - Create a template for the coupon newsletter.
   - Retrieve the list of contacts (subscribers).
   - Send individual emails with the coupon newsletter template to each subscriber.
   - Include Unsubscribe links and headers to follow bulk email best practices.

4. **Monitor and Review**

   - Review dashboards and metrics in the AWS console for the newsletter campaign.

5. **Clean up**

   - Delete the template.
   - Delete the contact list.
   - Optionally delete the sender verified email identity.

## Prerequisites

Before running this workflow, ensure you have:

- An AWS account with proper permissions to use Amazon SES v2.
- A verified email identity (domain or email address) in Amazon SES.

## AWS Services Used

This workflow uses the following AWS services:

- Amazon Simple Email Service (SES) v2

## SES v2 Actions Used

The workflow covers the following SES v2 API actions:

- [`CreateContact`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_CreateContact.html)
- [`CreateContactList`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_CreateContactList.html)
- [`CreateEmailIdentity`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_CreateEmailIdentity.html)
- [`CreateEmailTemplate`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_CreateEmailTemplate.html)
- [`ListContacts`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_ListContacts.html)
- [`SendEmail`](https://docs.aws.amazon.com/ses/latest/APIReference-V2/API_SendEmail.html) (with both Simple and Template formats)

## Implementations

This example is implemented in the following languages:

- [Python](../../python/example_code/sesv2/scenarios/wkflw-sesv2-mailer/README.md)

---

Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
