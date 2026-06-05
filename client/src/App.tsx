import { createBrowserRouter, RouterProvider } from "react-router";
import MobileLayout from "./components/MobileLayout";
import { ROUTES } from "./constants/routes";
import CartPage from "./pages/CartPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MobileLayout,
    children: [
      { path: ROUTES.CART.slice(1), Component: CartPage },
      { path: ROUTES.ORDER_CONFIRM.slice(1), Component: OrderConfirmPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
