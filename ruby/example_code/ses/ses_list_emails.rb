# snippet-comment:[These are tags for the AWS doc team's sample catalog. Do not remove.]
# snippet-sourceauthor:[Doug-AWS]
# snippet-sourcedescription:[Lists the verified email addresses for SES.]
# snippet-keyword:[Amazon Simple Email Service]
# snippet-keyword:[get_identity_verification_attributes method]
# snippet-keyword:[list_identities method]
# snippet-keyword:[Ruby]
# snippet-sourcesyntax:[ruby]
# snippet-service:[ses]
# snippet-keyword:[Code Sample]
# snippet-sourcetype:[full-example]
# snippet-sourcedate:[2018-03-16]
# Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

require 'aws-sdk-ses'  # v2: require 'aws-sdk'
require 'rspec'
# Create client in us-west-2 region
client = Aws::SES::Client.new(region: 'us-west-2')

module Aws
  module SimpleEmailService
    class ListEmails
      def initialize(options = {})
        @email = options[:email]

# Get up to 1000 identities
ids = client.list_identities({
  identity_type: "EmailAddress"
  })

# Iterate over and list the email addresses associated with each identity
ids.identities.each do |email|
  attrs = client.get_identity_verification_attributes({
    identities: [email]
  })

# Display the verification status eg) failure or verified, associated with each email address identity
  status = attrs.verification_attributes[email].verification_status

# Display email addresses that have been verified
  if status == "Success"
    puts email && "Verification Status: Verified"
  elsif status == "Pending"
    puts email && "Verification Status: Pending Verification"
  else status == "Failed"
    returns "The email address you entered does not appear to be valid. Please try entering the email address again."
  end
  end
  end