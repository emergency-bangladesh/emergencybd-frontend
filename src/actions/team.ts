import { fetchBackend } from "@/lib/fetch-backend";
import { parseDateFromUtc } from "@/lib/utils";
import type { TeamData, TeamPlanData } from "@/types/team";

export async function getTeamDetails(uuid: string): Promise<TeamData> {
  const res = await fetchBackend(`/teams/${uuid}`, "GET");
  const json = await res.json();
  const data = json.data;
  return {
    uuid: data.uuid,
    name: data.name,
    expirationDate: parseDateFromUtc(data.expiration_date),
    leaderUuid: data.leader_uuid,
    coLeaderUuid: data.co_leader_uuid,
    createdAt: parseDateFromUtc(data.created_at),
    lastUpdated: parseDateFromUtc(data.last_updated),
    membersCount: data.members_count,
  };
}

type TeamPlanServerData = {
  plan_uuid: string;
  title: string;
  description: string;
  team_uuid: string;
  working_district: string;
  working_upazila: string;
  start_date: string;
  end_date: string;
  created_at: string;
  last_updated: string;
};

export async function getTeamPlans(uuid: string): Promise<Array<TeamPlanData>> {
  const rest = await fetchBackend(`/teams/${uuid}/plans/`, "GET");
  const teamPlanData = (await rest.json()) as Array<TeamPlanServerData>;
  return teamPlanData.map((data) => ({
    planUuid: data.plan_uuid,
    title: data.title,
    description: data.description,
    teamUuid: data.team_uuid,
    workingDistrict: data.working_district,
    workingUpazila: data.working_upazila,
    startDate: parseDateFromUtc(data.start_date),
    endDate: parseDateFromUtc(data.end_date),
    createdAt: parseDateFromUtc(data.created_at),
    lastUpdated: parseDateFromUtc(data.last_updated),
  }));
}
