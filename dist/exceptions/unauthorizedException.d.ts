import { ErrorCode, HttpException } from "./root";
export declare class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors?: any);
}
