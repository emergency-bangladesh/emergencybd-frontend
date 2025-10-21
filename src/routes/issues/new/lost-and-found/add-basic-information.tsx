import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormDateAndTimePicker,
  FormNumberInput,
  FormTextArea,
  FormTextInput,
} from "@/components/ui/form";
import type { LostAndFoundFormValue } from "@/features/issue-reporting/lost-and-found/form/form-schema";
import { validateLostAndFoundBasicInformationStep } from "@/features/issue-reporting/lost-and-found/form/form-step-validation";
import { useLostAndFoundForm } from "@/features/issue-reporting/lost-and-found/form/use-lost-and-found-form";
import { useLanguage } from "@/integrations/language/use-language";
import { LostAndFoundInfo } from "./-info";
import { LostAndFoundIssueStepper } from "./-stepper";

export const Route = createFileRoute(
  "/issues/new/lost-and-found/add-basic-information",
)({
  component: AddBasicInformationSection,
});

const fieldNames = ["personsName", "age", "dateTimeLost", "details"];
const title = { en: "Add Detailed Information", bn: "বিস্তারিত তথ্য যোগ করুন" };
const subtitle = {
  en: "Add details to let our volunteers respond efficiently",
  bn: "আমাদের স্বেচ্ছাসেবকদের দক্ষতার সাথে প্রতিক্রিয়া জানাতে বিস্তারিত যোগ করুন।",
};

function AddBasicInformationSection() {
  const navigate = useNavigate();
  const form = useLostAndFoundForm();
  const { language } = useLanguage();

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = form.state.values;
    const isValid = validateLostAndFoundBasicInformationStep(values);

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

    navigate({ to: "/issues/new/lost-and-found/add-more-information" });
  }

  return (
    <>
      <LostAndFoundIssueStepper currentStep={1} />
      <div className="text-center">
        <h3>{title[language]}</h3>
        <p>{subtitle[language]}</p>
      </div>
      <LostAndFoundInfo />
      <form className="flex flex-col gap-6 w-full">
        <form.Field name="personsName">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="Person’s Name"
                placeholder="Name of the Person"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="age">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormNumberInput
                field={field}
                label="Age"
                placeholder="Age of the lost person"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="dateTimeLost">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormDateAndTimePicker
                field={field}
                label="Date & Time When Lost"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field name="details">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormTextArea
                field={field}
                label="Details (within 10,000 characters)"
                placeholder="e.g., ‘Has a birth mark on the forehead’ or ‘Was wearing a red shirt’"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/issues/new" label="Edit Issue Type" />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
