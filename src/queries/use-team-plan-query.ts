import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeamPlans } from "@/features/teams/actions";

export function teamPlanQueryOptions(uuid: string) {
  return queryOptions({
    queryKey: ["team", "plan", uuid],
    queryFn: () => getTeamPlans(uuid),
  });
}

export function useTeamPlanQuery(uuid: string) {
  return useQuery(teamPlanQueryOptions(uuid));
}
