import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';

export interface ApiConstructProps {
    api: RestApi;
    table: ITable;
}
