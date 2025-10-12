import { useContext } from 'react'
import { BloodDonationIssueFormContext } from './form-context'
import type { BloodDonationIssueFormInstance } from './form-provider'

export function useBloodDonationIssueForm(): BloodDonationIssueFormInstance {
  const context = useContext(BloodDonationIssueFormContext)
  if (!context)
    throw new Error(
      'useBloodDonationIssueForm must be used within a BloodDonationIssueFormProvider',
    )
  return context
}
