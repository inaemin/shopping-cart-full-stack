import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BASE_PATH } from "./constants/routes";

async function enableMocking() {
  const { worker } = await import("./msw/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${BASE_PATH}/mockServiceWorker.js`,
      options: { scope: `${BASE_PATH}/` },
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
