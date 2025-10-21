import type { LostAndFoundFormValue } from "./form-schema";
import {
  detailedInformationSchema,
  locationInformationSchema,
  pictureInformationSchema,
} from "./form-schema";

export function validateLostAndFoundBasicInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return detailedInformationSchema.safeParse(values).success;
}

export function validateLostAndFoundLocationInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return locationInformationSchema.safeParse(values).success;
}

export function validateLostAndFoundPictureInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return pictureInformationSchema.safeParse(values).success;
}
