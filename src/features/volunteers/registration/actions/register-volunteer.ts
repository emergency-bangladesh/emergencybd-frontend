import * as v from "valibot";
import type { CreateVolunteerPayload } from "@/features/volunteers/schemas";
import { createVolunteerSchema } from "@/features/volunteers/schemas";
import {
  compressNidImage,
  compressProfileImage,
} from "@/integrations/image-compression/image-compressor";
import { fetchBackend } from "@/lib/fetch-backend";

interface ServerResponseOnVolunteerCreate {
  volunteer_uuid: string;
  status: string;
}

export const createVolunteerOnServer = async (
  payload: CreateVolunteerPayload,
): Promise<ServerResponseOnVolunteerCreate> => {
  const safePayload = v.parse(createVolunteerSchema, payload);
  console.log({ payload: safePayload });
  const response = await fetchBackend("/volunteers/new", "POST", safePayload);
  const data = await response.json();
  return data.data;
};

export async function uploadNidImages(
  volunteer_uuid: string,
  nidImage1: File,
  nidImage2: File,
) {
  const compressedNid1 = await compressNidImage(nidImage1);
  const compressedNid2 = await compressNidImage(nidImage2);

  const formData = new FormData();
  formData.append("volunteer_uuid", volunteer_uuid);
  formData.append("nid_first_img", compressedNid1);
  formData.append("nid_second_img", compressedNid2);

  const response = await fetchBackend(
    "/file-upload/volunteer/nid",
    "POST",
    formData,
    "multipart/form-data",
  );
  const data = await response.json();
  return data.data;
}

export async function uploadProfilePic(
  volunteer_uuid: string,
  profilePic: File,
) {
  const compressedProfilePic = await compressProfileImage(profilePic);

  const formData = new FormData();
  formData.append("volunteer_uuid", volunteer_uuid);
  formData.append("profile_pic", compressedProfilePic);

  const response = await fetchBackend(
    "/file-upload/volunteer/profile-pic",
    "POST",
    formData,
    "multipart/form-data",
  );
  const data = await response.json();
  return data.data;
}
