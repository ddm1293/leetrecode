import { BaseError } from './base-error';
import { ErrorCode } from './error-code';

export class FindRecordError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('FindRecordError', message, ErrorCode.FIND_RECORD_ERROR, originalError);
    }
}
