import z from "zod";

export const contactInformationSchema = z.object({
  fullName: z
    .string("Name is required")
    .trim()
    .min(3, "Name must be at least 3 characters long"),
  emailAddress: z
    .string("Email must be provided")
    .trim()
    .min(6, "Email must be at least 3 characters long"),
  phoneNumber: z
    .string("Phone number is required")
    .trim()
    .regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladesh phone number"),
  emergencyContactNumber: z
    .string("Emergency Contact Number is required")
    .trim()
    .regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladesh phone number"),
  acceptTerms: z.boolean(),
});
