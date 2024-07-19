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
import { RecordServiceImpl } from '../../services/record-service.js';

@injectable()
export class CreateRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;

    public constructor(@inject(TYPES.RecordService) recordService: RecordServiceImpl) {
        this.recordService = recordService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {

            return ResponseManager.success(200, {
                message: 'Record created successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: CreateRecordLambda = container.resolve(CreateRecordLambda)
export const createRecordHandler = handlerInstance.handler.bind(handlerInstance);
