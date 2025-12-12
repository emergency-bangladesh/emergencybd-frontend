import * as v from "valibot";
import { queryClient } from "@/integrations/tanstack-query/query-client";
import { fetchBackend } from "@/lib/fetch-backend";
import {
  type TeamData,
  type TeamPlanData,
  teamPlanSchema,
  teamSchema,
} from "./schemas"; // changed import path

export async function getTeamDetails(uuid: string): Promise<TeamData> {
  const res = await fetchBackend(`/teams/${uuid}`, "GET");
  const json = await res.json();
  const data = json.data;
  return v.parse(teamSchema, data);
}

export async function getTeamPlans(uuid: string): Promise<Array<TeamPlanData>> {
  const res = await fetchBackend(`/teams/${uuid}/plans/`, "GET");
  const data = await res.json();
  return v.parse(v.array(teamPlanSchema), data.data);
}

// From validate-team.ts
async function validateTeamByNameOnServer(name: string): Promise<boolean> {
  const response = await fetchBackend(`/validate/team/name/${name}`, "GET");
  const data = await response.json();
  return data.data.valid;
}

export function teamExistsWithName(name: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "team", "name", name],
    queryFn: () => validateTeamByNameOnServer(name),
  });
}
