import * as v from "valibot";
import { contactInformationSchema } from "../../shared-form-schema";

// Step 1: Detailed Information
export const detailedInformationSchema = v.object({
  personsName: v.pipe(
    v.string("This is a required field"),
    v.minLength(3, "Name must be at least 3 characters long"),
  ),
  age: v.number("This is a required field"),
  dateTimeLost: v.date("This is a required field"),
  details: v.pipe(
    v.string("This is a required field"),
    v.minLength(10, "Please provide at least 10 characters of details"),
    v.maxLength(10000, "Details cannot exceed 10,000 characters"),
  ),
});

// Step 2: Location Information
export const locationInformationSchema = v.object({
  lastSeenLocation: v.pipe(
    v.string("This is a required field"),
    v.minLength(1, "Last seen location is required"),
    v.maxLength(200, "Location cannot exceed 200 characters"),
  ),
  district: v.pipe(
    v.string("District is required"),
    v.minLength(1, "District is required"),
  ),
  upazila: v.pipe(
    v.string("This is a required field"),
    v.minLength(1, "This is a required field"),
  ),
  bloodGroup: v.optional(
    v.picklist(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  ),
  occupation: v.optional(
    v.pipe(v.string(), v.maxLength(100, "Occupation cannot exceed 100 characters")),
  ),
});

// Step 3: Picture Information
export const pictureInformationSchema = v.object({
  images: v.pipe(
    v.array(
      v.pipe(
        v.instance(File, "Upload a image file"),
        v.check((file) => file.type.startsWith("image/"), "Invalid image file"),
      ),
    ),
    v.minLength(1, "Minimum 1 image is needed"),
    v.maxLength(3, "Maximum 3 images allowed"),
  ),
});

// Combined Schema
export const lostAndFoundSchema = v.object({
  ...detailedInformationSchema.entries,
  ...locationInformationSchema.entries,
  ...pictureInformationSchema.entries,
  ...contactInformationSchema.entries,
});

export type LostAndFoundFormValue = v.InferOutput<typeof lostAndFoundSchema>;
