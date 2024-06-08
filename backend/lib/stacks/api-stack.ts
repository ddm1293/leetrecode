import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { UserApiStack } from './sub-api-stacks/user-api-stack';
import { SubmissionApiStack } from './sub-api-stacks/submission-api-stack';
import { RecordApiStack } from './sub-api-stacks/record-api-stack';

interface ApiStackProps extends StackProps {
    tables: Record<string, ITable>
}

export class ApiStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        // TODO: understand RestApi construct
        const restApi: RestApi = new RestApi(this, 'MyApi', {
            restApiName: 'Leetrecode api gateway',
            description: 'This service serves my API.',
        });

        const userStack = new UserApiStack(this, "userApiStack", {
            api: restApi,
            table: props.tables["userTable"]
        })

        const submissionStack = new SubmissionApiStack(this, "submissionApiStack", {
            api: restApi,
            table: props.tables["userTable"]
        })

        const recordStack = new RecordApiStack(this, "recordApiStack", {
            api: restApi,
            table: props.tables["userTable"]
        })
    }

}
