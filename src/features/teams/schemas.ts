import * as v from "valibot";
import { parseDateFromUtc } from "@/lib/utils";

export const teamSchema = v.pipe(
  v.object({
    uuid: v.string(),
    name: v.string(),
    expiration_date: v.string(),
    leader_uuid: v.string(),
    co_leader_uuid: v.nullable(v.string()),
    members_count: v.number(),
    created_at: v.string(),
    last_updated: v.string(),
  }),
  v.transform((input) => ({
    uuid: input.uuid,
    name: input.name,
    expirationDate: parseDateFromUtc(input.expiration_date),
    leaderUuid: input.leader_uuid,
    coLeaderUuid: input.co_leader_uuid,
    membersCount: input.members_count,
    createdAt: parseDateFromUtc(input.created_at),
    lastUpdated: parseDateFromUtc(input.last_updated),
  })),
);

export type TeamData = v.InferOutput<typeof teamSchema>;

export const teamPlanSchema = v.pipe(
  v.object({
    plan_uuid: v.string(),
    title: v.string(),
    description: v.string(),
    team_uuid: v.string(),
    working_district: v.string(),
    working_upazila: v.string(),
    start_date: v.string(),
    end_date: v.string(),
    created_at: v.string(),
    last_updated: v.string(),
  }),
  v.transform((input) => ({
    planUuid: input.plan_uuid,
    title: input.title,
    description: input.description,
    teamUuid: input.team_uuid,
    workingDistrict: input.working_district,
    workingUpazila: input.working_upazila,
    startDate: parseDateFromUtc(input.start_date),
    endDate: parseDateFromUtc(input.end_date),
    createdAt: parseDateFromUtc(input.created_at),
    lastUpdated: parseDateFromUtc(input.last_updated),
  })),
);

export type TeamPlanData = v.InferOutput<typeof teamPlanSchema>;
