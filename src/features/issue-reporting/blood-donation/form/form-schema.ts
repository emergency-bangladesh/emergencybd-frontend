import * as v from "valibot";
import { contactInformationSchema } from "../../shared-form-schema";

// first step
export const basicInformationSchema = v.object({
  patientName: v.pipe(
    v.string("Patient's Name must be provided"),
    v.minLength(3, "Patient's Name must be at least 3 characters long"),
  ),
  bloodGroup: v.picklist(
    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "This is a required field",
  ),
  amountInBag: v.number("This is a required field"),
  exactDateAndTime: v.date("Date and time are required"),
});

// second step
export const locationInformationSchema = v.object({
  hospitalName: v.pipe(
    v.string("Hospital name is required"),
    v.trim(),
    v.minLength(3, "Hospital name must be at least 3 characters long"),
  ),
  district: v.string("This is a required field"),
  upazila: v.string("This is a required field"),
  specialInstruction: v.optional(v.string()),
});

export const bloodDonationIssueSchema = v.object({
  ...basicInformationSchema.entries,
  ...locationInformationSchema.entries,
  ...contactInformationSchema.entries,
});

export type BloodDonationIssueFormValue = v.InferOutput<
  typeof bloodDonationIssueSchema
>;
