import { NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubApiStackProps } from './common/sub-api-stack-props.js';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class RecordApiStack extends NestedStack {
    constructor(scope: Construct, id: string, props: SubApiStackProps) {
        super(scope, id, props);

        const baseConfig = {
            runtime: Runtime.NODEJS_20_X,
            environment: {
                TABLE_NAME: props.table.tableName,
            },
        };

        const checkRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'CheckRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/records/check-record.ts'),
                handler: 'checkRecordHandler'
            },
        );

        const createRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'CreateRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/records/create-record.ts'),
                handler: 'createRecordHandler'
            },
        );

        const updateRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'UpdateRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/records/update-record.ts'),
                handler: 'updateRecordHandler'
            },
        );

        const getRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'GetRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/records/get-record.ts'),
                handler: 'getRecordHandler'
            },
        );

        const archiveRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'ArchiveRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/records/archive-record.ts'),
                handler: 'archiveRecordHandler'
            },
        );

        props.table.grantReadWriteData(checkRecordLambda);
        props.table.grantReadWriteData(createRecordLambda);
        props.table.grantReadWriteData(updateRecordLambda);
        props.table.grantReadWriteData(getRecordLambda);
        props.table.grantReadWriteData(archiveRecordLambda);

        const record = props.api.root.addResource('record');
        record.addMethod('POST', new LambdaIntegration(createRecordLambda));
        record.addMethod('GET', new LambdaIntegration(getRecordLambda));
        record.addMethod('PUT', new LambdaIntegration(updateRecordLambda));

        const checkRecord = record.addResource('checkRecord');
        checkRecord.addMethod('GET', new LambdaIntegration(checkRecordLambda));

        const archiveRecord = record.addResource('archive');
        archiveRecord.addMethod('PUT', new LambdaIntegration(archiveRecordLambda));
    }
}
