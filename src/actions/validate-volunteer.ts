import { queryClient } from '@/integrations/tanstack-query/query-client'
import { fetchBackend } from '@/lib/fetch-backend'

async function validateVolunteerByPhoneNumberOnServer(
  phoneNumber: string,
): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/volunteer/phone-number/${phoneNumber}`,
    'GET',
  )
  const data = await response.json()
  return data.data.valid
}

async function validateVolunteerByEmailOnServer(
  email: string,
): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/volunteer/email/${email}`,
    'GET',
  )
  const data = await response.json()
  return data.data.valid
}

export function volunteerExistsWithPhoneNumber(phoneNumber: string) {
  return queryClient.fetchQuery({
    queryKey: ['validate', 'phone-number', phoneNumber],
    queryFn: () => validateVolunteerByPhoneNumberOnServer(phoneNumber),
  })
}

export function volunteerExistsWithEmailAddress(email: string) {
  return queryClient.fetchQuery({
    queryKey: ['validate', 'email', email],
    queryFn: () => validateVolunteerByEmailOnServer(email),
  })
}
