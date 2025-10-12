import { useState } from 'react'
import { LanguageProviderContext } from './language-provider-context'

export type Language = 'en' | 'bn'

export type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
}

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({
  children,
  defaultLanguage = 'en',

  ...props
}: LanguageProviderProps) {
  const storageKey = 'emr-language'

  const [language, setLanguage] = useState<Language>(() => {
    const storedLanguage = localStorage.getItem(storageKey)
    if (storedLanguage && ['en', 'bn'].includes(storedLanguage)) {
      return storedLanguage as Language
    }
    return defaultLanguage
  })

  const value: LanguageProviderState = {
    language,
    setLanguage: (newLanguage: Language) => {
      localStorage.setItem(storageKey, newLanguage)
      setLanguage(newLanguage)
    },
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}
