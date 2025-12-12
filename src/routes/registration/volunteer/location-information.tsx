import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { useCallback, useMemo } from "react";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormCheckbox,
  FormComboBox,
} from "@/components/ui/form";
import { DISTRICT_WITH_UPAZILA_OR_THANA } from "@/constants";
import type { VolunteerRegistrationFormValue } from "@/features/volunteers/registration/form/form-schema";
import { validateFormStepLocationInformation } from "@/features/volunteers/registration/form/form-step-validation";
import { useVolunteerRegistrationForm } from "@/features/volunteers/registration/form/use-volunteer-registration-form";
import { VolunteerRegistrationStepper } from "./-stepper";

export const Route = createFileRoute(
  "/registration/volunteer/location-information",
)({
  component: LocationInformationFormSection,
});

function LocationInformationFormSection() {
  const form = useVolunteerRegistrationForm();
  const navigate = useNavigate();

  const districtOptions = useMemo(
    () =>
      DISTRICT_WITH_UPAZILA_OR_THANA.map((district) => ({
        value: district.name,
        label: district.name,
      })),
    [],
  );

  const getAllUpazilaOrThana = useCallback((district: string | undefined) => {
    if (!district) return [];

    const districtData = DISTRICT_WITH_UPAZILA_OR_THANA.find(
      (d) => d.name === district,
    );
    if (!districtData) return [];

    return districtData.allUpazilaOrThana.map((u) => ({ value: u, label: u }));
  }, []);

  const fieldNames = useMemo(
    () => [
      "permanentDistrict",
      "permanentupazila",
      "currentSameAsPermanent",
      "currentDistrict",
      "currentupazila",
    ],
    [],
  );

  async function handleNextButtonClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = form.state.values;
    const isValid = validateFormStepLocationInformation(values);

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        form.setFieldMeta(
          fieldName as keyof VolunteerRegistrationFormValue,
          (prev) => ({
            ...prev,
            isTouched: true,
          }),
        );
      });

      await Promise.all(
        fieldNames.map((fieldName) =>
          form.validateField(
            fieldName as keyof VolunteerRegistrationFormValue,
            "submit",
          ),
        ),
      );

      return;
    }

    navigate({ to: "/registration/volunteer/select-id-type" });
  }

  return (
    <>
      <VolunteerRegistrationStepper currentStep={2} />
      <div className="text-center">
        <h3>Location Information</h3>
        <p>
          We take location information so that we can make better filtration
        </p>
      </div>
      <form className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-3">
          <h4>Permanent Address</h4>
          <div className="grid grid-cols-2 gap-3">
            <form.Field name="permanentDistrict">
              {(districtField) => (
                <div className="flex flex-col gap-1">
                  <FormComboBox
                    field={districtField}
                    label="Permanent District"
                    placeholder="Select District"
                    options={districtOptions}
                    searchPlaceholder="Search districts..."
                    noResultsMessage="No districts found."
                    onChangeExtra={() =>
                      form.setFieldValue("permanentUpazila", "")
                    }
                  />
                  <FieldErrorInfo field={districtField} />
                </div>
              )}
            </form.Field>
            <form.Subscribe
              selector={(state) => state.values.permanentDistrict}
            >
              {(permanentDistrict) => (
                <form.Field name="permanentUpazila">
                  {(field) => (
                    <div className="flex flex-col gap-1">
                      <FormComboBox
                        field={field}
                        label="Permanent Upazila/Thana"
                        placeholder="Select Upazila/Thana"
                        options={getAllUpazilaOrThana(permanentDistrict)}
                        disabled={!permanentDistrict}
                        searchPlaceholder="Search"
                        noResultsMessage="No Upazila/Thana found."
                      />
                      <FieldErrorInfo field={field} />
                    </div>
                  )}
                </form.Field>
              )}
            </form.Subscribe>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4>Current Address</h4>
          <form.Field name="currentSameAsPermanent">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormCheckbox field={field} label="Same as Permanent Address" />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <div className="grid grid-cols-2 gap-3">
            <form.Subscribe
              selector={(state) => state.values.currentSameAsPermanent}
            >
              {(currentSameAsPermanent) => (
                <form.Field name="currentDistrict">
                  {(field) => (
                    <div className="flex flex-col gap-1">
                      <FormComboBox
                        field={field}
                        label="Current District"
                        placeholder="Select District"
                        options={districtOptions}
                        disabled={currentSameAsPermanent}
                        searchPlaceholder="Search districts"
                        noResultsMessage="No districts found."
                        onChangeExtra={() =>
                          form.setFieldValue("currentUpazila", "")
                        }
                      />
                      <FieldErrorInfo
                        field={field}
                        condition={!currentSameAsPermanent}
                      />
                    </div>
                  )}
                </form.Field>
              )}
            </form.Subscribe>
            <form.Subscribe>
              {(state) => (
                <form.Field name="currentUpazila">
                  {(field) => (
                    <div className="flex flex-col gap-1">
                      <FormComboBox
                        field={field}
                        label="Current Upazila/Thana"
                        placeholder="Select Upazila/Thana"
                        options={getAllUpazilaOrThana(
                          state.values.currentDistrict,
                        )}
                        disabled={
                          state.values.currentSameAsPermanent ||
                          !state.values.currentDistrict
                        }
                        noResultsMessage="No Upazila/Thana found."
                      />
                      <FieldErrorInfo field={field} />
                    </div>
                  )}
                </form.Field>
              )}
            </form.Subscribe>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/registration/volunteer/personal-information" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
