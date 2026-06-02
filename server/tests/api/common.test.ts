import { jest } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import { Request, Response, NextFunction } from "express";
import errorHandler from "../../src/middlewares/errorHandler.js";
import { ZodError } from "../../src/utils/z.js";
import { AppError } from "../../src/errors/AppError.js";

describe("공통 에러 핸들러", () => {
  it("존재하지 않는 경로로 요청하면 404를 반환한다.", async () => {
    const response = await request(app).get("/unknown");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: "NOT_FOUND",
      message: "요청한 리소스를 찾을 수 없습니다.",
    });
  });

  it("ZodError가 발생하면 400과 첫 번째 이슈 코드를 반환한다.", () => {
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    errorHandler(new ZodError([{ message: "REQUIRED_PRODUCT_NAME" }]), mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: "REQUIRED_PRODUCT_NAME",
      message: "상품 이름은 필수입니다.",
    });
  });

  it("AppError가 발생하면 해당 status와 code를 반환한다.", () => {
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    errorHandler(new AppError("PRODUCT_NOT_FOUND", 404), mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: "PRODUCT_NOT_FOUND",
      message: "요청한 상품을 찾을 수 없습니다.",
    });
  });

  it("예상치 못한 에러가 발생하면 500을 반환한다.", () => {
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn() as NextFunction;

    errorHandler(new Error("unexpected"), mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: "INTERNAL_SERVER_ERROR",
      message: "서버 내부 오류가 발생했습니다.",
    });
  });
});
