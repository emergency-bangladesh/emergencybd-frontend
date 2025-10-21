import { useContext } from "react";
import type { ThemeProviderState } from "./theme-provider";
import { ThemeProviderContext } from "./theme-provider-context";

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === null)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
