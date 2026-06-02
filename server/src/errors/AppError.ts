import { ERROR_RESPONSE } from "../constants/error.js";

export class AppError extends Error {
  public code: keyof typeof ERROR_RESPONSE;
  public status: number;

  constructor(code: keyof typeof ERROR_RESPONSE, status: number) {
    super(code);
    this.code = code;
    this.status = status;
  }
}
