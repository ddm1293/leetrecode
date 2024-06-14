import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { NestedStackProps } from 'aws-cdk-lib';

export interface SubApiStackProps extends NestedStackProps {
    api: RestApi;
    table: ITable;
}
