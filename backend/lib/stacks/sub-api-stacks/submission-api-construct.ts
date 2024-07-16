import { Construct } from 'constructs';
import { ApiConstructProps } from './common/api-construct-props.js';
import { IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class SubmissionApiConstruct extends Construct {
    public readonly createSubmissionLambda: IFunction;

    constructor(scope: Construct, id: string, props: ApiConstructProps) {
        super(scope, id);

        const baseConfig = {
            runtime: Runtime.NODEJS_20_X,
            environment: {
                TABLE_NAME: props.table.tableName,
            },
        };

        const createSubmissionLambda: NodejsFunction = new NodejsFunction(
            this,
            'CreateSubmissionLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/submissions/create-submission.ts'),
                handler: 'createSubmissionHandler'
            },
        );
        this.createSubmissionLambda = createSubmissionLambda;

        const getSubmissionLambda: NodejsFunction = new NodejsFunction(
            this,
            'GetSubmissionLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/submissions/get-submission.ts'),
                handler: 'getSubmissionHandler'
            }
        )

        const archiveSubmissionLambda: NodejsFunction = new NodejsFunction(
            this,
            'ArchiveSubmissionLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../../lambdas/submissions/archive-submission.ts'),
                handler: 'archiveSubmissionHandler'
            }
        )

        props.table.grantReadWriteData(createSubmissionLambda);
        props.table.grantReadWriteData(getSubmissionLambda);
        props.table.grantReadWriteData(archiveSubmissionLambda);

        const submission = props.api.root.addResource('submission');
        submission.addMethod('POST', new LambdaIntegration(createSubmissionLambda));
        submission.addMethod('GET', new LambdaIntegration(getSubmissionLambda));
        submission.addMethod('PUT', new LambdaIntegration(archiveSubmissionLambda));
    }
}
