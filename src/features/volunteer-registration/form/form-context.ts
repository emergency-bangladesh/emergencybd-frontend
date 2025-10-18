import { createContext } from "react";
import type { VolunteerRegistrationFormInstance } from "./form-provider";

export const VolunteerRegistrationFormContext = createContext<
  VolunteerRegistrationFormInstance | undefined
>(undefined);
