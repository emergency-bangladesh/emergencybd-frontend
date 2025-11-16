import z from "zod";

export const contactInformationSchema = z.object({
  fullName: z
    .string("This is a required field")
    .trim()
    .min(3, "Name must be at least 3 characters long"),
  emailAddress: z.email("Must be a valid email").trim(),
  phoneNumber: z
    .string("This is a required field")
    .trim()
    .regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladeshi phone number"),
  emergencyContactNumber: z
    .string("This is a required field")
    .trim()
    .regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladeshi phone number"),
  acceptTerms: z.boolean(),
});
