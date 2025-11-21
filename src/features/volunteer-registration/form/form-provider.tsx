import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { parseResult } from "@/lib/result";
import {
  createVolunteerOnServer,
  uploadNidImages,
  uploadProfilePic,
} from "../actions/register-volunteer";
import { VolunteerRegistrationFormContext } from "./form-context";
import type { VolunteerRegistrationFormValue } from "./form-schema";
import { volunteerRegistrationFormSchema } from "./form-schema";

function useInitVolunteerRegistrationForm() {
  const navigate = useNavigate();
  const defaultValues: VolunteerRegistrationFormValue = {
    name: "",
    email: "",
    phoneNumber: "",
    bloodGroup: undefined!,
    dateOfBirth: undefined!,
    gender: undefined!,

    permanentDistrict: "",
    permanentUpazila: "",
    currentSameAsPermanent: false,
    currentDistrict: "",
    currentUpazila: "",

    idType: undefined!,
    nidNumber: undefined,
    nidImage1: undefined,
    nidImage2: undefined,
    brnNumber: undefined,
    brnDate: undefined,
    parentPhoneNumber: undefined,

    password: "",
    confirmPassword: "",

    profilePicture: undefined!,
    agreeTerms: false,
  };
  const form = useForm({
    defaultValues,
    validators: {
      onChange: volunteerRegistrationFormSchema,
      onChangeAsyncDebounceMs: 500,
    },
    onSubmit: async ({ value, formApi }) => {
      const [data, error] = await parseResult(() =>
        createVolunteerOnServer({
          full_name: value.name,
          phone_number: value.phoneNumber,
          email_address: value.email,
          permanent_upazila: value.permanentUpazila,
          permanent_district: value.permanentDistrict,
          current_upazila: value.currentSameAsPermanent
            ? value.permanentUpazila
            : value.currentUpazila!,
          current_district: value.currentSameAsPermanent
            ? value.permanentDistrict
            : value.currentDistrict!,
          blood_group: value.bloodGroup,
          identifier_type: value.idType === "NID" ? "nid" : "brn",
          identifier_value: (value.nidNumber || value.brnNumber)!,
          birth_date: value.dateOfBirth.toISOString(),
          password: value.password,
          gender: value.gender,
        }),
      );

      if (error) {
        toast.error("Failed to create volunteer account", {
          description: error.message,
        });
        return;
      }

      if (value.idType === "NID") {
        const [_, nidError] = await parseResult(() =>
          uploadNidImages(
            data.volunteer_uuid,
            value.nidImage1!,
            value.nidImage2!,
          ),
        );

        if (nidError) {
          toast.error("Failed to upload NID images", {
            description: nidError.message,
          });
          // It's now the admin's responsibility to mark as missing media and send the re-upload link.
        }
      }

      const [__, profilePicError] = await parseResult(() =>
        uploadProfilePic(data.volunteer_uuid, value.profilePicture),
      );

      if (profilePicError) {
        toast.error("Failed to upload profile picture", {
          description: profilePicError.message,
        });
      }

      toast.success("Sent application to backend", {
        description:
          "Wait until an admin validates your application and approves you",
      });
      formApi.reset();
      navigate({ to: "/registration/success", replace: true });
    },
  });
  return form;
}

export type VolunteerRegistrationFormInstance = ReturnType<
  typeof useInitVolunteerRegistrationForm
>;

export const VolunteerRegistrationFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useInitVolunteerRegistrationForm();
  return (
    <VolunteerRegistrationFormContext.Provider value={form}>
      {children}
    </VolunteerRegistrationFormContext.Provider>
  );
};
