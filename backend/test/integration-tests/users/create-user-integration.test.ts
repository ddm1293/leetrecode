import { DynamoDBClient, } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
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
    beforeEach(async () => {
        await setup(ddb, tableName);
    });

    afterEach(async () => {
        await teardown(ddb, tableName);
    });

    it('Test adding a user in local dynamoDB', async () => {
        const mockBody = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json',
        });

        const res = await handler(mockEvent as never, {} as Context);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        console.log("see body", body)
        expect(body.user).toBeDefined();
        expect(body.user.email).toBe('test@example.com');
        expect(body.user.password).toBe('password123');
    });

    it('Test failing adding an existing user', async () => {
        const mockBody = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json',
        });

        const res = await handler(mockEvent as never, {} as Context);
        expect(res.statusCode).toBe(200);

        const mockBody2 = {
            email: 'test@example.com',
            password: 'password1234',
        };

        const mockEvent2 = createMockEvent(mockBody2, {
            'Content-Type': 'application/json',
        });

        const res2 = await handler(mockEvent2 as never, {} as Context);
        expect(res2.statusCode).toBe(500);
        const body = JSON.parse(res2.body);
        expect(body.errorCode).toBe(203);
    })
})
