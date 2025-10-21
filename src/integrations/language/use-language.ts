import { useContext } from "react";
import type { LanguageProviderState } from "./language-provider";
import { LanguageProviderContext } from "./language-provider-context";

export const useLanguage = (): LanguageProviderState => {
  const context = useContext(LanguageProviderContext);

  if (context === null)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
