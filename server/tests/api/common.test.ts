import request from "supertest";
import app from "../../src/app.js";

describe("공통 404 핸들러", () => {
  it("존재하지 않는 경로로 요청하면 404를 반환한다.", async () => {
    const response = await request(app).get("/unknown");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      code: "NOT_FOUND",
      message: "요청한 리소스를 찾을 수 없습니다.",
    });
  });
});
