import "@testing-library/jest-dom";
import { beforeEach, afterEach, afterAll, beforeAll } from "vitest";
import { setupServer } from "msw/node";
import { createHandlers } from "../msw/handlers";

export const server = setupServer(...createHandlers());

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

beforeEach(() => {
  server.resetHandlers(...createHandlers());
  localStorage.removeItem("cart_selection");
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
