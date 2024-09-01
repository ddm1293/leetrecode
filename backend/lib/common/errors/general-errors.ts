import { BaseError } from './base-error.js';
import { ErrorCode } from './error-code.js';

export class EmptyRequestBodyError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('EmptyRequestBodyError', message, ErrorCode.EMPTY_REQUEST_BODY_ERROR, originalError);
    }
}

export class EmptyPathParamsError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('EmptyPathParamsError', message, ErrorCode.EMPTY_PATH_PARAMS_ERROR, originalError);
    }
}

export class ParseJsonError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('ParseJsonError', message, ErrorCode.PARSE_JSON_ERROR, originalError);
    }
}

export class FindItemError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('FindItemError', message, ErrorCode.FIND_ITEM_ERROR, originalError);
    }
}

export class EmptyTableNameError extends BaseError {
    constructor(message: string, originalError?: Error) {
        super('EmptyTableNameError', message, ErrorCode.EMPTY_TABLE_NAME_ERROR, originalError);
    }
}
