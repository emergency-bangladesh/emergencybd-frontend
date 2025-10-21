import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type React from "react";
import { useId, useMemo } from "react";
import { volunteerExistsWithPhoneNumber } from "@/actions/validate-volunteer";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormDatePicker,
  FormTelInput,
  FormTextInput,
} from "@/components/ui/form";
import type { VolunteerRegistrationFormValue } from "@/features/volunteer-registration/form/form-schema";
import { validateFormStepIDInformation } from "@/features/volunteer-registration/form/form-step-validation";
import { useVolunteerRegistrationForm } from "@/features/volunteer-registration/form/use-volunteer-registration-form";
import { VolunteerRegistrationStepper } from "./-stepper";

export const Route = createFileRoute("/registration/volunteer/brn-information")(
  {
    component: BrnInformationFormSection,
  },
);

function BrnInformationFormSection() {
  const volunteerRegistrationForm = useVolunteerRegistrationForm();
  const navigate = useNavigate();

  volunteerRegistrationForm.setFieldValue("idType", "BRN");
  volunteerRegistrationForm.setFieldValue("nidNumber", undefined);
  volunteerRegistrationForm.setFieldValue("nidImage1", undefined);
  volunteerRegistrationForm.setFieldValue("nidImage2", undefined);

  const fieldNames = useMemo(
    () => ["brnNumber", "brnDate", "parentPhoneNumber"],
    [],
  );

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = volunteerRegistrationForm.state.values;
    const isValid = validateFormStepIDInformation(values);

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

    navigate({ to: "/registration/volunteer/set-password" });
  }

  return (
    <>
      <VolunteerRegistrationStepper currentStep={4} />
      <div id={useId()} className="text-center">
        <h3>Add BRN Information</h3>
        <p>Add your birth registration number as your identity</p>
      </div>
      <form id={useId()} className="flex flex-col gap-6 w-full">
        <volunteerRegistrationForm.Field name="brnNumber">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="Birth Registration Number"
                placeholder="Your 17 digit BRN"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <volunteerRegistrationForm.Field
          name="brnDate"
          validators={{
            onChangeListenTo: ["dateOfBirth"],
            onChange: ({ value, fieldApi }) =>
              value?.getTime() !==
              fieldApi.form.getFieldValue("dateOfBirth").getTime()
                ? { message: "Unacceptable Entity" }
                : undefined,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormDatePicker
                field={field}
                label="Add Date of Birth Again (Re-validation)"
                placeholder="Format: DD MMMM, YYYY"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <volunteerRegistrationForm.Field
          name="parentPhoneNumber"
          validators={{
            onChangeAsync: async ({ value }) => {
              if (!value) return undefined;
              const exists = await volunteerExistsWithPhoneNumber(value);
              if (!exists) {
                return { message: "No accounts Found with this Phone number" };
              }
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTelInput
                field={field}
                label="Your Parent's Phone Number"
                placeholder="01XXX-XXXXXX"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </volunteerRegistrationForm.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/registration/volunteer/select-id-type" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
