import * as v from "valibot";
import type { VolunteerRegistrationFormValue } from "./form-schema";
import {
  IDInformationSchema,
  locationInformationSchema,
  passwordSchema,
  personalInformationSchema,
  profilePictureSchema,
  volunteerRegistrationFormSchema,
} from "./form-schema";

export const validateFormStepPersonalInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(personalInformationSchema, data).success;

export const validateFormStepLocationInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(locationInformationSchema, data).success;

export const validateFormStepIDInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(IDInformationSchema, data).success;

export const validateFormStepPassword = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(passwordSchema, data).success;

export const validateFormStepProfilePicture = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(profilePictureSchema, data).success;

export const validateFormStepVolunteerRegistration = (
  data: Partial<VolunteerRegistrationFormValue>,
) => v.safeParse(volunteerRegistrationFormSchema, data).success;
