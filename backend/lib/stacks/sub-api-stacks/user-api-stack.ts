import { NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubApiStackProps } from './utils/sub-api-stack-props.js';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export class UserApiStack extends NestedStack {
    constructor(scope: Construct, id: string, props: SubApiStackProps) {
        super(scope, id, props);

        const baseConfig = {
            runtime: Runtime.NODEJS_20_X,
            environment: {
                TABLE_NAME: props.table.tableName,
            },
        };

        const createUserLambda: NodejsFunction = new NodejsFunction(
            this,
            'CreateUserLambda',
            {
                ...baseConfig,
                entry: '../../lambdas/users/create-user.ts',
            },
        );

        props.table.grantReadWriteData(createUserLambda);

        const users = props.api.root.addResource('users');
        users.addMethod('POST', new LambdaIntegration(createUserLambda));
    }
}
