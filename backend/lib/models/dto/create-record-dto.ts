import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateRecordDto {
    @Expose() @IsNotEmpty() @IsEmail() email: string;
    @Expose() @IsNotEmpty() @Type(() => SubmissionDetailDto)
    submissionDetails: SubmissionDetailDto;
}

export class SubmissionDetailDto {
    @Expose() runtime: number;
    @Expose() runtimeDisplay: string;
    @Expose() runtimePercentile: number;
    @Expose() runtimeDistribution: string;
    @Expose() memory: number;
    @Expose() memoryDisplay: string;
    @Expose() memoryPercentile: number;
    @Expose() memoryDistribution: string;
    @Expose() code: string;
    @Expose() timestamp: number;
    @Expose() statusCode: number;
    @Expose() user: {
        username: string;
        profile: {
            realName: string;
            userAvatar: string;
        };
    };
    @Expose() lang: {
        name: string;
        verboseName: string;
    };
    @Expose() question: {
        questionId: string;
        titleSlug: string;
        hasFrontendPreview: boolean;
    };
    @Expose() notes: string;
    @Expose() flagType: string;
    @Expose() topicTags: string[];
    @Expose() runtimeError: string | null;
    @Expose() compileError: string | null;
    @Expose() lastTestcase: string;
    @Expose() codeOutput: string;
    @Expose() expectedOutput: string;
    @Expose() totalCorrect: number;
    @Expose() totalTestcases: number;
    @Expose() fullCodeOutput: string | null;
    @Expose() testDescriptions: string | null;
    @Expose() testBodies: string | null;
    @Expose() testInfo: string | null;
    @Expose() stdOutput: string;
}
