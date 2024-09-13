import { Item } from './common/item.js';
import { Expose } from 'class-transformer';

export class QuestionRecord extends Item {
    @Expose() public userId: string;
    @Expose() public email: string;
    @Expose() public questionId: string;
    @Expose() public latestSubmissionId: string  | null;
    @Expose() public lastReviewDate: number;
    @Expose() public nextReviewDate: number;
    @Expose() public notes: string[];
    @Expose() public submissionCount: number;

    constructor(
        userId: string,
        email: string,
        questionId: string,
        lastReviewDate: number,
        nextReviewDate: number,
        notes: string[],
    ) {
        super();
        this.userId = userId;
        this.email = email;
        this.questionId = questionId;
        this.lastReviewDate = lastReviewDate;
        this.nextReviewDate = nextReviewDate;
        this.notes = notes;
    }

    get pk(): string {
        return `USER#${this.userId}`;
    }
    get sk(): string {
        return `RECORD#${this.questionId}`;
    }

    public gsi1_pk(): string {
        return this.email;
    }

    public gsi1_sk(): string {
        return this.questionId;
    }
}
