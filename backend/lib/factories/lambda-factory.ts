import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';

export interface LambdaFactory {
  createLambdas(scope: Construct, table: ITable): { [key: string]: Function };
  addRoutes(api: RestApi, functions:  { [key: string]: Function }): void;
}

