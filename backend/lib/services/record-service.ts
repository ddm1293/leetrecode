import { QuestionRecord } from '../models/question-record.js';
import { Service } from './common/service.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { RecordRepository } from '../repositories/record-repository.js';

export interface RecordService extends Service<QuestionRecord> {}

@injectable()
export class RecordServiceImpl implements RecordService {
    private readonly repository: RecordRepository;

    public constructor(@inject(TYPES.RecordRepository) repository: RecordRepository) {
        this.repository = repository;
    }
    async findOne(tableName: string, userId: string, questionId: string): Promise<QuestionRecord | null> {
        return this.repository.get(tableName, QuestionRecord, userId, questionId);
    }
    async findRecordByEmail(tableName:string, email: string, questionId: string): Promise<QuestionRecord | null> {
        return this.repository.findRecordByEmail(tableName, email, questionId);
    }
    async findAllActive(userId: string): Promise<QuestionRecord[]> {
        throw new Error('Method not implemented.');
    }
    async findAllArchived(userId: string): Promise<QuestionRecord[]> {
        throw new Error('Method not implemented.');
    }
    async update(id: string, data: QuestionRecord): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async add(tableName: string, item: QuestionRecord): Promise<QuestionRecord> {
        throw new Error('Method not implemented.');
    }
    async archive(userId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async archiveMany(userId: string, questionIds: string[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async activate(userId: string, questionId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async activateMany(userId: string, questionIds: string[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async checkRecord(tableName: string, email :string, questionId: string): Promise<boolean> {
        const checkRecord = await this.repository.findRecordByEmail(tableName, email, questionId);
        return checkRecord != null;
    }
}
