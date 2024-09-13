import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateRecordDto {
    @Expose() @IsNotEmpty() @IsEmail() readonly email: string;
    @Expose() readonly userId: string;
    @Expose() readonly questionId: string;
    @Expose() readonly recordLastReviewDate: number;
    @Expose() readonly submissionDate: number;
    @Expose() readonly notes: string[];
}
