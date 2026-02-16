import * as v from "valibot";

export const addTeamPlanFormSchema = v.object({
  planTitle: v.string(),
  startDate: v.date(),
  endDate: v.date(),
  targetDistrict: v.string(),
  targetUpazila: v.string(),
  description: v.string(),
});

export type AddTeamPlanFormSchema = v.InferOutput<typeof addTeamPlanFormSchema>;
