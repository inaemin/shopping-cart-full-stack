import { createBrowserRouter, RouterProvider } from "react-router";
import MobileLayout from "./components/MobileLayout";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { path: "cart", Component: CartPage },
      { path: "order-confirm", Component: OrderConfirmPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
