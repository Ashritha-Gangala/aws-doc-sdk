.. Copyright 2010-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.

   This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0
   International License (the "License"). You may not use this file except in compliance with the
   License. A copy of the License is located at http://creativecommons.org/licenses/by-nc-sa/4.0/.

   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
   either express or implied. See the License for the specific language governing permissions and
   limitations under the License.

#############################################
AWS Command Line Interface (AWS CLI) examples
#############################################

These are examples for the AWS CLI public documentation. All examples have been tested and verified
to work with AWS CLI Version 2.

Prerequisites
=============

To run these examples, you'll need:

- AWS CLI downloaded and running on your machine
- AWS credentials in a shared credentials file

Running the examples
====================

Examples are typically written as functions in shell script files that can be sourced from other 
files. Most are accompanied by a unit test script in the "tests" folder that you can run to validate
that each example works. The test scripts create the include setup and teardown functions that create
and destroy any prerequisite resources. Care is taken that all AWS resources that were created by the
example are also destroyed to avoid incurring any unwanted costs. We do recommend that you check the
resources in your account when you are done with an example to ensure that the teardown function 
worked as expected and didn't accidentally leave anything behind.

To run the examples, you'll need to create a shared credentials file. For more information about how
to set up a shared credentials file, see `Configuration and Credential File Settings <
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html>`_
in the *AWS CLI User Guide*.

AWS CLI Downloads
=============

Please see the `Installing the AWS CLI <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html>`_
for detailed information about installing the AWS CLI.


Documentation
=============

You can find detailed documentation for the AWS CLI at:

- `AWS CLI User Guide <https://docs.aws.amazon.com/cli/latest/userguide/>`_
- `AWS CLI Reference Guuide <https://docs.aws.amazon.com/cli/latest/reference/>`_

Copyright and License
=====================

All content in this repository, unless otherwise stated, is Copyright © 2010-2020, Amazon Web Services, Inc. or its 
affiliates. All rights reserved.

Except where otherwise noted, all examples in this collection are licensed under the Apache license, version 2.0 (the 
"License"). The full license text is provided in the LICENSE file accompanying this repository.
