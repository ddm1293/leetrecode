import 'reflect-metadata';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import { injectable } from 'inversify';

dotenv.config();

const isLocal = process.env.NODE_ENV !== 'production';

@injectable()
export class DynamoDBClientManager {
    public _client: DynamoDBDocumentClient;

    constructor() {
        this._client = DynamoDBDocumentClient.from(
            new DynamoDBClient({
                region: isLocal
                    ? 'localhost'
                    : process.env.CDK_DEFAULT_REGION,
                endpoint: isLocal ? 'http://dynamodb:8000' : undefined,
            }),
        );
    }

    get client(): DynamoDBDocumentClient {
        return this._client;
    }
}
