import { Item } from './common/item.js';
import { Expose } from 'class-transformer';

export class QuestionRecord extends Item {
    @Expose() public userId: string;
    @Expose() public questionId: string;
    @Expose() public latestSubmissionId: string;
    @Expose() public lastReviewDate: Date;
    @Expose() public nextReviewDate: Date;
    @Expose() public notes: string[];
    @Expose() public submissionCount: number;
    @Expose() public createdAt: Date;
    @Expose() public updatedAt: Date;
    @Expose() public isArchived: boolean;

    constructor(
        ownerId: string,
        questionId: string,
        latestSubmissionId: string,
        lastReviewDate: Date,
        nextReviewDate: Date,
        notes: string[],
        submissionCount: number,
        createdAt: Date,
        updatedAt: Date,
        isArchived: boolean,
    ) {
        super();
        this.userId = ownerId;
        this.questionId = questionId;
        this.latestSubmissionId = latestSubmissionId;
        this.lastReviewDate = lastReviewDate;
        this.nextReviewDate = nextReviewDate;
        this.notes = notes;
        this.submissionCount = submissionCount;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isArchived = isArchived;
    }

    get pk(): string {
        return `USER#${this.userId}`;
    }
    get sk(): string {
        return `RECORD#${this.questionId}`;
    }
}
