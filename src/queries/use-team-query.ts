import { queryOptions, useQuery } from "@tanstack/react-query";
import { getTeamDetails } from "@/actions/team";

export function teamQueryOptions(uuid: string) {
  return queryOptions({
    queryKey: ["team", uuid],
    queryFn: () => getTeamDetails(uuid),
  });
}

export function useTeamQuery(uuid: string) {
  return useQuery(teamQueryOptions(uuid));
}
