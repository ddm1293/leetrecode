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
        const requestBody = event.body;

        if (!requestBody || typeof requestBody !== 'object') {
            return this.responseManager.createResponse(400, {
                message:
                    'Request body is required and must be a valid JSON object',
            });
        }

        const user = await User.fromItem(
            requestBody as Record<string, unknown>,
        );

        await user.save('userTable');

        const response = {
            message: 'User created successfully',
            user,
        };
        return this.responseManager.createResponse(200, response);
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
