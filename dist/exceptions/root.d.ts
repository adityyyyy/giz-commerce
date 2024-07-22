export declare class HttpException extends Error {
    message: string;
    errorCode: ErrorCode;
    statusCode: number;
    errors: any;
    constructor(message: string, errorCode: ErrorCode, statusCode: number, error: any);
}
export declare enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSIBLE_ENTITY = 2001,
    INTERNAL_SERVER_ERROR = 3001,
    UNAUTHORIZED_ACCESS = 4001,
    PRODUCT_NOT_FOUND = 5001,
    ADDRESS_NOT_FOUND = 1004
}
