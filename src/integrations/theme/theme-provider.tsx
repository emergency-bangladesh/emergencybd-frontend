import { useEffect, useState } from "react";
import { ThemeProviderContext } from "./theme-provider-context";

type Theme = "dark" | "light";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({
  children,

  ...props
}: ThemeProviderProps) {
  const storageKey = "emr-theme";
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme && ["dark", "light"].includes(storedTheme)) {
      return storedTheme as Theme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
