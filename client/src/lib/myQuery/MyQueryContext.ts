import { createContext } from "react";
import { MyQueryClient } from "./MyQueryClient";

export const MyQueryContext = createContext<MyQueryClient | null>(null);
