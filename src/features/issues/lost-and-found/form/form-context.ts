import { createContext } from "react";
import type { LostAndFoundFormInstance } from "./form-provider";

export const LostAndFoundFormContext = createContext<
  LostAndFoundFormInstance | undefined
>(undefined);
