import type { VolunteerData } from "@/types/volunteer";
import { apiUrl, fetchBackend } from "@/lib/fetch-backend";
import { parseDateFromUtc } from "@/lib/utils";

export function volunteerProfilePicUrl(uuid: string) {
  return `${apiUrl}/image/volunteer/${uuid}/profile-pic`;
}

export const getVolunteerDetails = async (
  uuid: string,
): Promise<VolunteerData> => {
  const res = await fetchBackend(`/volunteers/${uuid}`, "GET");
  const jsonParsed = await res.json();
  const data = jsonParsed.data;
  console.log({ volunteerData: data });
  return {
    volunteer_uuid: data.volunteer_uuid,
    fullName: data.full_name,
    phoneNumber: data.phone_number,
    emailAddress: data.email_address,
    permanentUpazila: data.permanent_upazila,
    permanentDistrict: data.permanent_district,
    currentUpazila: data.current_upazila,
    currentDistrict: data.current_district,
    bloodGroup: data.blood_group,
    status: data.status,
    profilePictureSrc: volunteerProfilePicUrl(data.volunteer_uuid),
    issueResponses: data.issue_responses,
    teamInformation: data.current_team_information
      ? {
          teamName: data.current_team_information.team_name,
          role: data.current_team_information.role,
          teamUuid: data.current_team_information.team_uuid,
        }
      : undefined,
    createdAt: parseDateFromUtc(data.created_at),
  };
};
