import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { ResponseManager } from '../../common/response-manager.js';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { EventParser } from '../../common/event-parser.js';
import { RecordServiceImpl } from '../../services/record-service.js';

@injectable()
export class GetRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;

    public constructor(@inject(TYPES.RecordService) recordService: RecordServiceImpl) {
        this.recordService = recordService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            console.log('get record');

            return ResponseManager.success(200, {
                message: 'User created successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: GetRecordLambda = container.resolve(GetRecordLambda)
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const getRecordHandler = middy()
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .handler(lambdaHandler);