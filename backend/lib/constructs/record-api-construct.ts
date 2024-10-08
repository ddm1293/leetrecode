import { Construct } from 'constructs';
import { ApiConstructProps } from './common/api-construct-props.js';
import { IFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
import { AuthorizationType, LambdaIntegration, StepFunctionsIntegration } from 'aws-cdk-lib/aws-apigateway';
import { fileURLToPath } from 'url';
import { CreateRecordConstruct } from './create-record-construct.js';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

interface RecordApiConstructProps extends ApiConstructProps {
    createSubmissionLambda: IFunction;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class RecordApiConstruct extends Construct {
    constructor(scope: Construct, id: string, props: RecordApiConstructProps) {
        super(scope, id);

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
                entry: path.join(__dirname, '../lambdas/records/check-record.ts'),
                handler: 'checkRecordHandler'
            },
        );

        const createRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'CreateRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../lambdas/records/create-record.ts'),
                handler: 'createRecordHandler'
            },
        );

        const updateRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'UpdateRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../lambdas/records/update-record.ts'),
                handler: 'updateRecordHandler'
            },
        );

        const getRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'GetRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../lambdas/records/get-record.ts'),
                handler: 'getRecordHandler'
            },
        );

        const archiveRecordLambda: NodejsFunction = new NodejsFunction(
            this,
            'ArchiveRecordLambda',
            {
                ...baseConfig,
                entry: path.join(__dirname, '../lambdas/records/archive-record.ts'),
                handler: 'archiveRecordHandler'
            },
        );

        props.table.grantReadWriteData(checkRecordLambda);
        props.table.grantReadWriteData(createRecordLambda);
        props.table.grantReadWriteData(updateRecordLambda);
        props.table.grantReadWriteData(getRecordLambda);
        props.table.grantReadWriteData(archiveRecordLambda);

        const record = props.api.root.addResource('record');
        record.addMethod('POST', new LambdaIntegration(createRecordLambda), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });
        record.addMethod('GET', new LambdaIntegration(getRecordLambda), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });
        record.addMethod('PUT', new LambdaIntegration(updateRecordLambda), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });

        const checkRecord = record.addResource('checkRecord');
        checkRecord.addMethod('GET', new LambdaIntegration(checkRecordLambda), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });

        const archiveRecord = record.addResource('archive');
        archiveRecord.addMethod('PUT', new LambdaIntegration(archiveRecordLambda), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });

        const stepFunctionConstruct = new CreateRecordConstruct(this, 'CreateRecordConstruct', {
            checkRecordLambdaArn: checkRecordLambda.functionArn,
            addSubmissionLambdaArn: props.createSubmissionLambda.functionArn,
            createRecordLambdaArn: createRecordLambda.functionArn,
            updateRecordLambdaArn: updateRecordLambda.functionArn,
        })

        const apiGatewayRole = new Role(this, 'ApiGatewayStepFunctionsRole', {
            assumedBy: new ServicePrincipal('apigateway.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('AWSStepFunctionsFullAccess'),
            ],
        });

        const stateMachineResource = props.api.root.addResource('startStateMachine');
        stateMachineResource.addMethod('POST', StepFunctionsIntegration.startExecution(
            stepFunctionConstruct.stateMachine,
            {
                credentialsRole: apiGatewayRole
            }
        ), {
            authorizer: props.authorizer,
            authorizationType: AuthorizationType.COGNITO
        });
    }
}
