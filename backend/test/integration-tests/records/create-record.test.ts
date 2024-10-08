import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { setup, teardown } from '../../utils/setup.js';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { Context } from 'aws-lambda';
import { checkRecordHandler } from '../../../lib/lambdas/records/check-record.js';
import { createSubmissionHandler } from '../../../lib/lambdas/submissions/create-submission.js';

const ddbClient = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

const ddb = DynamoDBDocumentClient.from(ddbClient)

const tableName = 'userTable'

describe('User CRUD test', () => {
    beforeEach(async () => {
        await setup(ddb, tableName);
    });

    afterEach(async () => {
        await teardown(ddb, tableName);
    });

    it('Test check a record in local dynamoDB', async () => {
        const mockEventString = await readFile(resolve('test/test-files/create-record-test.json'), { encoding: 'utf8' });
        const mockEventObj = JSON.parse(mockEventString);
        console.log('see obj: ', JSON.stringify(mockEventObj, null, 2));
        const res = await checkRecordHandler(mockEventObj, {} as Context);
        expect(res.recordExists).toBe(false)
    });

    it('Test add a submission', async () => {
        const mockEventString = await readFile(resolve('test/test-files/add-submission-test.json'), { encoding: 'utf8' });
        const mockEventObj = JSON.parse(mockEventString);
        console.log('see obj: ', JSON.stringify(mockEventObj, null, 2));
        const res = await createSubmissionHandler(mockEventObj, {} as Context);

    });
})
