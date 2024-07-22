import { ErrorCode, HttpException } from "./root";
export declare class UnproccessibleEntity extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any);
}
