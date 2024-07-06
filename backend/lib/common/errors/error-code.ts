export enum ErrorCode {
    // General Error
    EMPTY_REQUEST_BODY_ERROR = 101,

    // User Error
    PARSE_USER_ERROR = 201,
    PERSIST_USER_ERROR= 202,
    USER_ALREADY_EXISTS= 203,
}
