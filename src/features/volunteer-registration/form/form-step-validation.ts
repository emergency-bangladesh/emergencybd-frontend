import {
  IDInformationSchema,
  locationInformationSchema,
  passwordSchema,
  personalInformationSchema,
  profilePictureSchema,
  volunteerRegistrationFormSchema,
} from './form-schema'
import type { VolunteerRegistrationFormValue } from './form-schema'

export const validateFormStepPersonalInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => personalInformationSchema.safeParse(data).success

export const validateFormStepLocationInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => locationInformationSchema.safeParse(data).success

export const validateFormStepIDInformation = (
  data: Partial<VolunteerRegistrationFormValue>,
) => IDInformationSchema.safeParse(data).success

export const validateFormStepPassword = (
  data: Partial<VolunteerRegistrationFormValue>,
) => passwordSchema.safeParse(data).success

export const validateFormStepProfilePicture = (
  data: Partial<VolunteerRegistrationFormValue>,
) => profilePictureSchema.safeParse(data).success

export const validateFormStepVolunteerRegistration = (
  data: Partial<VolunteerRegistrationFormValue>,
) => volunteerRegistrationFormSchema.safeParse(data).success
