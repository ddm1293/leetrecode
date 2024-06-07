import 'reflect-metadata';
import { describe, it, expect, beforeAll } from 'vitest';
import { handler, LambdaHandler } from '../../../lib/lambdas/users/create-user';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { container } from 'tsyringe';
import { ResponseManager } from '../../../lib/models/utils/response-manager';
import { createMockEvent } from '../utils/create-mock-event';

describe('LambdaHandler', () => {

    it("should be able to return a 200 response with a user object", async () => {
        const mockBody = {
            userId: 'test-user-id',
            email: 'test@example.com',
            password: 'password123'
        };

        const mockEvent = createMockEvent(mockBody, {
            'Content-Type': 'application/json'
        });

        /*
        * use as any here to turn off the type check because middy httpHeaderNormalizer
        * requires the mockEvent to have an extra field rawHeaders: Record<string, string>
        * that does not originally exist on APIGatewayProxyEvent and is to be added runtime.
        */

        const res = await handler(mockEvent as any, {} as Context);
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body.user).toBeDefined();
        expect(body.user.userId).toBe('test-user-id');
        expect(body.user.email).toBe('test@example.com');
    })
});
