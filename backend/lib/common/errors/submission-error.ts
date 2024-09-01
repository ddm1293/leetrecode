import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class NullRecordInSubmissionDTOError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('NullRecordInSubmissionDTOError', message, ErrorCode.NULL_RECORD_IN_SUBMISSION_DTO_ERROR, originalError);
    }
}
