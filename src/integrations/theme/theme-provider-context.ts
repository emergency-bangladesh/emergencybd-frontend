import { createContext } from 'react'
import type { ThemeProviderState } from './theme-provider'

export const ThemeProviderContext = createContext<ThemeProviderState | null>(
  null,
)
