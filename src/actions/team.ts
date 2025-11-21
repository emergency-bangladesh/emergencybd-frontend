import * as v from "valibot";
import { fetchBackend } from "@/lib/fetch-backend";
import {
  type TeamData,
  type TeamPlanData,
  teamPlanSchema,
  teamSchema,
} from "@/schemas/team";

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
