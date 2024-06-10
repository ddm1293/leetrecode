import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class EmptyRequestBodyError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('EmptyRequestBodyError', message, ErrorCode.EMPTY_REQUEST_BODY_ERROR, originalError);
    }
}
