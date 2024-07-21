import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubmissionDetailDto } from './check-record-dto.js';
import { QuestionRecord } from '../question-record.js';

export class AddSubmissionDto {
    @Expose() @IsNotEmpty() @IsEmail() email: string;
    @Expose() @IsNotEmpty() @Type(() => SubmissionDetailDto)
    submissionDetails: SubmissionDetailDto;
    @Expose() @IsNotEmpty() timestamp: number;
    @Expose() @IsNotEmpty() recordExists: boolean;
    @Expose() @Type(() => QuestionRecord)
    record: QuestionRecord | null;
    @Expose() @Type(() => QuestionRecord)
    recordCreated: QuestionRecord | null;
}

