import { DynamoDBClientManager } from '../../common/dynamoDB-client/dynamoDB-client-manager.js';
import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ulid } from 'ulid';

export abstract class Item {
    public id: string;
    abstract get pk(): string;
    abstract get sk(): string;

    public keys(): Key {
        return {
            PK: this.pk,
            SK: this.sk,
        };
    }

    private setId(id: string): void {
        this.id = id;
    }

    public toItem(): Record<string, unknown> {
        const item = {
            ...instanceToPlain(this),
            ...this.keys()
        };
        console.log("see item generated in toItem: ", item);
        return item;
    }

    public static async fromItem<T extends Item>(
        this: new (...args: any[]) => T,
        item: Record<string, unknown>,
    ): Promise<T> {
        const instance: T = plainToInstance(this, item);
        if (!instance.id) {
            instance.setId(ulid());
        }
        await validateOrReject(instance);
        console.log("see item generated in fromItem: ", instance);
        return instance;
    }

    public async save(tableName: string): Promise<void> {
        const client = DynamoDBClientManager.getClient();
        await client.send(
            new PutCommand({
                TableName: tableName,
                Item: this.toItem(),
            }),
        );
    }

    public async get(
        tableName: string,
        pk: string,
        sk?: string,
    ): Promise<Record<string, unknown> | null> {
        const client = DynamoDBClientManager.getClient();
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        const item = await client.send(
            new GetCommand({
                TableName: tableName,
                Key: key,
            }),
        );
        return item.Item || null;
    }

    public async delete(
        tableName: string,
        pk: string,
        sk?: string,
    ): Promise<void> {
        const client = DynamoDBClientManager.getClient();
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        await client.send(
            new DeleteCommand({
                TableName: tableName,
                Key: key,
            }),
        );
    }

    // TODO: may consider make expressionConfig a type
    public async update(
        tableName: string,
        pk: string,
        expressionConfig: Record<string, any>,
        sk?: string,
    ): Promise<void> {
        const client = DynamoDBClientManager.getClient();
        const key = sk ? { PK: pk, SK: sk } : { PK: pk };
        await client.send(
            new UpdateCommand({
                TableName: tableName,
                Key: key,
                UpdateExpression: expressionConfig.updateExpression,
                ExpressionAttributeValues:
                    expressionConfig.expressionAttributeValues,
            }),
        );
    }
}

interface Key {
    PK: string;
    SK: string;
}
