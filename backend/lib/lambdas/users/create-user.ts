import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { container, inject, injectable } from 'tsyringe';
import { ResponseManager } from '../../models/utils/response-manager.js';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { User } from '../../models/user.js';
import { ParseUserError } from '../../common/errors/user-errors.js';
import { EmptyRequestBodyError } from '../../common/errors/general-errors.js';
import { ErrorHandler } from '../../common/errors/error-handler.js';

@injectable()
export class LambdaHandler implements LambdaInterface {
    constructor(
        @inject(ResponseManager)
        private readonly responseManager: ResponseManager,
    ) {}

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            console.log('Incoming event:', JSON.stringify(event));

            const user: User = await this.parseEventIntoUser(event.body);

            console.log('Parsed user:', JSON.stringify(user));

            await user.save('userTable');

            console.log('see if it is saved');

            return this.responseManager.success(200, {
                message: 'User created successfully',
                user,
            });
        } catch (error) {
            return ErrorHandler.handleError(this.responseManager, error);
        }
    }

    private async parseEventIntoUser(body: string | null): Promise<User> {
        if (!body || typeof body !== 'object') {
            throw new EmptyRequestBodyError(
                'Request body is empty, potentially due to middy failing parsing incoming event'
            );
        }

        try {
            return await User.fromItem(body as Record<string, unknown>,);
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError(
                    "Failed to parse incoming event into a User object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into a User object');
            }
        }
    }
}

// TODO: figure out how this register/resolve works
container.registerSingleton(LambdaHandler);
container.registerSingleton(ResponseManager);

const handlerInstance = container.resolve(LambdaHandler);
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const handler = middy()
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .handler(lambdaHandler);
