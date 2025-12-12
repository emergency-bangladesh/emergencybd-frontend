import * as v from "valibot";
import type { BloodDonationIssueFormValue } from "./form-schema";
import {
  basicInformationSchema,
  locationInformationSchema,
} from "./form-schema";

export function validateBloodDonationBasicInformationStep(
  values: Partial<BloodDonationIssueFormValue>,
) {
  return v.safeParse(basicInformationSchema, values).success;
}
export function validateBloodDonationLocationInformationStep(
  values: Partial<BloodDonationIssueFormValue>,
) {
  return v.safeParse(locationInformationSchema, values).success;
}
