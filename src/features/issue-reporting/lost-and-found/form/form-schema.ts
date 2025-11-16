import { z } from "zod";
import { contactInformationSchema } from "../../shared-form-schema";

// Step 1: Detailed Information
export const detailedInformationSchema = z.object({
  personsName: z
    .string("This is a required field")
    .min(3, "Name must be at least 3 characters long"),
  age: z.number("This is a required field"),
  dateTimeLost: z.date("This is a required field"),
  details: z
    .string("This is a required field")
    .min(10, "Please provide at least 10 characters of details")
    .max(10000, "Details cannot exceed 10,000 characters"),
});

// Step 2: Location Information
export const locationInformationSchema = z.object({
  lastSeenLocation: z
    .string("This is a required field")
    .min(1, "Last seen location is required")
    .max(200, "Location cannot exceed 200 characters"),
  district: z.string("District is required").min(1, "District is required"),
  upazila: z
    .string("This is a required field")
    .min(1, "This is a required field"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  occupation: z
    .string()
    .max(100, "Occupation cannot exceed 100 characters")
    .optional(),
});

// Step 3: Picture Information
export const pictureInformationSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File, { error: "Upload a image file" })
        .refine((file) => file.type.startsWith("image/"), {
          message: "Invalid image file",
        }),
    )
    .min(1, "Minimum 1 image is needed")
    .max(3, "Maximum 3 images allowed"),
});

// Combined Schema
export const lostAndFoundSchema = detailedInformationSchema
  .and(locationInformationSchema)
  .and(pictureInformationSchema)
  .and(contactInformationSchema);

export type LostAndFoundFormValue = z.infer<typeof lostAndFoundSchema>;
