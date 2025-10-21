import { fetchBackend } from "@/lib/fetch-backend";
import type { BloodDonationIssueFormValue } from "../form/form-schema";

type BloodDonationIssueCreatePayload = {
  full_name: string;
  emergency_phone_number: string;
  patient_name: string;
  blood_group: string;
  amount_bag: number;
  hospital_name: string;
  district: string;
  upazila: string;
  instructions: string | undefined;
  phone_number: string;
  email_address: string;
};

async function createBloodDonationIssueOnServer(
  payload: BloodDonationIssueCreatePayload,
): Promise<{ issue_uuid: string }> {
  const response = await fetchBackend(
    "/issues/blood_donation/new",
    "POST",
    payload,
  );
  const data = await response.json();
  return data.data;
}

export async function reportBloodDonationIssue(
  value: BloodDonationIssueFormValue,
) {
  const payload: BloodDonationIssueCreatePayload = {
    full_name: value.fullName,
    emergency_phone_number: value.emergencyContactNumber,
    patient_name: value.patientName,
    blood_group: value.bloodGroup,
    amount_bag: value.amountInBag,
    hospital_name: value.hospitalName,
    district: value.district,
    upazila: value.upazila,
    instructions: value.specialInstruction,
    phone_number: value.phoneNumber,
    email_address: value.emailAddress,
  };

  return await createBloodDonationIssueOnServer(payload);
}
