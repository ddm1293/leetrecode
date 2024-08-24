#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { DatabaseStack } from '../lib/stacks/database-stack.js';
import { ApiStack } from '../lib/stacks/api-stack.js';
import { AuthStack } from '../lib/stacks/auth-stack.js';

dotenv.config();

const app = new cdk.App();

const authStack = new AuthStack(app, 'LeetRecodeAuthStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
})

const databaseStack: DatabaseStack = new DatabaseStack(app, 'LeetRecodeDatabaseStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
});

new ApiStack(app, 'LeetRecodeApiStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
    tables: {
        userTable: databaseStack.userTable,
    },
    cognito: {
        userPool: authStack.cognito.userPool,
        userPoolClient: authStack.cognito.userPoolClient,
    }
});
