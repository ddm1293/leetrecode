import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { CognitoUserPoolsAuthorizer, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { UserApiConstruct } from '../constructs/user-api-construct.js';
import { SubmissionApiConstruct } from '../constructs/submission-api-construct.js';
import { RecordApiConstruct } from '../constructs/record-api-construct.js';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';

interface ApiStackProps extends StackProps {
    tables: Record<string, ITable>;
    cognito: {
        userPool: UserPool;
        userPoolClient: UserPoolClient;
    }
}

export class ApiStack extends Stack {
    public userStack: UserApiConstruct;
    public submissionStack: SubmissionApiConstruct;
    public recordStack: RecordApiConstruct;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // TODO: understand RestApi construct
        const restApi: RestApi = new RestApi(this, 'LeetReCodeApi', {
            restApiName: 'Leetrecode Api Gateway',
            description: 'This service serves my API.',
        });

        const authorizer = new CognitoUserPoolsAuthorizer(this, "LeetReCodeCognitoAuthorizer", {
            cognitoUserPools: [props.cognito.userPool],
        })

        this.userStack = new UserApiConstruct(this, 'UserApiStack', {
            api: restApi,
            table: props.tables['userTable'],
            authorizer,
            userPool: props.cognito.userPool,
        });

        this.submissionStack = new SubmissionApiConstruct(this, 'SubmissionApiStack', {
                api: restApi,
                table: props.tables['userTable'],
                authorizer,
            },
        );

        this.recordStack = new RecordApiConstruct(this, 'RecordApiConstruct', {
            api: restApi,
            table: props.tables['userTable'],
            createSubmissionLambda: this.submissionStack.createSubmissionLambda,
            authorizer,
        });
    }
}
