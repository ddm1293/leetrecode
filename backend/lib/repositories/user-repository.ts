import { ItemRepository } from './common/item-repository.js';
import { inject, injectable } from 'inversify';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { User } from '../models/user.js';
import { QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { FindUserError } from '../common/errors/user-errors.js';
import { Key } from '../models/common/item.js';

@injectable()
export class UserRepository extends ItemRepository<User> {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }

    async findUserByEmail(tableName: string, email: string): Promise<User | null> {
        try {
            const res = await this.client.send(new QueryCommand({
                TableName: tableName,
                IndexName: 'GSI1',
                KeyConditionExpression: '#gsi1pk = :email',
                ExpressionAttributeNames: {
                    '#gsi1pk': 'GSI1_PK',
                },
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
        } catch (error) {
            console.error(error);
            throw new FindUserError(`Something wrong find user with ${email} in dynamoDB`);
        }
    }

    async updateEmail(tableName: string, key: Key, newEmail: string) {
        await this.client.send(
            new UpdateCommand({
                TableName: tableName,
                Key: key,
                UpdateExpression: 'SET email = :newEmail, GSI1_PK = :newEmail',
                ExpressionAttributeValues: {
                    ':newEmail': newEmail,
                },
            })
        )
    }

    async updatePassword(tableName: string, key: Key, newPassword: string) {
        await this.client.send(
            new UpdateCommand({
                TableName: tableName,
                Key: key,
                UpdateExpression: 'SET password = :newPassword',
                ExpressionAttributeValues: {
                    ':newPassword': newPassword,
                },
            })
        )
    }
}
