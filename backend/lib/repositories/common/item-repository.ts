import 'reflect-metadata';
import { DynamoDBClientManager } from '../../common/dynamoDB-client/dynamoDB-client-manager.js';
import { Item } from '../../models/common/item.js';
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Repository } from './repository.js';
import { inject, injectable } from 'inversify';
import { ItemTransformer } from '../../models/common/item-transformer.js';

@injectable()
export class ItemRepository implements Repository {
    private client: DynamoDBDocumentClient;

    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        this.client = DBClient.client
    }

    async save(item: Item, tableName: string): Promise<void> {
        await this.client.send(
            new PutCommand({
                TableName: tableName,
                Item: ItemTransformer.serialize(item),
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
