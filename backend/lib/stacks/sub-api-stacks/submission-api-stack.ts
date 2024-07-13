import { CfnOutput, NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SubApiStackProps } from './common/sub-api-stack-props.js';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class SubmissionApiStack extends NestedStack {
    constructor(scope: Construct, id: string, props: SubApiStackProps) {
        super(scope, id, props);

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

        new CfnOutput(this, 'CreateSubmissionLambdaArn', {
            value: createSubmissionLambda.functionArn,
            exportName: 'createSubmissionLambdaArn'
        })

    }
}
