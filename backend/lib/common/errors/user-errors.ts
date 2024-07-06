import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class ParseUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('ParseUserError', message, ErrorCode.PARSE_USER_ERROR, originalError);
    }
}

export class PersistUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('PersistUserError', message, ErrorCode.PERSIST_USER_ERROR, originalError);
    }
}

export class UserAlreadyExistsError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('UserAlreadyExistsError', message, ErrorCode.USER_ALREADY_EXISTS, originalError);
    }
}
