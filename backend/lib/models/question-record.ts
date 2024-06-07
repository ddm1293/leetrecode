import { Item } from './common/item';
import { Submission } from './submission';
import { Note } from './note';
import { User } from './user';

export class QuestionRecord extends Item {
    public recordId: string;
    public userId: string;
    public questionId: string;
    public latestSubmissionId: string;
    public lastReviewDate: Date;
    public nextReviewDate: Date;
    public notes: Array<string>;
    public submissionCount: number;
    public createdAt: Date;
    public updatedAt: Date;
    public isArchived: boolean;

    constructor(
        recordId: string,
        ownerId: string,
        questionId: string,
        latestSubmissionId: string,
        lastReviewDate: Date,
        nextReviewDate: Date,
        notes: Array<string>,
        submissionCount: number,
        createdAt: Date,
        updatedAt: Date,
        isArchived: boolean,
    ) {
        super();
        this.recordId = recordId;
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
