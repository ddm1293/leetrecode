import { Expose, Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { SubmissionDetailDto } from './check-record-dto.js';

export class CreateRecordDto {
    @Expose() @IsNotEmpty() @IsEmail() email: string;
    @Expose() @IsNotEmpty() @Type(() => SubmissionDetailDto)
    submissionDetails: SubmissionDetailDto;
    @Expose() @IsNotEmpty() recordExists: boolean;
}

