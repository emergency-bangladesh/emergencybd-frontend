import { createContext } from "react";
import type { LanguageProviderState } from "./language-provider";

export const LanguageProviderContext =
  createContext<LanguageProviderState | null>(null);
