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

export class UserNotFoundError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('UserNotFoundError', message, ErrorCode.USER_NOT_FOUND, originalError);
    }
}

export class DeleteNonExistentUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('DeleteNonExistentUserError', message, ErrorCode.DELETE_NON_EXISTENT_USER_ERROR, originalError);
    }
}

export class ArchiveUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('ArchiveUserError', message, ErrorCode.ARCHIVE_USER_ERROR, originalError);
    }
}
