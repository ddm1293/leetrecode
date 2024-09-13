import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class FindRecordError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('FindRecordError', message, ErrorCode.FIND_RECORD_ERROR, originalError);
    }
}

export class PersistRecordError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('PersistRecordError', message, ErrorCode.PERSIST_RECORD_ERROR, originalError);
    }
}

export class RecordAlreadyExistsError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('RecordAlreadyExistsError', message, ErrorCode.RECORD_ALREADY_EXISTS_ERROR, originalError);
    }
}

export class UpdateRecordError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('UpdateRecordError', message, ErrorCode.UPDATE_RECORD_ERROR, originalError);
    }
}
