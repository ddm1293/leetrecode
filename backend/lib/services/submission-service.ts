import { Service } from './common/service.js';
import { Submission } from '../models/submission.js';
import { SubmissionRepository } from '../repositories/submission-repository.js';
import { inject } from 'inversify';
import { TYPES } from '../common/types.js';

export interface SubmissionService extends Service<Submission> {}

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
    add(tableName: string, item: Submission): Promise<Submission> {
        throw new Error('Method not implemented.');
    }
    archive(tableName: string, key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
