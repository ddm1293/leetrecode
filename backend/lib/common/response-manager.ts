import 'reflect-metadata';
import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from './headers.js';
import { BaseError } from './errors/base-error.js';

export class ResponseManager {
    public static success(
        statusCode: number,
        body?: Record<string, unknown>,
    ): APIGatewayProxyResult {
        return {
            statusCode,
            headers,
            body: JSON.stringify(body),
        };
    }

    public static failure(statusCode: number, error: Error): APIGatewayProxyResult {
        const errorBody = error instanceof BaseError ? error.toObject() : {
            errorCode: '999',
            name: error.name,
            message: 'Unknown error occurred: ' + error.message,
        }
        return {
            statusCode,
            headers,
            body: JSON.stringify(errorBody),
        };
    }
}
