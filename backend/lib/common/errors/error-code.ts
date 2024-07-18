import { EmailHasBeenRegisteredError, FindUserError, IdenticalPasswordError, UpdateUserError } from './user-errors';
import { ParseJsonError } from './general-errors';

export enum ErrorCode {
    // General Error
    EMPTY_REQUEST_BODY_ERROR = 101,
    EMPTY_PATH_PARAMS_ERROR = 102,
    PARSE_JSON_ERROR = 103,

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
}
