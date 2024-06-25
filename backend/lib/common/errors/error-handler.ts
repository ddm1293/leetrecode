import { ResponseManager } from '../response-manager.js';
import { APIGatewayProxyResult } from 'aws-lambda';

export class ErrorHandler {
    public static handleError(error: unknown): APIGatewayProxyResult {
        console.log('there is an error: ', error);
        if (error instanceof Error) {
            return ResponseManager.failure(500, error);
        }
        return ResponseManager.failure(500, new Error('Unknown error occurred'));
    }
}
