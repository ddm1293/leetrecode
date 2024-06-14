import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { container, inject, injectable } from 'tsyringe';
import { ResponseManager } from '../../models/utils/response-manager.js';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

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
        return null as unknown as APIGatewayProxyResult;
    }
}

container.registerSingleton(LambdaHandler);
container.registerSingleton(ResponseManager);

const handlerInstance = container.resolve(LambdaHandler);
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const handler = middy()
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .handler(lambdaHandler);
