import { Amplify } from 'aws-amplify';

const API_GATEWAY_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || ""
const AWS_REGION = process.env.REACT_APP_AWS_REGION || ""

Amplify.configure({
    API: {
        REST: {
            createUser: {
                endpoint: API_GATEWAY_ENDPOINT,
                region: AWS_REGION,
            }
        }
    },
    Auth: {
        Cognito: {
            userPoolId: process.env.REACT_APP_USER_POOL_ID || "",
            userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || "",
            loginWith: {
                email: true,
            },
            userAttributes: {
                email: {
                    required: true,
                },
            },
            signUpVerificationMethod: "link",
        }
    }
})
