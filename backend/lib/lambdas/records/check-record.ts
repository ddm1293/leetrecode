import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { Context } from 'aws-lambda';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { EventParser } from '../../common/event-parser.js';
import { RecordServiceImpl } from '../../services/record-service.js';
import { CheckRecordDto } from '../../models/dto/check-record-dto.js';

@injectable()
export class CheckRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;

    public constructor(@inject(TYPES.RecordService) recordService: RecordServiceImpl) {
        this.recordService = recordService;
    }

    public async handler(
        event: unknown,
        context: Context,
    ): Promise<Record<string, unknown>> {
        try {
            const dto: CheckRecordDto = await EventParser.parseDTOFromObj(CheckRecordDto, event);
            const email = dto.email;
            const questionId = dto.submissionDetails.question.questionId;
            return this.recordService.checkRecord('userTable', email, questionId);
        } catch (error) {
            console.error(error)
            return {
                error: error
            }
        }
    }
}

const handlerInstance: CheckRecordLambda = container.resolve(CheckRecordLambda)
export const checkRecordHandler = handlerInstance.handler.bind(handlerInstance);
