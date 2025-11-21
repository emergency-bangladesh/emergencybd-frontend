import * as v from "valibot";
import { apiUrl } from "@/lib/fetch-backend";
import { parseDateFromUtc } from "@/lib/utils";

export function volunteerProfilePicUrl(uuid: string) {
  return `${apiUrl}/image/volunteer/${uuid}/profile-pic`;
}

export const volunteerSchema = v.pipe(
  v.object({
    volunteer_uuid: v.string(),
    full_name: v.string(),
    phone_number: v.string(),
    email_address: v.string(),
    permanent_upazila: v.string(),
    permanent_district: v.string(),
    current_upazila: v.string(),
    current_district: v.string(),
    blood_group: v.string(),
    status: v.picklist(["pending", "verified"]),
    issue_responses: v.number(),
    created_at: v.string(),
    current_team_information: v.optional(
      v.nullable(
        v.object({
          team_name: v.string(),
          role: v.string(),
          team_uuid: v.string(),
        }),
      ),
    ),
  }),
  v.transform((input) => ({
    volunteerUuid: input.volunteer_uuid,
    fullName: input.full_name,
    phoneNumber: input.phone_number,
    emailAddress: input.email_address,
    permanentUpazila: input.permanent_upazila,
    permanentDistrict: input.permanent_district,
    currentUpazila: input.current_upazila,
    currentDistrict: input.current_district,
    bloodGroup: input.blood_group,
    status: input.status,
    profilePictureSrc: volunteerProfilePicUrl(input.volunteer_uuid),
    issueResponses: input.issue_responses,
    teamInformation: input.current_team_information
      ? {
          teamName: input.current_team_information.team_name,
          role: input.current_team_information.role,
          teamUuid: input.current_team_information.team_uuid,
        }
      : undefined,
    createdAt: parseDateFromUtc(input.created_at),
  })),
);

export type VolunteerData = v.InferOutput<typeof volunteerSchema>;

export const createVolunteerSchema = v.object({
  full_name: v.string(),
  phone_number: v.string(),
  email_address: v.string(),
  permanent_upazila: v.string(),
  permanent_district: v.string(),
  current_upazila: v.string(),
  current_district: v.string(),
  blood_group: v.string(),
  identifier_type: v.picklist(["nid", "brn"]),
  identifier_value: v.string(),
  birth_date: v.string(),
  password: v.string(),
  gender: v.picklist(["male", "female", "intersex"]),
});

export type CreateVolunteerPayload = v.InferOutput<typeof createVolunteerSchema>;
