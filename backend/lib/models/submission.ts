import { Item } from './common/item.js';
import { Expose } from 'class-transformer';
import { QuestionRecord } from './question-record.js';
import { SubmissionDetailDto } from './dto/check-record-dto.js';

export class Submission extends Item {
    @Expose() public runtime: number;
    @Expose() public memory: number;
    @Expose() public code: string;
    @Expose() public userId: string;
    @Expose() public lang: string;
    @Expose() public questionId: string;
    @Expose() readonly metaData: SubmissionDetailDto;
    @Expose() public record: QuestionRecord;
    @Expose() public notes: string;
    @Expose() public tags: string[];

    constructor(metaData: SubmissionDetailDto, record: QuestionRecord) {
        super();
        this.runtime = metaData.runtime;
        this.memory = metaData.memory;
        this.code = metaData.code;
        this.userId = record.userId;
        this.lang = metaData.lang.name;
        this.questionId = metaData.question.questionId;
        this.metaData = metaData;
        this.notes = metaData.notes;
        this.tags = metaData.topicTags;
    }

    get pk(): string {
        return `USER#${this.userId}#RECORD#${this.questionId}#SUBMISSION`;
    }
    get sk(): string {
        return `SUBMISSION#${this.id}`;
    }
}
