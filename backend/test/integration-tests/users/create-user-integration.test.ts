import { DynamoDBClient, } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createMockEvent } from '../../utils/create-mock-event.js'
import { handler } from '../../../lib/lambdas/users/create-user.js';
import { Context } from 'aws-lambda';
import { setup, teardown } from '../../utils/setup.js';

const ddbClient = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

const ddb = DynamoDBDocumentClient.from(ddbClient)

const tableName = 'userTable'

describe('User CRUD test', () => {
    beforeAll(async () => {
        await setup(ddb, tableName);
    });

    it('Test adding a user in local dynamoDB', async () => {
        const mockBody = {
            userId: 'test-user-id',
            email: 'test@example.com',
            password: 'password123',
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json',
        });

        const res = await handler(mockEvent as never, {} as Context);
        console.log("see response", res);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.user).toBeDefined();
        expect(body.user.userId).toBe('test-user-id');
        expect(body.user.email).toBe('test@example.com');
    });

    afterAll(async () => {
        await teardown(ddb, tableName);
    });
})
