import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class ParseUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('ParseUserError', message, ErrorCode.PARSE_USER_ERROR, originalError);
    }
}
