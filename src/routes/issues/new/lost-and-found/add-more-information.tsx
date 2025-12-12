import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormComboBox,
  FormSelect,
  FormTextInput,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { DISTRICT_WITH_UPAZILA_OR_THANA } from "@/constants";
import type { LostAndFoundFormValue } from "@/features/issues/lost-and-found/form/form-schema";
import { validateLostAndFoundLocationInformationStep } from "@/features/issues/lost-and-found/form/form-step-validation";
import { useLostAndFoundForm } from "@/features/issues/lost-and-found/form/use-lost-and-found-form";
import { LostAndFoundInfo } from "./-info";
import { LostAndFoundIssueStepper } from "./-stepper";

export const Route = createFileRoute(
  "/issues/new/lost-and-found/add-more-information",
)({
  component: AddLocationInformationSection,
});

const districtOptions = DISTRICT_WITH_UPAZILA_OR_THANA.map((district) => ({
  value: district.name,
  label: district.name,
}));

const fieldNames = ["lastSeenLocation", "district", "upazila", "bloodGroup"];

function AddLocationInformationSection() {
  const form = useLostAndFoundForm();

  const navigate = useNavigate();

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = form.state.values;
    const isValid = validateLostAndFoundLocationInformationStep(values);

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        form.setFieldMeta(fieldName as keyof LostAndFoundFormValue, (prev) => ({
          ...prev,
          isTouched: true,
        }));
      });

      await Promise.all(
        fieldNames.map((fieldName) =>
          form.validateField(
            fieldName as keyof LostAndFoundFormValue,
            "submit",
          ),
        ),
      );

      return;
    }

    navigate({ to: "/issues/new/lost-and-found/add-images" });
  }

  const getAllUpazilaOrThana = useCallback((district: string | undefined) => {
    if (!district) return [];

    const districtData = DISTRICT_WITH_UPAZILA_OR_THANA.find(
      (d) => d.name === district,
    );
    if (!districtData) return [];

    return districtData.allUpazilaOrThana.map((u) => ({ value: u, label: u }));
  }, []);

  return (
    <>
      <LostAndFoundIssueStepper currentStep={2} />
      <div className="text-center">
        <h3>Add Detailed Information</h3>
        <p>Add details so that volunteers can do the job efficiently</p>
      </div>
      <LostAndFoundInfo />
      <form className="flex flex-col gap-6 w-full">
        <form.Field name="lastSeenLocation">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="Last Seen Location"
                placeholder="Be specific. e.g., ‘Near Airport Railway Station’"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 gap-3">
          <form.Field name="district">
            {(districtField) => (
              <div className="flex flex-col gap-1">
                <FormComboBox
                  field={districtField}
                  label="Permanent District"
                  placeholder="Select District"
                  options={districtOptions}
                  searchPlaceholder="Search districts..."
                  noResultsMessage="No districts found."
                  onChangeExtra={() => form.setFieldValue("upazila", "")}
                />
                <FieldErrorInfo field={districtField} />
              </div>
            )}
          </form.Field>
          <form.Subscribe selector={(state) => state.values.district}>
            {(district) => (
              <form.Field name="upazila">
                {(field) => (
                  <div className="flex flex-col gap-1">
                    <FormComboBox
                      field={field}
                      label="Permanent Upazila/Thana"
                      placeholder="Select Upazila/Thana"
                      options={getAllUpazilaOrThana(district)}
                      disabled={!district}
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

        <div className="grid grid-cols-2 gap-3">
          <form.Field name="bloodGroup">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormSelect
                  field={field}
                  label="Blood Group (Optional)"
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
          </form.Field>
          <form.Field name="occupation">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormTextInput
                  field={field}
                  label="Occupation (Optional)"
                  placeholder="e.g. Student"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/issues/new/lost-and-found/add-basic-information" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
