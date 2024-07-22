import { ErrorCode, HttpException } from "./root";
export declare class BadRequestException extends HttpException {
    constructor(message: string, errorCode: ErrorCode);
}
