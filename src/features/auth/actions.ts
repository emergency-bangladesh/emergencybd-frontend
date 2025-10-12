import type { User } from '@/types/user'
import type { LoginPayload } from '@/types/auth'
import { fetchBackend } from '@/lib/fetch-backend'

export async function getCurrentUser(): Promise<User> {
  const res = await fetchBackend('/auth/me', 'GET')
  const data = await res.json()
  const userData = data.data

  return {
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phone_number,
    uuid: userData.uuid,
    type: userData.account_type,
  }
}

export const login = async (payload: LoginPayload) =>
  await fetchBackend('/auth/login', 'POST', payload)

export const logout = async () => await fetchBackend('/auth/logout', 'POST')
