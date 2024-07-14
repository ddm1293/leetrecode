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
import { SubmissionServiceImpl } from '../../services/submission-service.js';

@injectable()
export class CreateSubmissionHandler implements LambdaInterface {
    private submissionService: SubmissionServiceImpl;

    public constructor(@inject(TYPES.SubmissionService) userService: SubmissionServiceImpl) {
        this.submissionService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            console.log('Create Submission');

            return ResponseManager.success(200, {
                message: 'Submission created successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: CreateSubmissionHandler = container.resolve(CreateSubmissionHandler)
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const createSubmissionHandler = middy()
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .handler(lambdaHandler);
