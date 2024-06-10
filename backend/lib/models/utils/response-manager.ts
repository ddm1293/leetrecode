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
            name: 'UnknownError',
            message: 'Unknown error occurred.',
        }
        return {
            statusCode,
            headers,
            body: JSON.stringify(errorBody),
        };
    }
}
