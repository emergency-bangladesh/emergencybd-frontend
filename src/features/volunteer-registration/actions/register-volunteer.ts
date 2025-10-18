import type { VolunteerRegistrationFormValue } from "../form/form-schema";
import {
  compressNidImage,
  compressProfileImage,
} from "@/integrations/image-compression/image-compressor";
import { fetchBackend } from "@/lib/fetch-backend";

interface CreateVolunteerPayload {
  full_name: string;
  phone_number: string;
  email_address: string;
  permanent_upazila: string;
  permanent_district: string;
  current_upazila: string;
  current_district: string;
  blood_group: string;
  identifier_type: "nid" | "brn";
  identifier_value: string;
  birth_date: string; // as '2019-08-24T14:15:22Z'
  password: string;
  gender: "male" | "female" | "intersex";
}

interface ServerResponseOnVolunteerCreate {
  volunteer_uuid: string;
  status: string;
}

const _createVolunteerOnServer = async (
  values: VolunteerRegistrationFormValue,
): Promise<ServerResponseOnVolunteerCreate> => {
  const payload: CreateVolunteerPayload = {
    full_name: values.name,
    phone_number: values.phoneNumber,
    email_address: values.email,
    permanent_upazila: values.permanentUpazila,
    permanent_district: values.permanentDistrict,
    current_upazila: values.currentSameAsPermanent
      ? values.permanentUpazila
      : values.currentUpazila!,
    current_district: values.currentSameAsPermanent
      ? values.permanentDistrict
      : values.currentDistrict!,
    blood_group: values.bloodGroup,
    identifier_type: values.idType === "NID" ? "nid" : "brn",
    identifier_value: (values.nidNumber || values.brnNumber)!,
    birth_date: values.dateOfBirth.toISOString(),
    password: values.password,
    gender: values.gender,
  };
  console.log({ payload });
  const response = await fetchBackend("/volunteers/new", "POST", payload);
  const data = await response.json();
  return data.data;
};

export async function _uploadNidImages(
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

type RegistrationState =
  | { success: true; data: ServerResponseOnVolunteerCreate }
  | { success: false; errorMessage: string };

export async function registerVolunteer(
  values: VolunteerRegistrationFormValue,
): Promise<RegistrationState> {
  // step 1:
  // request to sever for the volunteer account to be created.
  try {
    const data = await _createVolunteerOnServer(values);
    // step 2:
    // try to upload nid
    try {
      if (values.idType === "NID") {
        await _uploadNidImages(
          data.volunteer_uuid,
          values.nidImage1!,
          values.nidImage2!,
        );
        // Step 3:
        // try to upload profile picture
        try {
          await uploadProfilePic(data.volunteer_uuid, values.profilePicture);
        } catch (e) {
          return { success: false, errorMessage: (e as Error).message };
        }
      }
    } catch (e) {
      return { success: false, errorMessage: (e as Error).message };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, errorMessage: (e as Error).message };
  }
}
