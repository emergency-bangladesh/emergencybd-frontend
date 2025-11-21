import * as v from "valibot";
import type { LostAndFoundFormValue } from "./form-schema";
import {
  detailedInformationSchema,
  locationInformationSchema,
  pictureInformationSchema,
} from "./form-schema";

export function validateLostAndFoundBasicInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return v.safeParse(detailedInformationSchema, values).success;
}

export function validateLostAndFoundLocationInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return v.safeParse(locationInformationSchema, values).success;
}

export function validateLostAndFoundPictureInformationStep(
  values: Partial<LostAndFoundFormValue>,
): boolean {
  return v.safeParse(pictureInformationSchema, values).success;
}
