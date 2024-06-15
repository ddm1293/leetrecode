import { ResponseManager } from '../../models/utils/response-manager.js';
import { APIGatewayProxyResult } from 'aws-lambda';

export class ErrorHandler {
    public static handleError(
        responseManager: ResponseManager,
        error: unknown
    ): APIGatewayProxyResult {
        console.log('there is an error: ', error);
        if (error instanceof Error) {
            return responseManager.failure(500, error);
        }
        return responseManager.failure(500, new Error('Unknown error occurred'));
    }
}
