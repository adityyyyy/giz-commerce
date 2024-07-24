import { ErrorCode, HttpException } from "./root";

export class UnproccessibleEntity extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: any) {
    super(message, errorCode, 422, errors);
  }
}
