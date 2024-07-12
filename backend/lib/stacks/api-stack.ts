import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { UserApiStack } from './sub-api-stacks/user-api-stack.js';
import { SubmissionApiStack } from './sub-api-stacks/submission-api-stack.js';
import { RecordApiStack } from './sub-api-stacks/record-api-stack.js';

interface ApiStackProps extends StackProps {
    tables: Record<string, ITable>;
}

export class ApiStack extends Stack {
    public userStack: UserApiStack;
    public submissionStack: SubmissionApiStack;
    public recordStack: RecordApiStack;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // TODO: understand RestApi construct
        const restApi: RestApi = new RestApi(this, 'MyApi', {
            restApiName: 'Leetrecode Api Gateway',
            description: 'This service serves my API.',
        });

        this.userStack = new UserApiStack(this, 'UserApiStack', {
            api: restApi,
            table: props.tables['userTable'],
        });

        this.submissionStack = new SubmissionApiStack(this, 'SubmissionApiStack', {
                api: restApi,
                table: props.tables['userTable'],
            },
        );

        this.recordStack = new RecordApiStack(this, 'RecordApiStack', {
            api: restApi,
            table: props.tables['userTable'],
        });
    }
}
