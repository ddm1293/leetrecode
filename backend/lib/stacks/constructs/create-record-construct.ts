import { Construct } from 'constructs';
import {
    Choice,
    Condition,
    DefinitionBody, LogLevel, Pass,
    StateMachine,
    StateMachineType, TaskInput,
} from 'aws-cdk-lib/aws-stepfunctions';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { LambdaInvoke } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Duration } from 'aws-cdk-lib';
import { LogGroup } from 'aws-cdk-lib/aws-logs';

interface StepFunctionConstructProps {
    checkRecordLambdaArn: string;
    addSubmissionLambdaArn: string;
    createRecordLambdaArn: string;
    updateRecordLambdaArn: string;
}

export class CreateRecordConstruct extends Construct {
    public readonly stateMachine: StateMachine;

    constructor(scope: Construct, id: string, props: StepFunctionConstructProps) {
        super(scope, id);

        const checkRecordLambda = NodejsFunction.fromFunctionAttributes(
            this,
            'CheckRecordLambdaArn',
            {
                functionArn: props.checkRecordLambdaArn,
                sameEnvironment: true
            }
        );

        const addSubmissionLambda = NodejsFunction.fromFunctionAttributes(
            this,
            'CreateSubmissionLambdaArn',
            {
                functionArn: props.addSubmissionLambdaArn,
                sameEnvironment: true
            }
        );

        const createRecordLambda = NodejsFunction.fromFunctionAttributes(
            this,
            'CreateRecordLambdaArn',
            {
                functionArn: props.createRecordLambdaArn,
                sameEnvironment: true
            }
        );

        const updateRecordLambda = NodejsFunction.fromFunctionAttributes(
            this,
            'UpdateRecordLambdaArn',
            {
                functionArn: props.updateRecordLambdaArn,
                sameEnvironment: true
            }
        );

        const checkRecordTask = new LambdaInvoke(this, 'CheckRecordTask',
            {
                lambdaFunction: checkRecordLambda,
                resultSelector: {
                    'recordExists.$': '$.Payload.recordExists'
                },
                resultPath: '$.checkRecordResult',
                outputPath: '$',
            }
        );

        const addSubmissionTask = new LambdaInvoke(this, 'AddSubmissionTask',
            {
                lambdaFunction: addSubmissionLambda,
                inputPath: '$',
                outputPath: '$.Payload',
            }
        );

        const createRecordTask = new LambdaInvoke(this, 'CreateRecordTask',
            {
                lambdaFunction: createRecordLambda,
                inputPath: '$',
                payload: TaskInput.fromObject({
                    "body.$": '$.body',
                    'checkRecordResult.$': "$.checkRecordResult"
                }),
                outputPath: '$',
            }
        );

        const updateRecordTask = new LambdaInvoke(this, 'UpdateRecordTask',
            {
                lambdaFunction: updateRecordLambda,
                inputPath: '$',
                outputPath: '$.Payload'
            }
        );

        const definition = checkRecordTask
            .next(new Choice(this, 'RecordExistsChoice')
            .when(
                Condition.booleanEquals('$.checkRecordResult.recordExists', true),
                addSubmissionTask
                    .next(updateRecordTask))
            .otherwise(
                createRecordTask
                    .next(addSubmissionTask)
            ))

        this.stateMachine = new StateMachine(this, 'CreateRecordStateMachine', {
            definitionBody: DefinitionBody.fromChainable(definition),
            stateMachineType: StateMachineType.EXPRESS,
            logs: {
                destination: new LogGroup(this, 'MyStepFunctionLogGroup'),
                includeExecutionData: true,
                level: LogLevel.ALL,
            }
        });

        checkRecordLambda.grantInvoke(this.stateMachine.role);
        addSubmissionLambda.grantInvoke(this.stateMachine.role);
        createRecordLambda.grantInvoke(this.stateMachine.role);
        updateRecordLambda.grantInvoke(this.stateMachine.role);
    }
}
