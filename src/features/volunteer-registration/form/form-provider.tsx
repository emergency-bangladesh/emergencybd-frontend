import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { registerVolunteer } from "../actions/register-volunteer";
import { volunteerRegistrationFormSchema } from "./form-schema";
import { VolunteerRegistrationFormContext } from "./form-context";
import type { VolunteerRegistrationFormValue } from "./form-schema";

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
    onSubmit: async ({ value }) => {
      const state = await registerVolunteer(value);
      if (!state.success) {
        toast.error("Something went wrong", {
          description: state.errorMessage,
        });
      } else {
        toast.success("Sent application to backend", {
          description:
            "Wait until an admin validates your application and approves you",
        });
        navigate({ to: "/registration/success", replace: true });
      }
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
