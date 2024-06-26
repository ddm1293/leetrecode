import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { Item } from '../models/common/item.js';
import { DeleteCommand, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Repository } from './repository.js';

export class ItemRepository implements Repository {
    private client = DynamoDBClientManager.getClient();
    private static instance: ItemRepository;

    public static getInstance(): ItemRepository {
        if (!ItemRepository.instance) {
            ItemRepository.instance = new ItemRepository();
        }
        return ItemRepository.instance;
    }

    async save(item: Item, tableName: string): Promise<void> {
        await this.client.send(
            new PutCommand({
                TableName: tableName,
                Item: item.toItem(),
            }),
        );
    }

    async get(pk: string, tableName: string, sk?: string): Promise<Record<string, unknown> | null> {
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        const item = await this.client.send(
            new GetCommand({
                TableName: tableName,
                Key: key,
            }),
        );
        return item.Item || null;
    }

    async delete(pk: string, tableName: string, sk?: string): Promise<void> {
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        await this.client.send(
            new DeleteCommand({
                TableName: tableName,
                Key: key,
            }),
        );
    }

    async update(
        tableName: string,
        pk: string,
        expressionConfig: Record<string, any>,
        sk?: string,
    ): Promise<void> {
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        await this.client.send(
            new UpdateCommand({
                TableName: tableName,
                Key: key,
                UpdateExpression: expressionConfig.updateExpression,
                ExpressionAttributeValues: expressionConfig.expressionAttributeValues,
            }),
        );
    }
}
