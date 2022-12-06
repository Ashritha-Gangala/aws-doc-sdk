// snippet-sourcedescription:[HelloRoute53.kt demonstrates how to get started using the Route53DomainsClient.]
// snippet-keyword:[AWS SDK for Kotlin]
// snippet-service:[Amazon Route 53]
/*
   Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
   SPDX-License-Identifier: Apache-2.0
*/
package com.kotlin.route

import aws.sdk.kotlin.services.route53domains.Route53DomainsClient
import aws.sdk.kotlin.services.route53domains.model.ListPricesRequest
import kotlin.system.exitProcess

/**
 Before running this Kotlin code example, set up your development environment,
 including your credentials.

 For more information, see the following documentation topic:
 https://docs.aws.amazon.com/sdk-for-kotlin/latest/developer-guide/setup.html
 */
suspend fun main(args: Array<String>) {
    val usage = """
        Usage:
           <domainType> 

       Where:
           domainType - The domain type (for example, com). 
    """

    if (args.size != 1) {
        println(usage)
        exitProcess(0)
    }
    val domainType = args[0]
    println("Invokes ListPrices for at least one domain type.")
    listPrices(domainType)
}

suspend fun listPrices(domainType: String) {
    val pricesRequest = ListPricesRequest {
        maxItems = 10
        tld = domainType
    }

    Route53DomainsClient { region = "us-east-1" }.use { route53DomainsClient ->
        val response = route53DomainsClient.listPrices(pricesRequest)
        response.prices?.forEach { pr ->
            println("Registration: ${pr.registrationPrice?.price} ${pr.registrationPrice?.currency}")
            println("Renewal: ${pr.renewalPrice?.price} ${pr.renewalPrice?.currency}")
            println("Transfer: ${pr.transferPrice?.price} ${pr.transferPrice?.currency}")
            println("Restoration: ${pr.restorationPrice?.price} ${pr.restorationPrice?.currency}")
        }
    }
}
