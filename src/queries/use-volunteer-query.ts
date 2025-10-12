import { queryOptions, useQuery } from '@tanstack/react-query'
import { getVolunteerDetails } from '@/actions/volunteer'

export function volunteerQueryOptions(uuid: string) {
  return queryOptions({
    queryKey: ['volunteer', uuid],
    queryFn: () => getVolunteerDetails(uuid),
  })
}

export const useVolunteerQuery = (uuid: string) =>
  useQuery(volunteerQueryOptions(uuid))
