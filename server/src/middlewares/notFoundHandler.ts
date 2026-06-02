import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export function notFoundHandler(_request: Request, _response: Response, next: NextFunction): void {
  next(new AppError("NOT_FOUND", 404));
}
