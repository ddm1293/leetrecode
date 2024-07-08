import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput } from '@aws-sdk/lib-dynamodb';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { setup, teardown } from '../../utils/setup.js';
import { createMockEvent } from '../../utils/create-mock-event.js';
import { createUserHandler } from '../../../lib/lambdas/users/create-user.js';
import { Context } from 'aws-lambda';
import { deleteUserHandler } from '../../../lib/lambdas/users/delete-user.js';
import { ErrorCode } from '../../../lib/common/errors/error-code.js';
import { getUserHandler } from '../../../lib/lambdas/users/get-user.js';


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

    it('Test deleting a user in local dynamoDB', async () => {
        const mockBody = {
            email: 'test@example.com',
            password: 'password123',
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json',
        });

        const res = await createUserHandler(mockEvent as never, {} as Context);
        expect(res.statusCode).toBe(200);

        const archivedBeforeRes: GetCommandOutput = await ddb.send(new GetCommand({
            TableName: tableName,
            Key: {
                PK: `USER#${JSON.parse(res.body).user.id}`,
                SK: "USER#METADATA"
            }
        }))
        const archivedBefore = archivedBeforeRes.Item;
        expect(archivedBefore).toBeDefined;
        expect(archivedBefore.email).toBe(mockBody.email);
        expect(archivedBefore).not.toHaveProperty('isArchived')

        const mockDeleteEvent = createMockEvent(null, {
            'Content-Type': 'application/json',
        }, null, {
            email: 'test@example.com',
        })

        const res2 = await deleteUserHandler(mockDeleteEvent as never, {} as Context);
        expect(res2.statusCode).toBe(200);

        const res3 = await getUserHandler(mockDeleteEvent as never, {} as Context);
        const archivedUser = JSON.parse(res3.body).user;
        expect(archivedUser).toBeDefined;
        expect(archivedUser.email).toEqual(archivedBefore.email);
        expect(archivedUser).toHaveProperty('isArchived', true);
    })

    it('should failing deleting non existent item', async () => {
        const mockDeleteEvent = createMockEvent(null, {
            'Content-Type': 'application/json',
        }, null, {
            email: 'test@example.com',
        })

        const res = await deleteUserHandler(mockDeleteEvent as never, {} as Context);
        expect(res.statusCode).toBe(500)
        const parsedRes = JSON.parse(res.body);
        expect(parsedRes.errorCode).toBe(ErrorCode.DELETE_NON_EXISTENT_USER_ERROR)
        expect(parsedRes.name).toBe('DeleteNonExistentUserError')
    })
})
