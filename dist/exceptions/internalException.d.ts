import { ErrorCode, HttpException } from "./root";
export declare class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any);
}
