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
