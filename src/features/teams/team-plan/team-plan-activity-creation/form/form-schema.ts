import * as v from "valibot";

export const addTeamPlanActivityFormSchema = v.object({
  exactLocation: v.string(),
  details: v.string(),
  effectiveDate: v.date(),
});

export type AddTeamPlanActivityFormSchema = v.InferOutput<
  typeof addTeamPlanActivityFormSchema
>;
