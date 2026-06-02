import { NextFunction, Request, Response } from "express";

export function asyncHandler(fn: (request: Request, response: Response) => Promise<void>) {
  return (request: Request, response: Response, next: NextFunction) => {
    fn(request, response).catch(next);
  };
}
