import { queryClient } from "@/integrations/tanstack-query/query-client";
import { fetchBackend } from "@/lib/fetch-backend";

async function validateAccountByPhoneNumberOnServer(
  phoneNumber: string,
): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/account/phone-number/${phoneNumber}`,
    "GET",
  );
  const data = await response.json();
  return data.data.valid;
}

async function validateAccountByEmailOnServer(email: string): Promise<boolean> {
  const response = await fetchBackend(
    `/validate/account/email/${email}`,
    "GET",
  );
  const data = await response.json();
  return data.data.valid;
}

export function accountExistsWithPhoneNumber(phoneNumber: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "volunteer", "phone-number", phoneNumber],
    queryFn: () => validateAccountByPhoneNumberOnServer(phoneNumber),
  });
}

export function accountExistsWithEmailAddress(email: string) {
  return queryClient.fetchQuery({
    queryKey: ["validate", "volunteer", "email", email],
    queryFn: () => validateAccountByEmailOnServer(email),
  });
}
