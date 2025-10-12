import type { TeamCreationFormValue } from '../form/form-schema'
import { fetchBackend } from '@/lib/fetch-backend'

type TeamCreatePayload = {
  name: string
  expiration_date: Date
  co_leader_uuid?: string
}

async function createTeamOnServer(payload: TeamCreatePayload) {
  return await fetchBackend('/teams/new', 'POST', payload)
}

export async function createTeam(value: TeamCreationFormValue) {
  const payload: TeamCreatePayload = {
    name: value.teamName,
    expiration_date: value.expirationDate,
  }

  if (value.coLeaderEmail) {
    const res = await fetchBackend(`/volunteers/${value.coLeaderEmail}`, 'GET')
    const data = await res.json()
    payload.co_leader_uuid = data.data.volunteer_uuid
  }

  return await createTeamOnServer(payload)
}
