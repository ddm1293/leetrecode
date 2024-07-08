import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { setup, teardown } from '../../utils/setup.js';
import { createMockEvent } from '../../utils/create-mock-event.js';
import { createUserHandler } from '../../../lib/lambdas/users/create-user.js';
import { Context } from 'aws-lambda';
import { updateUserEmailHandler } from '../../../lib/lambdas/users/update-user-email.js';
import { getUserHandler } from '../../../lib/lambdas/users/get-user.js';
import { ErrorCode } from '../../../lib/common/errors/error-code.js';
import { updateUserPasswordHandler } from '../../../lib/lambdas/users/update-user-password.js';

const ddbClient = new DynamoDBClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
})

const ddb = DynamoDBDocumentClient.from(ddbClient)

const tableName = 'userTable'

describe('User CRUD test', () => {
    let mockBody: Record<string, unknown>;

    beforeEach(async () => {
        await setup(ddb, tableName);

        mockBody = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json',
        });

        await createUserHandler(mockEvent as never, {} as Context);
    });

    afterEach(async () => {
        await teardown(ddb, tableName);
    });

    it('Test updating a user\'s email in local dynamoDB', async () => {
        const mockUpdateEmailEvent = createMockEvent({
            currentEmail: 'test@example.com',
            newEmail: 'updated@example.com',
        }, {
            'Content-Type': 'application/json',
        });

        const res2 = await updateUserEmailHandler(mockUpdateEmailEvent as never, {} as Context);
        expect(res2.statusCode).toBe(200);

        const mockGetEvent = createMockEvent(null, {
            'Content-Type': 'application/json',
        }, null, {
            email: 'test@example.com',
        })
        const res3 = await getUserHandler(mockGetEvent as never, {} as Context);
        expect(res3.statusCode).toBe(500);
        expect(JSON.parse(res3.body).errorCode).toBe(ErrorCode.USER_NOT_FOUND)

        const mockGetEventUpdated = createMockEvent(null, {
            'Content-Type': 'application/json',
        }, null, {
            email: 'updated@example.com',
        })
        const res4 = await getUserHandler(mockGetEventUpdated as never, {} as Context);
        expect(res4.statusCode).toBe(200);
        const userUpdated = JSON.parse(res4.body);
        expect(userUpdated.user.email).toBe('updated@example.com');
    })

    it('should fail when the new email to be updated has been registered', async () => {})

    it('Test updating a user\'s password', async () => {
        const mockGetEvent = createMockEvent(null, {
            'Content-Type': 'application/json',
        }, null, {
            email: 'test@example.com',
        })

        const res = await getUserHandler(mockGetEvent as never, {} as Context);
        const passwordBefore = JSON.parse(res.body).user.password;
        expect(passwordBefore).toBe(mockBody.password);

        const mockUpdatePasswordEvent = createMockEvent({
            currentEmail: 'test@example.com',
            newPassword: 'password123456',
        }, {
            'Content-Type': 'application/json',
        });

        const res2 = await updateUserPasswordHandler(mockUpdatePasswordEvent as never, {} as Context);
        expect(res2.statusCode).toBe(200);

        const res3 = await getUserHandler(mockGetEvent as never, {} as Context);
        const passwordAfter = JSON.parse(res3.body).user.password;
        expect(passwordAfter).not.toBe(passwordBefore);
        expect(passwordAfter).toBe('password123456');
    })

    it('should fail when passwords are identical before and now', async () => {})
})
