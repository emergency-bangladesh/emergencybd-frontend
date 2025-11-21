import * as v from "valibot";

export const contactInformationSchema = v.object({
  fullName: v.pipe(
    v.string("This is a required field"),
    v.trim(),
    v.minLength(3, "Name must be at least 3 characters long"),
  ),
  emailAddress: v.pipe(
    v.string("This is a required field"),
    v.trim(),
    v.email("Must be a valid email"),
  ),
  phoneNumber: v.pipe(
    v.string("This is a required field"),
    v.trim(),
    v.regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladeshi phone number"),
  ),
  emergencyContactNumber: v.pipe(
    v.string("This is a required field"),
    v.trim(),
    v.regex(/^01[3-9]\d{2}-?\d{6}$/, "Invalid Bangladeshi phone number"),
  ),
  acceptTerms: v.boolean(),
});
