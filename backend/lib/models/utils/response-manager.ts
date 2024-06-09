import { singleton } from 'tsyringe';
import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from './headers.js';

@singleton()
export class ResponseManager {
    public createResponse(
        statusCode: number,
        body: Record<string, unknown>,
    ): APIGatewayProxyResult {
        return {
            statusCode,
            headers,
            body: JSON.stringify(body),
        };
    }
}
