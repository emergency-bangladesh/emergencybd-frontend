import { queryOptions, useQuery } from '@tanstack/react-query'
import { getTeamPlans } from '@/actions/team'

export function teamPlanQueryOptions(uuid: string) {
  return queryOptions({
    queryKey: ['team', 'plan', uuid],
    queryFn: () => getTeamPlans(uuid),
  })
}

export function useTeamPlanQuery(uuid: string) {
  return useQuery(teamPlanQueryOptions(uuid))
}
