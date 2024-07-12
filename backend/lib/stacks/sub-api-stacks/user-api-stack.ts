import { NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubApiStackProps } from './common/sub-api-stack-props.js';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
                entry: path.join(__dirname, '../../lambdas/users/create-user.ts'),
                handler: 'createUserHandler'
            },
        );

        const getUserLambda: NodejsFunction = new NodejsFunction(
            this,
            'GetUserLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/users/get-user.ts'),
                handler: 'getUserHandler'
            },
        );

        const updateUserEmailLambda: NodejsFunction = new NodejsFunction(
            this,
            'UpdateUserEmailLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/users/update-user-email.ts'),
                handler: 'updateUserEmailHandler'
            },
        );

        const updateUserPasswordLambda: NodejsFunction = new NodejsFunction(
            this,
            'UpdateUserPasswordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/users/update-user-password.ts'),
                handler: 'updateUserPasswordHandler'
            },
        );

        const archiveUserLambda: NodejsFunction = new NodejsFunction(
            this,
            'ArchiveUserLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/users/archive-user.ts'),
                handler: 'archiveUserHandler'
            },
        );

        props.table.grantReadWriteData(createUserLambda);
        props.table.grantReadWriteData(getUserLambda);
        props.table.grantReadWriteData(updateUserEmailLambda);
        props.table.grantReadWriteData(updateUserPasswordLambda);
        props.table.grantReadWriteData(archiveUserLambda);

        const user = props.api.root.addResource('user');
        user.addMethod('POST', new LambdaIntegration(createUserLambda));
        user.addMethod('GET', new LambdaIntegration(getUserLambda));

        const updateUserEmail = user.addResource('updateUserEmail');
        updateUserEmail.addMethod('PUT', new LambdaIntegration(updateUserEmailLambda));

        const updateUserPassword = user.addResource('updateUserPassword');
        updateUserPassword.addMethod('PUT', new LambdaIntegration(updateUserPasswordLambda));

        const archiveUser = user.addResource('archive');
        archiveUser.addMethod('PUT', new LambdaIntegration(archiveUserLambda));
    }
}
