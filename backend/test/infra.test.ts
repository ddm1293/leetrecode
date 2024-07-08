import { describe, test, expect } from 'vitest';
import * as cdk from 'aws-cdk-lib'
import { DatabaseStack } from '../lib/stacks/database-stack.js';
import { Capture, Template } from 'aws-cdk-lib/assertions';
import { ApiStack } from '../lib/stacks/api-stack';

describe('Infra test', () => {
    test("DynamoDB table created", () => {
        const app = new cdk.App();
        const databaseStack: DatabaseStack = new DatabaseStack(app, 'DatabaseStack', {
            env: {
                    account: process.env.CDK_DEFAULT_ACCOUNT,
                    region: process.env.CDK_DEFAULT_REGION,
            }
        });

        const template: Template = Template.fromStack(databaseStack);

        template.hasResourceProperties('AWS::DynamoDB::Table', {
            TableName: 'userTable',
            BillingMode:'PAY_PER_REQUEST',
            KeySchema: [
                {
                    AttributeName: 'PK',
                    KeyType: 'HASH',
                },
                {
                    AttributeName: 'SK',
                    KeyType: 'RANGE',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'PK',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'SK',
                    AttributeType: 'S',
                },
                {
                    AttributeName: 'email',
                    AttributeType: 'S',
                },
            ],
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'userEmailIndex',
                    KeySchema: [
                        {
                            AttributeName: 'email',
                            KeyType: 'HASH',
                        },
                    ],
                    Projection: {
                        ProjectionType: 'ALL',
                    },
                },
            ],
        })

        template.resourceCountIs('AWS::DynamoDB::Table', 1)
    });

    test('Lambda created', () => {
        const app = new cdk.App();
        const databaseStack = new DatabaseStack(app, 'DatabaseStack', {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: process.env.CDK_DEFAULT_REGION,
            }
        });
        const apiStack: ApiStack = new ApiStack(app, 'TestApiStack', {
            env: {
                account: process.env.CDK_DEFAULT_ACCOUNT,
                region: process.env.CDK_DEFAULT_REGION,
            },
            tables: {
                userTable: databaseStack.userTable,
            },
        });

        const capture: Capture = new Capture();
        const template = Template.fromStack(apiStack);
        template.hasResourceProperties('AWS::ApiGateway::RestApi', {
            Name: 'Leetrecode Api Gateway',
            Description: capture
        })
        expect(capture.asString()).toContain('This service serves my API.')

        template.hasResourceProperties('AWS::ApiGateway::Method', {
            HttpMethod: 'POST',
        })
        template.hasResourceProperties('AWS::ApiGateway::Resource', {
            PathPart: 'users',
        })

        // testing the nested stacks
        template.resourceCountIs('AWS::CloudFormation::Stack', 3)
        const { userStack, submissionStack, recordStack } = apiStack
        const userStackTemplate: Template = Template.fromStack(userStack)

        userStackTemplate.resourceCountIs('AWS::Lambda::Function', 1);
        const envCapture = new Capture();
        userStackTemplate.hasResourceProperties('AWS::Lambda::Function', {
            Handler: 'index.handler',
            Runtime: 'nodejs20.x',
            Environment: {
                Variables: {
                    TABLE_NAME: envCapture
                },
            },
        });
        expect(envCapture.asObject()).toEqual({
            'Fn::ImportValue': expect.stringMatching(/DatabaseStack:ExportsOutputRefUserTable[A-Z0-9]+/),
        })
    });
})
