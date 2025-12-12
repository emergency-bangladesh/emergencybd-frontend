import * as v from "valibot";

export const teamCreationFormSchema = v.object({
  teamName: v.pipe(
    v.string("Team name is required"),
    v.trim(),
    v.minLength(3, "Team name must be at least 3 characters long"),
  ),
  expirationDate: v.date("A valid date is required"),
  coLeaderEmail: v.optional(v.pipe(v.string(), v.email("Invalid email address"))),
});

export type TeamCreationFormValue = v.InferOutput<typeof teamCreationFormSchema>;
