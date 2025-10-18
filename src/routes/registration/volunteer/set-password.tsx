import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useMemo } from "react";
import { VolunteerRegistrationStepper } from "./-stepper";
import type { VolunteerRegistrationFormValue } from "@/features/volunteer-registration/form/form-schema";
import { useVolunteerRegistrationForm } from "@/features/volunteer-registration/form/use-volunteer-registration-form";
import {
  FieldErrorInfo,
  FormPasswordInput,
  FormPasswordInputWithValidationFeedback,
} from "@/components/ui/form";
import { validateFormStepPassword } from "@/features/volunteer-registration/form/form-step-validation";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";

export const Route = createFileRoute("/registration/volunteer/set-password")({
  component: SetPasswordFormSection,
});

function SetPasswordFormSection() {
  const volunteerRegistrationForm = useVolunteerRegistrationForm();
  const navigate = useNavigate();

  const fieldNames = useMemo(() => ["password", "confirmPassword"], []);

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = volunteerRegistrationForm.state.values;
    const isValid = validateFormStepPassword(values);

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

    navigate({ to: "/registration/volunteer/upload-profile-picture" });
  }

  return (
    <>
      <VolunteerRegistrationStepper currentStep={5} />
      <div id="title" className="text-center">
        <h3>Set Your Password</h3>
        <p>Create a strong password for your account</p>
      </div>
      <form id="form-fields" className="flex flex-col gap-6 w-full">
        <volunteerRegistrationForm.Field name="password">
          {(field) => (
            <>
              <FormPasswordInputWithValidationFeedback
                field={field}
                id={field.name}
                label="Password"
                placeholder="Password"
              />
              <FieldErrorInfo field={field} />
            </>
          )}
        </volunteerRegistrationForm.Field>

        <volunteerRegistrationForm.Field name="confirmPassword">
          {(field) => (
            <>
              <FormPasswordInput
                field={field}
                id={field.name}
                label="Confirm Password"
                placeholder="Confirm Password"
              />
              <FieldErrorInfo field={field} />
            </>
          )}
        </volunteerRegistrationForm.Field>

        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton
            {...(volunteerRegistrationForm.state.values.idType === "NID"
              ? { to: "/registration/volunteer/nid-information" }
              : { to: "/registration/volunteer/brn-information" })}
          />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
