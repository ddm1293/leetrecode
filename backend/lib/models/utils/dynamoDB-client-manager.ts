import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

export class DynamoDBClientManager {
    private static client: DynamoDBDocumentClient | null = null;

    public static getClient(): DynamoDBDocumentClient {
        if (!this.client) {
            this.client = DynamoDBDocumentClient.from(
                new DynamoDBClient({
                    region: process.env.CDK_DEFAULT_REGION,
                }),
            );
        }
        return this.client;
    }
}
