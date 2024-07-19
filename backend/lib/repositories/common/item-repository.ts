import 'reflect-metadata';
import { DynamoDBClientManager } from '../../common/dynamoDB-client/dynamoDB-client-manager.js';
import { Item, Key } from '../../models/common/item.js';
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand, GetCommandOutput,
    PutCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Repository } from './repository.js';
import { inject, injectable } from 'inversify';
import { ItemTransformer } from '../../models/common/item-transformer.js';
import { User } from '../../models/user';
import { FindItemError, ParseJsonError } from '../../common/errors/general-errors';

@injectable()
export class ItemRepository<T extends Item> implements Repository<T> {
    protected client: DynamoDBDocumentClient;

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

    async get(tableName: string, className: new (...args: any[]) => T, pk: string, sk?: string): Promise<T | null> {
        try {
            const key = sk ? { PK: pk, SK: sk } : { PK: pk };
            const item: GetCommandOutput = await this.client.send(
                new GetCommand({
                    TableName: tableName,
                    Key: key,
                }),
            );

            if (item.Item) {
                return ItemTransformer.deserialize(className, item.Item);
            }
            return null;
        } catch (error) {
            throw new FindItemError(`Failed to call get method: ${error}`);
        }
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

    async archive(tableName: string, key: Key): Promise<void> {
        await this.client.send(
            new UpdateCommand({
                TableName: tableName,
                Key: key,
                UpdateExpression: 'SET isArchived = :isArchived',
                ExpressionAttributeValues: {
                    ':isArchived': true,
                },
            })
        )
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
