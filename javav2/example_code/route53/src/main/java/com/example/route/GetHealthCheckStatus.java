// snippet-comment:[These are tags for the AWS doc team's sample catalog. Do not remove.]
// snippet-sourcedescription:[GetHealthCheck.java demonstrates how to get the status of a specific health check.]
// snippet-service:[Amazon Route 53]
// snippet-keyword:[Java]
// snippet-keyword:[Amazon Route 53]
// snippet-keyword:[Code Sample]
// snippet-sourcetype:[full-example]
// snippet-sourcedate:[2020-09-28]
// snippet-sourceauthor:[AWS - scmacdon]

/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 */

package com.example.route;

// snippet-start:[route53.java2.get_health_check_status.import]
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.route53.Route53Client;
import software.amazon.awssdk.services.route53.model.GetHealthCheckStatusRequest;
import software.amazon.awssdk.services.route53.model.GetHealthCheckStatusResponse;
import software.amazon.awssdk.services.route53.model.HealthCheckObservation;
import software.amazon.awssdk.services.route53.model.Route53Exception;
import java.util.List;
// snippet-end:[route53.java2.get_health_check_status.import]

public class GetHealthCheckStatus {

    public static void main(String[] args) {

        final String USAGE = "\n" +
                "To run this example, supply the health check ID.  \n" +
                "\n" +
                "Example: GetHealthCheckStatus <id>\n";

        if (args.length < 1) {
            System.out.println(USAGE);
            System.exit(1);
        }

        /* Read the name from command args*/
        String healthCheckId = args[0];

        Region region = Region.AWS_GLOBAL;
        Route53Client route53Client = Route53Client.builder()
                .region(region)
                .build();

        getHealthStatus(route53Client, healthCheckId);
    }

    // snippet-start:[route53.java2.get_health_check_status.main]
    public static void getHealthStatus(Route53Client route53Client, String healthCheckId) {

        try {
            GetHealthCheckStatusRequest statusRequest = GetHealthCheckStatusRequest.builder()
                    .healthCheckId(healthCheckId)
                    .build();

            // Create the hosted zone
            GetHealthCheckStatusResponse statusResponse = route53Client.getHealthCheckStatus(statusRequest);
            List<HealthCheckObservation> observations = statusResponse.healthCheckObservations();
            for (HealthCheckObservation observation: observations) {
                System.out.println("(The health check observation status: "+observation.statusReport().status());
            }

        } catch (Route53Exception e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }
    // snippet-end:[route53.java2.get_health_check_status.main]
}
