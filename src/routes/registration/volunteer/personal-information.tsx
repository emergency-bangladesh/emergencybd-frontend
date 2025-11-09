import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type React from "react";
import {
  volunteerExistsWithEmailAddress,
  volunteerExistsWithPhoneNumber,
} from "@/actions/validate-volunteer";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormDatePicker,
  FormEmailInput,
  FormSelect,
  FormTelInput,
  FormTextInput,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import type { VolunteerRegistrationFormValue } from "@/features/volunteer-registration/form/form-schema";
import { validateFormStepPersonalInformation } from "@/features/volunteer-registration/form/form-step-validation";
import { useVolunteerRegistrationForm } from "@/features/volunteer-registration/form/use-volunteer-registration-form";
import { VolunteerRegistrationStepper } from "./-stepper";

export const Route = createFileRoute(
  "/registration/volunteer/personal-information",
)({
  component: PersonalInformationFormSection,
});

const fieldNames = [
  "name",
  "email",
  "phoneNumber",
  "bloodGroup",
  "dateOfBirth",
  "gender",
];

function PersonalInformationFormSection() {
  const volunteerRegistrationForm = useVolunteerRegistrationForm();
  const navigate = useNavigate();

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = volunteerRegistrationForm.state.values;
    const isValid = validateFormStepPersonalInformation(values);

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        volunteerRegistrationForm.setFieldMeta(
          fieldName as keyof VolunteerRegistrationFormValue,
          (prev) => ({
            ...prev,
            isTouched: true,
          }),
        );
      });

      await Promise.all(
        fieldNames.map((fieldName) =>
          volunteerRegistrationForm.validateField(
            fieldName as keyof VolunteerRegistrationFormValue,
            "submit",
          ),
        ),
      );

      return;
    }

    navigate({ to: "/registration/volunteer/location-information" });
  }

  return (
    <>
      <VolunteerRegistrationStepper currentStep={1} />
      <div className="text-center">
        <h3>Personal Information</h3>
        <p>In this page, you will be providing your personal information</p>
      </div>
      <form className="flex flex-col gap-6 w-full">
        <volunteerRegistrationForm.Field name="name">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="Full Name"
                placeholder="Your Full Name"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <div className="flex items-start justify-center gap-3 w-full">
          <volunteerRegistrationForm.Field
            name="phoneNumber"
            validators={{
              onChangeAsync: async ({ value }) => {
                const exists = await volunteerExistsWithPhoneNumber(value);
                if (exists) {
                  return { message: "This phone number already exists" };
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormTelInput
                  field={field}
                  label="Phone Number"
                  placeholder="01XXXXXXXXX"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </volunteerRegistrationForm.Field>
          <volunteerRegistrationForm.Field name="dateOfBirth">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormDatePicker field={field} label="Date of Birth" />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </volunteerRegistrationForm.Field>
        </div>
        <volunteerRegistrationForm.Field
          name="email"
          validators={{
            onChangeAsync: async ({ value }) => {
              const exists = await volunteerExistsWithEmailAddress(value);
              if (exists) {
                return "This email already exists";
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormEmailInput
                field={field}
                label="Email Address"
                placeholder="you@email.com"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <div className="flex items-start justify-center gap-3 w-full">
          <volunteerRegistrationForm.Field name="bloodGroup">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormSelect
                  field={field}
                  label="Blood Group"
                  placeholder="Select Blood Group"
                >
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </FormSelect>
                <FieldErrorInfo field={field} />
              </div>
            )}
          </volunteerRegistrationForm.Field>

          <volunteerRegistrationForm.Field name="gender">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormSelect
                  field={field}
                  label="Gender"
                  placeholder="Select Gender"
                >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="intersex">Intersex</SelectItem>
                </FormSelect>
                <FieldErrorInfo field={field} />
              </div>
            )}
          </volunteerRegistrationForm.Field>
        </div>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/registration" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
