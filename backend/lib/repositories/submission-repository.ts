import { inject, injectable } from 'inversify';
import { ItemRepository } from './common/item-repository.js';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { Submission } from '../models/submission';

@injectable()
export class SubmissionRepository extends ItemRepository<Submission> {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }
}
