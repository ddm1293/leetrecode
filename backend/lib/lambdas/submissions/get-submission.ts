import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { ResponseManager } from '../../common/response-manager.js';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { EventParser } from '../../common/event-parser.js';
import { SubmissionServiceImpl } from '../../services/submission-service.js';

@injectable()
export class GetSubmissionHandler implements LambdaInterface {
    private submissionService: SubmissionServiceImpl;

    public constructor(@inject(TYPES.SubmissionService) userService: SubmissionServiceImpl) {
        this.submissionService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            console.log('Get Submission');

            return ResponseManager.success(200, {
                message: 'Submission created successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: GetSubmissionHandler = container.resolve(GetSubmissionHandler)
export const getSubmissionHandler = handlerInstance.handler.bind(handlerInstance);
