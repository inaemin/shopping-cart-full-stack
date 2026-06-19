import { createElement } from "react";
import type { Preview } from "@storybook/react-vite";
import { worker } from "../src/msw/browser";
import "../src/index.css";

// 데이터 패칭이 있는 스토리(예: CouponModal)를 위해 MSW 워커를 시작한다.
const mswReady = worker.start({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  loaders: [
    async () => {
      await mswReady;
      return {};
    },
  ],
  decorators: [
    (Story) =>
      createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
          },
        },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
