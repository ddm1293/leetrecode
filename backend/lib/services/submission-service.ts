import { Service } from './common/service.js';
import { Submission } from '../models/submission.js';
import { SubmissionRepository } from '../repositories/submission-repository.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { PersistRecordError } from '../common/errors/record-errors';

export interface SubmissionService extends Service<Submission> {}

@injectable()
export class SubmissionServiceImpl implements SubmissionService {
    private readonly repository: SubmissionRepository;

    public constructor(@inject(TYPES.SubmissionRepository) repository: SubmissionRepository) {
        this.repository = repository;
    }

    findOne(userId: string, ...params: string[]): Promise<Submission> {
        throw new Error('Method not implemented.');
    }
    update(userId: string, data: Submission): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async add(tableName: string, submission: Submission): Promise<Submission> {
        try {
            await this.repository.save(submission, tableName);
            return submission;
        } catch (error) {
            console.error(error);
            throw new PersistRecordError('Failed to save the user into DB')
        }
    }
    archive(tableName: string, key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
