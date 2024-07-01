import { QuestionRecord } from '../models/question-record.js';
import { Service } from './common/service.js';

export class RecordService implements Service<QuestionRecord> {
    async findOne(userId: string, questionId: string): Promise<QuestionRecord> {
        throw new Error('Method not implemented.');
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
    async add(item: QuestionRecord): Promise<QuestionRecord> {
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
}
