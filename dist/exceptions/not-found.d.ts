import { ErrorCode, HttpException } from "./root";
export declare class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode);
}
