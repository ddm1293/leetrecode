import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { UserApiConstruct } from '../constructs/user-api-construct.js';
import { SubmissionApiConstruct } from '../constructs/submission-api-construct.js';
import { RecordApiConstruct } from '../constructs/record-api-construct.js';

interface ApiStackProps extends StackProps {
    tables: Record<string, ITable>;
}

export class ApiStack extends Stack {
    public userStack: UserApiConstruct;
    public submissionStack: SubmissionApiConstruct;
    public recordStack: RecordApiConstruct;

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // TODO: understand RestApi construct
        const restApi: RestApi = new RestApi(this, 'MyApi', {
            restApiName: 'Leetrecode Api Gateway',
            description: 'This service serves my API.',
        });

        this.userStack = new UserApiConstruct(this, 'UserApiStack', {
            api: restApi,
            table: props.tables['userTable'],
        });

        this.submissionStack = new SubmissionApiConstruct(this, 'SubmissionApiStack', {
                api: restApi,
                table: props.tables['userTable'],
            },
        );

        this.recordStack = new RecordApiConstruct(this, 'RecordApiConstruct', {
            api: restApi,
            table: props.tables['userTable'],
            createSubmissionLambda: this.submissionStack.createSubmissionLambda,
        });
    }
}
