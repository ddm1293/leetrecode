import 'reflect-metadata';
import { singleton } from 'tsyringe';
import { APIGatewayProxyResult } from 'aws-lambda';
import { headers } from './headers.js';
import { BaseError } from '../../common/errors/base-error.js';

@singleton()
export class ResponseManager {
    public success(
        statusCode: number,
        body?: Record<string, unknown>,
    ): APIGatewayProxyResult {
        return {
            statusCode,
            headers,
            body: JSON.stringify(body),
        };
    }

    public failure(statusCode: number, error: Error): APIGatewayProxyResult {
        const errorBody = error instanceof BaseError ? error.toObject() : {
            errorCode: '999',
            name: error.name,
            message: 'Unknown error occurred: ' + error.message,
            stack: error.stack,
        }
        return {
            statusCode,
            headers,
            body: JSON.stringify(errorBody),
        };
    }
}
