import { useContext } from "react";
import { LanguageProviderContext } from "./language-provider-context";
import type { LanguageProviderState } from "./language-provider";

export const useLanguage = (): LanguageProviderState => {
  const context = useContext(LanguageProviderContext);

  if (context === null)
    throw new Error("useLanguage must be used within a LanguageProvider");

  return context;
};
