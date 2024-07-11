import { inject, injectable } from 'inversify';
import { ItemRepository } from './common/item-repository.js';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';

@injectable()
export class RecordRepository extends ItemRepository {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }


}
