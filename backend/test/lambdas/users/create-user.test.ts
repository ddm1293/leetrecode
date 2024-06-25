import 'reflect-metadata';
import { describe, it, expect, vi } from 'vitest';
import { handler } from '../../../lib/lambdas/users/create-user.js';
import { Context } from 'aws-lambda';
import { createMockEvent } from '../utils/create-mock-event.js';
import * as dotenv from 'dotenv';

dotenv.config();

vi.mock('@aws-sdk/lib-dynamodb', () => ({
    DynamoDBDocumentClient: {
        from: vi.fn().mockReturnValue({
            send: vi.fn(),
        }),
    },
    PutCommand: vi.fn(),
}));

describe('LambdaHandler', () => {
    it('should be able to return a 200 response with a user object', async () => {
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
});
