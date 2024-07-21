import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { Context, } from 'aws-lambda';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { RecordServiceImpl } from '../../services/record-service.js';
import { EventParser } from '../../common/event-parser.js';
import { CreateRecordDto } from '../../models/dto/create-record-dto.js';
import { QuestionRecord } from '../../models/question-record.js';
import { UserServiceImpl } from '../../services/user-service.js';

@injectable()
export class CreateRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;
    private userService: UserServiceImpl;

    public constructor(
        @inject(TYPES.RecordService) recordService: RecordServiceImpl,
        @inject(TYPES.UserService) userService: UserServiceImpl,
    ) {
        this.recordService = recordService;
        this.userService = userService;
    }

    public async handler(
        event: unknown,
        context: Context,
    ): Promise<Record<string, unknown>> {
        try {
            const dto: CreateRecordDto = await EventParser.parseDTOFromObj(CreateRecordDto, event);
            const user = await this.userService.findOneByEmail('userTable', dto.email);
            const record = new QuestionRecord(
                user.id,
                dto.email,
                dto.submissionDetails.question.questionId,
                dto.submissionDetails.timestamp,
                dto.submissionDetails.timestamp,
                [],
                1,
                dto.submissionDetails.timestamp,
                dto.submissionDetails.timestamp,
                );
            const persistedRecord = await this.recordService.add('userTable', record);

            return  {
                recordCreated: persistedRecord
            };
        } catch (error) {
            console.error(error);
            return { error: error }
        }
    }
}

const handlerInstance: CreateRecordLambda = container.resolve(CreateRecordLambda)
export const createRecordHandler = handlerInstance.handler.bind(handlerInstance);
