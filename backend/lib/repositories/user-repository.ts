import { ItemRepository } from './common/item-repository.js';
import { inject, injectable } from 'inversify';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { User } from '../models/user.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ItemTransformer } from '../models/common/item-transformer.js';

@injectable()
export class UserRepository extends ItemRepository {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }

    async findUserByEmail(tableName: string, email: string): Promise<User | null> {
        const res = await this.client.send(new QueryCommand({
            TableName: tableName,
            IndexName: 'userEmailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email,
            },
            Limit: 1
        }));

        if (res.Items && res.Items.length > 0) {
            console.log("see user found in findUserByEmail", JSON.stringify(res.Items[0], null, 2))
            return ItemTransformer.deserialize(User, res.Items[0]);
        }

        return null;
    }
}
