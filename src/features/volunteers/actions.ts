import * as v from "valibot";
import { queryClient } from "@/integrations/tanstack-query/query-client";
import { fetchBackend } from "@/lib/fetch-backend";
import { type VolunteerData, volunteerSchema } from "./schemas"; // Changed import path

export { volunteerProfilePicUrl } from "./schemas"; // Changed import path

export const getVolunteerDetails = async (
  uuid: string,
): Promise<VolunteerData> => {
  const res = await fetchBackend(`/volunteers/${uuid}`, "GET");
  const jsonParsed = await res.json();
  const data = jsonParsed.data;
  console.log({ volunteerData: data });
  return v.parse(volunteerSchema, data);
};

// From validate-volunteer.ts

async function validateVolunteerByPhoneNumberOnServer(
  phoneNumber: string,
): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/volunteer/phone-number/${phoneNumber}`,
    "GET",
  );
  const data = await response.json();
  return data.data.valid;
}

async function validateVolunteerByEmailOnServer(
  email: string,
): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/volunteer/email/${email}`,
    "GET",
  );
  const data = await response.json();
  return data.data.valid;
}

export function volunteerExistsWithPhoneNumber(phoneNumber: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "phone-number", phoneNumber],
    queryFn: () => validateVolunteerByPhoneNumberOnServer(phoneNumber),
  });
}

export function volunteerExistsWithEmailAddress(email: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "email", email],
    queryFn: () => validateVolunteerByEmailOnServer(email),
  });
}
