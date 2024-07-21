import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { Context } from 'aws-lambda';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { EventParser } from '../../common/event-parser.js';
import { SubmissionServiceImpl } from '../../services/submission-service.js';
import { Submission } from '../../models/submission.js';
import { AddSubmissionDto } from '../../models/dto/add-submission-dto.js';
import { NullRecordInSubmissionDTOError } from '../../common/errors/submission-error.js';

@injectable()
export class CreateSubmissionHandler implements LambdaInterface {
    private submissionService: SubmissionServiceImpl;

    public constructor(@inject(TYPES.SubmissionService) userService: SubmissionServiceImpl) {
        this.submissionService = userService;
    }

    private async parseSubmission(event: unknown, context: Context): Promise<Submission> {
        const dto: AddSubmissionDto = await EventParser.parseAddSubmissionDTO(event);
        console.log('see dto: ', JSON.stringify(dto, null, 2));
        let submission: Submission;
        if (dto.record) {
            submission = new Submission(dto.submissionDetails, dto.record)
        } else if (dto.recordCreated) {
            submission = new Submission(dto.submissionDetails, dto.recordCreated)
        } else {
            throw new NullRecordInSubmissionDTOError('There is no not null record in incoming event');
        }
        return submission;
    }

    public async handler(
        event: unknown,
        context: Context,
    ): Promise<Record<string, unknown>> {
        try {
            const submission = await this.parseSubmission(event, context);
            await this.submissionService.add('userTable', submission);

            return {
                submission: submission
            };
        } catch (error) {
            console.error(error);
            return {
                error: error
            }
        }
    }
}

const handlerInstance: CreateSubmissionHandler = container.resolve(CreateSubmissionHandler)
export const createSubmissionHandler = handlerInstance.handler.bind(handlerInstance);
