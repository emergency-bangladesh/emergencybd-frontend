import { createContext } from 'react'
import type { TeamCreationFormInstance } from './form-provider'

export const TeamCreationFormContext = createContext<
  TeamCreationFormInstance | undefined
>(undefined)
