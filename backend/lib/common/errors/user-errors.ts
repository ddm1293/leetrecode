import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

// TODO: impl basic message for every error; and investigate how to make originalError more useful
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

export class FindUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('FindUserError', message, ErrorCode.FIND_USER_ERROR, originalError);
    }
}

export class UpdateUserError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('UpdateUserError', message, ErrorCode.UPDATE_USER_ERROR, originalError);
    }
}

export class EmailHasBeenRegisteredError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('EmailHasBeenRegisteredError', message, ErrorCode.EMAIL_HAS_BEEN_REGISTERED, originalError);
    }
}

export class IdenticalPasswordError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('IdenticalPasswordError', message, ErrorCode.IDENTICAL_PASSWORD_ERROR, originalError);
    }
}
