import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LambdaFactory } from './lambda-factory';
import { LambdaConfig, LambdaCreator } from './lambda-creator';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class UserLambdaFactory implements LambdaFactory {
    createLambdas(
        scope: Construct,
        table: ITable,
    ): { [key: string]: Function } {
        const baseConfig: Omit<LambdaConfig, 'id' | 'entry'> = {
            runtime: Runtime.NODEJS_20_X,
            environment: {
                TABLE_NAME: table.tableName,
            },
        };

        const createUserLambda: NodejsFunction = LambdaCreator.createLambda(
            scope,
            {
                ...baseConfig,
                id: 'CreateUserLambda',
                entry: '../lambdas/users/create-user.ts',
            },
        );

        return { createUserLambda };
    }

    addRoutes(api: RestApi, functions: { [key: string]: Function }): void {
        const users = api.root.addResource('users');
        users.addMethod('GET');
        users.addMethod('POST');
        users.addMethod('PUT');
        users.addMethod('DELETE');
    }
}
