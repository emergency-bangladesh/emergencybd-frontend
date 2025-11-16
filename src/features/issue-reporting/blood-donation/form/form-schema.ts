import z from "zod";
import { contactInformationSchema } from "../../shared-form-schema";

// first step
export const basicInformationSchema = z.object({
  patientName: z
    .string("Patient's Name must be provided")
    .min(3, "Patient's Name must be at least 3 characters long"),
  bloodGroup: z.enum(
    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    "This is a required field",
  ),
  amountInBag: z.number("This is a required field"),
  exactDateAndTime: z.date("Date and time are required"),
});

// second step
export const locationInformationSchema = z.object({
  hospitalName: z
    .string("Hospital name is required")
    .trim()
    .min(3, "Hospital name must be at least 3 characters long"),
  district: z.string("This is a required field"),
  upazila: z.string("This is a required field"),
  specialInstruction: z.string().optional(),
});

export const bloodDonationIssueSchema = basicInformationSchema
  .and(locationInformationSchema)
  .and(contactInformationSchema);

export type BloodDonationIssueFormValue = z.infer<
  typeof bloodDonationIssueSchema
>;
