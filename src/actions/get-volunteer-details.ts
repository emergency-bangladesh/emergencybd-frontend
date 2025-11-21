import * as v from "valibot";
import { fetchBackend } from "@/lib/fetch-backend";
import {
  type VolunteerData,
  volunteerSchema,
} from "@/schemas/volunteer";
export { volunteerProfilePicUrl } from "@/schemas/volunteer";

export const getVolunteerDetails = async (
  uuid: string,
): Promise<VolunteerData> => {
  const res = await fetchBackend(`/volunteers/${uuid}`, "GET");
  const jsonParsed = await res.json();
  const data = jsonParsed.data;
  console.log({ volunteerData: data });
  return v.parse(volunteerSchema, data);
};
