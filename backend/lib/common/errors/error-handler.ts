import { ResponseManager } from '../../models/utils/response-manager.js';
import { APIGatewayProxyResult } from 'aws-lambda';

export class ErrorHandler {
    public static handleError(
        responseManager: ResponseManager,
        error: unknown
    ): APIGatewayProxyResult {
        if (error instanceof Error) {
            console.log('there is an error');
            return responseManager.failure(500, error);
        }
        return responseManager.failure(500, new Error('Unknown error occurred'));
    }
}
