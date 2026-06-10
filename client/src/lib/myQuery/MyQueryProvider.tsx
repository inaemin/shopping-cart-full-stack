import { useState, type ReactNode } from "react";
import { MyQueryClient } from "./MyQueryClient";
import { MyQueryContext } from "./MyQueryContext";

interface MyQueryProviderProps {
  children: ReactNode;
}

export function MyQueryProvider({ children }: MyQueryProviderProps) {
  const [myQueryClient] = useState(() => new MyQueryClient());

  return <MyQueryContext.Provider value={myQueryClient}>{children}</MyQueryContext.Provider>;
}
