import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function parseDateFromUtc(utcDateTimeString: string) {
  if (!utcDateTimeString) throw new Error('Invalid date string')
  const normalized = utcDateTimeString.endsWith('Z')
    ? utcDateTimeString
    : utcDateTimeString + 'Z'
  return new Date(normalized)
}
