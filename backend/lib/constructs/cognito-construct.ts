import {
    AccountRecovery,
    UserPool,
    UserPoolClient, UserPoolIdentityProviderGoogle, UserPoolOperation,
    VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';

dotenv.config();

export class CognitoConstruct extends Construct {
    public readonly userPool: UserPool;
    public readonly userPoolClient: UserPoolClient;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.userPool = new UserPool(this, 'LeetReCodeUserPool', {
            signInCaseSensitive: false,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
            },
            autoVerify: {
                email: true,
            },
            userVerification: {
                emailSubject: 'Verify your email for LeetReCode!',
                emailStyle: VerificationEmailStyle.LINK,
                emailBody:
                    'Thanks for signing up to LeetRedoce! Please click this link to {##Verify your email##}.',
            },
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            passwordPolicy: {
                minLength: 8,
                requireDigits: false,
                requireUppercase: false,
                requireLowercase: false,
                requireSymbols: false,
            },
            keepOriginal: {
                email: true
            },
        });

        const googleProvider = new UserPoolIdentityProviderGoogle(this, 'LeetReCodeGoogleProvider', {
            clientId: process.env.AWS_CLIENT_ID,
            userPool: this.userPool
        })

    }
}
