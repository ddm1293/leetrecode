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
import { CreateRecordDto } from '../../models/dto/create-record-dto';

@injectable()
export class CheckRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;

    public constructor(@inject(TYPES.RecordService) recordService: RecordServiceImpl) {
        this.recordService = recordService;
    }

    public async handler(
        event: unknown,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            const dto: CreateRecordDto = await EventParser.parseCreateRecordDTO(event);
            const email = dto.email;
            const questionId = dto.submissionDetails.question.questionId;
            const checkRecord = await this.recordService.checkRecord('userTable', email, questionId);

            return ResponseManager.success(200, {
                message: `Record exists? ${checkRecord}`,
                boolean: checkRecord
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: CheckRecordLambda = container.resolve(CheckRecordLambda)
export const checkRecordHandler = handlerInstance.handler.bind(handlerInstance);
