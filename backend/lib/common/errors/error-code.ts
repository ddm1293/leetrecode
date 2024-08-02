import { FindRecordError, PersistRecordError, RecordAlreadyExistsError } from './record-errors';
import { NullRecordInSubmissionDTOError } from './submission-error';

export enum ErrorCode {
    // General Error
    EMPTY_REQUEST_BODY_ERROR = 101,
    EMPTY_PATH_PARAMS_ERROR = 102,
    PARSE_JSON_ERROR = 103,
    FIND_ITEM_ERROR = 104,

    // User Error
    PARSE_USER_ERROR = 201,
    PERSIST_USER_ERROR= 202,
    USER_ALREADY_EXISTS= 203,
    USER_NOT_FOUND= 204,
    DELETE_NON_EXISTENT_USER_ERROR = 205,
    ARCHIVE_USER_ERROR = 206,
    FIND_USER_ERROR = 207,
    UPDATE_USER_ERROR = 208,
    EMAIL_HAS_BEEN_REGISTERED = 209,
    IDENTICAL_PASSWORD_ERROR = 210,

    // Record Error
    FIND_RECORD_ERROR = 301,
    PERSIST_RECORD_ERROR = 302,
    RECORD_ALREADY_EXISTS_ERROR = 303,

    // Submission Error
    NULL_RECORD_IN_SUBMISSION_DTO_ERROR = 401,
}
