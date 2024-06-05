#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LeetrecodeServerStack } from '../lib/stacks/leetrecode-server-stack';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new cdk.App();
new LeetrecodeServerStack(app, 'LeetrecodeServerStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
