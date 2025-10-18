import { useContext } from "react";
import { VolunteerRegistrationFormContext } from "./form-context";
import type { VolunteerRegistrationFormInstance } from "./form-provider";

export function useVolunteerRegistrationForm(): VolunteerRegistrationFormInstance {
  const context = useContext(VolunteerRegistrationFormContext);
  if (!context) {
    throw new Error(
      "useVolunteerRegistrationForm must be used within a VolunteerRegistrationFormProvider",
    );
  }
  return context;
}
