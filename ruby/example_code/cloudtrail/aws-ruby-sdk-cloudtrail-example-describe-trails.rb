# snippet-comment:[These are tags for the AWS doc team's sample catalog. Do not remove.]
# snippet-sourceauthor:[Doug-AWS]
# snippet-sourcedescription:[Lists your CloudTrail trails.]
# snippet-keyword:[AWS CloudTrail]
# snippet-keyword:[describe_trails method]
# snippet-keyword:[Ruby]
# snippet-sourcesyntax:[ruby]
# snippet-service:[cloudtrail]
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

require 'aws-sdk-cloudtrail'

# Lists information about existing trails in AWS CloudTrail.
class ListTrailsExample
  # Initialize an instance of ListTrailsExample, creating a client for
  # AWS CloudTrail (unless already provided during initialization).
  #
  # (The following comments express documentation about this function in YARD 
  # format by using @ symbols.)
  #
  # @param [Hash] opts ({}) A hash of an API client for CloudTrail.
  # @option [Aws::CloudTrail::Client] :cloudtrail_client
  #  (Aws::CloudTrail::Client)
  def initialize(opts = {})
    # This CloudTrail API client is used to list the CloudTrail resources.
    @cloudtrail = opts[:cloudtrail_client] || Aws::CloudTrail::Client.new
  end

  # Lists selected information about existing trails in AWS CloudTrail.
  def list_trails()
    resp = @cloudtrail.describe_trails({})
    
    puts
    puts "Found #{resp.trail_list.count} trail(s):"
    puts
    
    resp.trail_list.each do |trail|
      puts "Name:                  #{trail.name}"
      puts "Amazon S3 bucket name: #{trail.s3_bucket_name}" 
      puts
    end

    # Uncomment the following line to print all available information.
    # puts resp
  end
end

# Tests the functionality in the preceding class by using RSpec.
RSpec.describe ListTrailsExample do
  # Create a stubbed API client to use for testing.
  let(:cloudtrail_client) { Aws::CloudTrail::Client.new(stub_responses: true) }

  # Create a ListTrailsExample object with our API client.
  let(:list_trails_example) do
    ListTrailsExample.new(
      cloudtrail_client: cloudtrail_client
    )
  end

  describe '#list_trails' do
    it 'lists trails in AWS CloudTrail' do
      # Stub the response data for our CloudTrail API client.
      cloudtrail_client.stub_responses(
        :describe_trails, :trail_list => [ 
          { :name => "my-trail-1", :s3_bucket_name => "my-bucket-1" }, 
          { :name => "my-trail-2", :s3_bucket_name => "my-bucket-2" }
        ]
      )

      list_trails_example.list_trails()
    end
  end
end