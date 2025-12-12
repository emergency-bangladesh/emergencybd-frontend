import * as v from "valibot";

export const loginSchema = v.object({
  email: v.string(),
  password: v.string(),
});

export type LoginPayload = v.InferOutput<typeof loginSchema>;
