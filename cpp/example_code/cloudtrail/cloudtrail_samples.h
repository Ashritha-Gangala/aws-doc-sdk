//  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
//  SPDX-License-Identifier: Apache-2.0


#pragma once
#ifndef CLOUDTRAIL_EXAMPLES_CLOUDTRAIL_SAMPLES_H
#define CLOUDTRAIL_EXAMPLES_CLOUDTRAIL_SAMPLES_H

#include <aws/core/client/ClientConfiguration.h>

namespace AwsDoc {
    namespace CloudTrail {
        // Routine which creates a cloud trail.
        /*!
          \param trailName: The name of the trail.
          \param bucketName: The Amazon S3 bucket designate for publishing logs.
          \param clientConfig: Aws client configuration.
          \return bool: Function succeeded.
        */
        bool createTrail(const Aws::String trailName, const Aws::String bucketName,
                         const Aws::Client::ClientConfiguration &clientConfig);

        // Routine which deletes a cloud trail.
        /*!
          \param trailName: The name of the trail.
          \param clientConfig: Aws client configuration.
          \return bool: Function succeeded.
        */
        bool deleteTrail(const Aws::String trailName,
                         const Aws::Client::ClientConfiguration &clientConfig);

        // Routine which describes the cloud trails in an account.
        /*!
          \param clientConfig: Aws client configuration.
          \return bool: Function succeeded.
        */
        bool describeTrails(const Aws::Client::ClientConfiguration &clientConfig);

        // Routine which looks up events captured by cloudtrail.
        /*!
          \param clientConfig: Aws client configuration.
          \return bool: Function succeeded.
        */
        bool lookupEvents(const Aws::Client::ClientConfiguration &clientConfig);
    } // CloudTrail
} // AwsDoc

#endif //CLOUDTRAIL_EXAMPLES_CLOUDTRAIL_SAMPLES_H
