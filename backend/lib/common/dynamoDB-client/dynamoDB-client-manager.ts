import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const isLocal = process.env.NODE_ENV !== 'production';

export class DynamoDBClientManager {
    private static client: DynamoDBDocumentClient | null = null;

    public static getClient(): DynamoDBDocumentClient {
        if (!this.client) {
            this.client = DynamoDBDocumentClient.from(
                new DynamoDBClient({
                    region: isLocal
                        ? 'localhost'
                        : process.env.CDK_DEFAULT_REGION,
                    endpoint: isLocal ? 'http://dynamodb:8000' : undefined,
                }),
            );
        }
        return this.client;
    }
}
