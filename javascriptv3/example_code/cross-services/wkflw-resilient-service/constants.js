/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { resolve, join } from "node:path";

export const PROJECT_ROOT_PATH = resolve("../../../../");
export const RESOURCES_PATH = join(
  PROJECT_ROOT_PATH,
  "workflows/resilient_service/resources/"
);
export const ROOT = resolve("./");

export const MESSAGES = {
  introduction: `Welcome to the demonstration of How to Build and Manage a Resilient Service!
For this demo, we'll use an AWS SDK to create several AWS resources to set up a load-balanced web service endpoint and explore some ways to make it resilient against various kinds of failures.
Some of the resources create by this demo are:
  - A DynamoDB table that the web service depends on to provide book, movie, and song recommendations.
  - An EC2 launch template that defines EC2 instances that each contain a Python web server.
  - An EC2 Auto Scaling group that manages EC2 instances across several Availability Zones.
  - An Elastic Load Balancing (ELB) load balancer that targets the Auto Scaling group to distribute requests.`,
  confirmDeployment: "Are you ready to deploy resources?",
  creatingTable: "Creating table: ${TABLE_NAME}.",
  createdTable: "Created table: ${TABLE_NAME}.",
  populatingTable: "Populating table: ${TABLE_NAME}.",
  populatedTable: "Populated table: ${TABLE_NAME}.",
  creatingKeyPair:
    "Creating key pair: ${KEY_PAIR_NAME}. This allows you to SSH into the EC2 instances.",
  createdKeyPair:
    "Created key pair: ${KEY_PAIR_NAME}.pem and stored it locally.",
  creatingInstancePolicy:
    "Creating instance policy: ${INSTANCE_POLICY_NAME}. The policy is added to an instance profile.",
  createdInstancePolicy:
    "Created instance policy: ${INSTANCE_POLICY_NAME}. ARN: ${INSTANCE_POLICY_ARN}.",
  creatingInstanceRole: "Creating instance role: ${INSTANCE_ROLE_NAME}.",
  createdInstanceRole: "Instance role created: ${INSTANCE_ROLE_NAME}.",
  attachingPolicyToRole:
    "Attaching policy ${INSTANCE_POLICY_NAME} to role ${INSTANCE_ROLE_NAME}.",
  attachedPolicyToRole:
    "Attached policy ${INSTANCE_POLICY_NAME} to role ${INSTANCE_ROLE_NAME}.",
  creatingInstanceProfile:
    "Creating instance profile: ${INSTANCE_PROFILE_NAME}.",
  createdInstanceProfile:
    "Created instance profile: ${INSTANCE_PROFILE_NAME}. ARN: ${INSTANCE_PROFILE_ARN}.",
  addingRoleToInstanceProfile:
    "Adding role ${INSTANCE_ROLE_NAME} to profile ${INSTANCE_PROFILE_NAME}.",
  addedRoleToInstanceProfile:
    "Added role ${INSTANCE_ROLE_NAME} to profile ${INSTANCE_PROFILE_NAME}.",
  creatingLaunchTemplate: `Creating launch template. The launch template is 
  configured with the instance profile, an instance type, an image id, a key pair, and a startup script.
  This script starts a Python web server defined in the "server.py" script. The web server
  listens to HTTP requests on port 80 and responds to requests to '/' and to '/healthcheck'.
  For demo purposes, this server is run as the root user. In production, the best practice is to
  run a web server, such as Apache, with least-privileged credentials.
  
  The template also defines an IAM policy that each instance uses to assume a role that grants
  permissions to access the DynamoDB recommendation table and Systems Manager parameters
  that control the flow of the demo.`,
  createdLaunchTemplate: "Created launch template: ${LAUNCH_TEMPLATE_NAME}.",
  destroy: "Destroy resources?",
  deletedTable: "Deleted table: ${TABLE_NAME}.",
  deleteTableError: "Error deleting table: ${TABLE_NAME}.",
  deletedKeyPair: "Deleted key pair ${KEY_PAIR_NAME}.",
  deleteKeyPairError: "Error deleting key pair: ${KEY_PAIR_NAME}.",
  detachedPolicyFromRole:
    "Detached policy ${INSTANCE_POLICY_NAME} from role ${INSTANCE_ROLE_NAME}.",
  detachPolicyFromRoleError:
    "Error detaching policy ${INSTANCE_POLICY_NAME} from role ${INSTANCE_ROLE_NAME}.",
  deletedPolicy: "Deleted policy ${INSTANCE_POLICY_NAME}.",
  deletePolicyError: "Error deleting policy ${INSTANCE_POLICY_NAME}.",
  deletedInstanceRole: "Deleted role ${INSTANCE_ROLE_NAME}.",
  deleteInstanceRoleError: "Error deleting role ${INSTANCE_ROLE_NAME}.",
  deletedInstanceProfile: "Deleted instance profile ${INSTANCE_PROFILE_NAME}.",
  deleteInstanceProfileError:
    "Error deleting instance profile ${INSTANCE_PROFILE_NAME}.",
  removedRoleFromInstanceProfile:
    "Removed role ${INSTANCE_ROLE_NAME} from instance profile ${INSTANCE_PROFILE_NAME}.",
  removeRoleFromInstanceProfileError:
    "Error removing role ${INSTANCE_ROLE_NAME} from instance profile ${INSTANCE_PROFILE_NAME}.",
  deletedLaunchTemplate: "Deleted launch template ${LAUNCH_TEMPLATE_NAME}.",
  deleteLaunchTemplateError:
    "Error deleting launch template ${LAUNCH_TEMPLATE_NAME}.",
};

export const PREFIX = "resilient-wkflw-";

export const NAMES = {
  tableName: `${PREFIX}table`,
  keyPairName: `${PREFIX}key-pair`,
  instancePolicyName: `${PREFIX}instance-policy`,
  instanceProfileName: `${PREFIX}instance-profile`,
  instanceRoleName: `${PREFIX}instance-role`,
  launchTemplateName: `${PREFIX}launch-template`,
};
