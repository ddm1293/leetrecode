import {
    AccountRecovery,
    UserPool,
    UserPoolClient,
    VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';
import * as dotenv from 'dotenv';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';

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
            removalPolicy: RemovalPolicy.DESTROY,
        });

        this.userPoolClient = new UserPoolClient(this, "LeetReCodeUserPoolClient", {
            userPool: this.userPool,
            authFlows: {
                userPassword: true,
                userSrp: true,
            }
        })

        this.userPool.addDomain("LeetReCodeUserPoolDomain", {
            cognitoDomain: {
                domainPrefix: "leetrecode",
            }
        })

        new CfnOutput(this, 'UserPoolIdOutput', {
            value: this.userPool.userPoolId,
            description: 'The User Pool ID',
            exportName: 'UserPoolId',
        });

        new CfnOutput(this, 'UserPoolClientIdOutput', {
            value: this.userPoolClient.userPoolClientId,
            description: 'The User Pool Client ID',
            exportName: 'UserPoolClientId',
        });
    }
}
