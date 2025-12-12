import * as v from "valibot";

export const userSchema = v.pipe(
  v.object({
    name: v.string(),
    uuid: v.string(),
    account_type: v.picklist(["general_user", "volunteer"]),
    email: v.string(),
    phone_number: v.string(),
  }),
  v.transform((input) => ({
    name: input.name,
    uuid: input.uuid,
    type: input.account_type,
    email: input.email,
    phoneNumber: input.phone_number,
  })),
);

export type User = v.InferOutput<typeof userSchema>;
