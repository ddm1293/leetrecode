import 'reflect-metadata';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';
import { injectable } from 'inversify';

dotenv.config();

const isLocal = process.env.NODE_ENV !== 'production';
const isSamLocal = process.env.SAM_LOCAL === 'true';

@injectable()
export class DynamoDBClientManager {
    public _client: DynamoDBDocumentClient;

    constructor() {
        console.log('see isLocal: ', isLocal);
        this._client = DynamoDBDocumentClient.from(
            new DynamoDBClient({
                // region: isLocal
                //     ? 'localhost'
                //     : process.env.CDK_DEFAULT_REGION,
                // endpoint: isSamLocal ?
                //     'http://host.docker.internal:8000' :
                //     isLocal ? 'http://localhost:8000' : 'https://dynamodb.us-west-2.amazonaws.com',
                region: 'us-west-2',
                endpoint: 'https://dynamodb.us-west-2.amazonaws.com'
            }),
        );
    }

    get client(): DynamoDBDocumentClient {
        return this._client;
    }
}
