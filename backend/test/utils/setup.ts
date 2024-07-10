import {
    CreateTableCommand,
    DeleteTableCommand,
    DescribeTableCommand,
    ListTablesCommand,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const pollTable = async (ddb: DynamoDBDocumentClient, tableName: string): Promise<void> => {
    const table = await ddb.send(new DescribeTableCommand({
        TableName: tableName
    }))

    if (table.Table.TableStatus !== "ACTIVE") {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await pollTable(ddb, "ACTIVE")
    }
}

export const setup = async (ddb: DynamoDBDocumentClient, tableName: string) => {
    try {
        await ddb.send(new CreateTableCommand({
            AttributeDefinitions: [
                {
                    "AttributeName": "PK",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "SK",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "GSI1_PK",
                    "AttributeType": "S"
                },
                {
                    "AttributeName": "GSI1_SK",
                    "AttributeType": "S"
                },
            ],
            KeySchema: [
                {
                    "AttributeName": "PK",
                    "KeyType": "HASH"
                },
                {
                    "AttributeName": "SK",
                    "KeyType": "RANGE"
                }
            ],
            TableName: tableName,
            BillingMode: "PAY_PER_REQUEST",
            GlobalSecondaryIndexes: [
                {
                    IndexName: "GSI1",
                    KeySchema: [
                        {
                            AttributeName: "GSI1_PK",
                            KeyType: "HASH"
                        },
                        {
                            AttributeName: "GSI1_SK",
                            KeyType: "RANGE"
                        }
                    ],
                    Projection: {
                        ProjectionType: "ALL"
                    }
                }
            ]
        }));

        await pollTable(ddb, tableName);
    } catch (error) {
        console.log('Error creating table:', error);
    }
}

const pollTablesList = async (ddb: DynamoDBDocumentClient, tableName: string): Promise<void> => {
    const tables = await ddb.send(new ListTablesCommand());

    if (tables.TableNames.includes(tableName)) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await pollTablesList(ddb, tableName);
    }
}

export const teardown = async (ddb: DynamoDBDocumentClient, tableName: string) => {
    try {
        await ddb.send(new DeleteTableCommand({
            TableName: tableName
        }));

        await pollTablesList(ddb, tableName);
    } catch (error) {
        console.log('Error deleting table:', error);
    }
}
