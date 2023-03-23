# Developer guide

Elros is an opinionated boilerplate designed to speed up your development of a website that
integrates with Amazon Web Services.

## Features

- Authentication
- Design system
- Development/build tooling

## Prerequisites

1. Install the latest Node.js LTS.
1. Install git.

## Get started

1. Copy and paste the `elros` directory to your workspace.
1. Rename your directory.
1. Initialize a new `git` repository with `git init`.

## Add new components

When you have a copy of the boilerplate code, you can treat it like
any other React application. Add new components, change the folder
structure, make it yours.

## Run

1. Run `npm i` from the same directory as this readme.
1. Run `npm run dev`.

## Build
1. Run `npm run build`.

## Understand the features

### Authentication

Authentication can be difficult. AWS offers tools like `Amplify` and `amazon-cognito-identity-js` to
assist with authentication. Even with those tools, it's still a steep learning curve. This boilerplate
offers four things to get you going faster:

- A generic AuthManager interface.
- A state-management system for Auth.
- An Amazon Cognito implementation of the Auth interface.
- A LoginModal component.
- An off switch.

The generic AuthManager interface provides the model for a user-driven state machine. It describes
how to sign a user in, sign a user out, and get the user's information. The CognitoAuthManager
implements this interface using `amazon-cognito-identity-js`. By default, the state management system
in `store.ts` uses `CognitoAuthManager`, but it could be replaced by another implementation of `AuthManager`.

The `LoginModal` integrates with the state management system to provide user interaction with the
underlying authentication system. The boilerplate includes the `LoginModal` on the main page, but it
could be moved or deleted entirely.

Authentication can also be turned off. Set `login.enabled` to `false` in the `store-ui` to disable it.

#### Configure Amazon Cognito

The CognitoAuthManager requires a user pool. The user pool ID and client ID environment variables are set in `.env`

```
# Cognito configuration. Set these values if you want to enable authentication.
VITE_COGNITO_USER_POOL_ID=
VITE_COGNITO_USER_POOL_CLIENT_ID=
```

1. [Create](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pool-as-user-directory.html) an Amazon Cognito user pool, or use an existing one.
2. Set the value of `VITE_COGNITO_USER_POOL_ID` to the user pool ID. You can find the user pool ID
   in the AWS Management Console for Amazon Cognito.
3. Set the value of `VITE_COGNITO_USER_POOL_CLIENT_ID` to the user pool ID. You can find the user pool ID
   in the AWS Management Console for Amazon Cognito under the "App integration" tab.

### Design system
This boilerplate uses the [Cloudscape Design System](https://cloudscape.design/get-started/guides/introduction/)
as a component library. Cloudscape was built for and is used by Amazon Web Services (AWS) products and services.

### Development/build tooling
[Vite](https://vitejs.dev/) is used to run the project locally and bundle it for deployment.

Vite also enables the use of `.env` described in [Configure Amazon Cognito](#configure-amazon-cognito). If you want
to test with certain environment variables, but not commit them, you can use [`.env.local`](https://vitejs.dev/guide/env-and-mode.html#env-files).



## Troubleshoot

### The app is blank on startup.
This can happen if the main component fails to load. Make sure that if you have `login.enabled` set
to `true` in the `store-ui` that you also have followed the steps in [Configure Amazon Cognito](#configure-amazon-cognito).
