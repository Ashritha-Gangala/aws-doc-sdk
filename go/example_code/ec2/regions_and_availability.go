//snippet-sourceauthor: [Doug-AWS]

//snippet-sourcedescription:[Description]

//snippet-service:[AWSService]

//snippet-sourcetype:[full example]

//snippet-sourcedate:[N/A]

/*
   Copyright 2010-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

   This file is licensed under the Apache License, Version 2.0 (the "License").
   You may not use this file except in compliance with the License. A copy of
   the License is located at

    http://aws.amazon.com/apache2.0/

   This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied. See the License for the
   specific language governing permissions and limitations under the License.
*/

package main

import (
    "fmt"

    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/ec2"
)

// Usage:
// go run main.go
func main() {
    // Load session from shared config
    sess := session.Must(session.NewSessionWithOptions(session.Options{
        SharedConfigState: session.SharedConfigEnable,
    }))

    // Create new EC2 client
    svc := ec2.New(sess)

    // Retrieves all regions/endpoints that work with EC2
    resultRegions, err := svc.DescribeRegions(nil)
    if err != nil {
        fmt.Println("Error", err)
        return
    }

    fmt.Println("Success", resultRegions.Regions)

    // Retrieves availability zones only for region of the ec2 service object
    resultAvalZones, err := svc.DescribeAvailabilityZones(nil)
    if err != nil {
        fmt.Println("Error", err)
        return
    }

    fmt.Println("Success", resultAvalZones.AvailabilityZones)
}
