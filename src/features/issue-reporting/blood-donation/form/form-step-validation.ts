import type { BloodDonationIssueFormValue } from "./form-schema";
import {
  basicInformationSchema,
  locationInformationSchema,
} from "./form-schema";

export function validateBloodDonationBasicInformationStep(
  values: Partial<BloodDonationIssueFormValue>,
) {
  return basicInformationSchema.safeParse(values).success;
}
export function validateBloodDonationLocationInformationStep(
  values: Partial<BloodDonationIssueFormValue>,
) {
  return locationInformationSchema.safeParse(values).success;
}
