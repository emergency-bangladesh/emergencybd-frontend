import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { NextButton } from "@/components/next-button";
import {
  FieldErrorInfo,
  FormDateAndTimePicker,
  FormNumberInput,
  FormSelect,
  FormTextInput,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import type { BloodDonationIssueFormValue } from "@/features/issues/blood-donation/form/form-schema";
import { validateBloodDonationBasicInformationStep } from "@/features/issues/blood-donation/form/form-step-validation";
import { useBloodDonationIssueForm } from "@/features/issues/blood-donation/form/use-blood-donation-issue-form";
import { useLanguage } from "@/integrations/language/use-language";
import { BloodDonationInfo } from "./-info";
import { BloodDonationIssueStepper } from "./-stepper";

export const Route = createFileRoute(
  "/issues/new/blood-donation/add-basic-information",
)({
  component: AddBasicInformationSection,
});

const fieldNames = [
  "patientName",
  "bloodGroup",
  "amountInBag",
  "exactDateAndTime",
];

const title = { en: "Add Detailed Information", bn: "বিস্তারিত তথ্য যোগ করুন" };
const subtitle = {
  en: "Add details to let our volunteers respond efficiently",
  bn: "আমাদের স্বেচ্ছাসেবকদের দক্ষতার সাথে প্রতিক্রিয়া জানাতে বিস্তারিত যোগ করুন।",
};
const patientNameLabel = {
  en: "Patient's Name",
  bn: "রোগীর নাম",
};
const patientNamePlaceholder = {
  en: "Name of Patient",
  bn: "রোগীর নাম",
};
const bloodGroupLabel = {
  en: "Blood Group",
  bn: "রক্তের গ্রুপ",
};
const bloodGroupPlaceholder = {
  en: "Select Blood Group",
  bn: "রক্তের গ্রুপ নির্বাচন করুন",
};
const amountInBagLabel = {
  en: "Quantity (numeric input) (in bag)",
  bn: "পরিমাণ (ব্যাগে) (ইংরেজি নিউমেরিকে)",
};
const amountInBagPlaceholder = {
  en: "e.g., 3",
  bn: "যেমন, 3",
};
const exactDateAndTimeLabel = {
  en: "Exact Date and Time",
  bn: "যথাযথ তারিখ এবং সময়",
};

function AddBasicInformationSection() {
  const navigate = useNavigate();
  const form = useBloodDonationIssueForm();
  const { language } = useLanguage();

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = form.state.values;
    const isValid = validateBloodDonationBasicInformationStep(values);

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        form.setFieldMeta(
          fieldName as keyof BloodDonationIssueFormValue,
          (prev) => ({
            ...prev,
            isTouched: true,
          }),
        );
      });

      await Promise.all(
        fieldNames.map((fieldName) =>
          form.validateField(
            fieldName as keyof BloodDonationIssueFormValue,
            "submit",
          ),
        ),
      );

      return;
    }

    navigate({ to: "/issues/new/blood-donation/add-location-information" });
  }

  return (
    <>
      <BloodDonationIssueStepper currentStep={1} />
      <div className="text-center">
        <h3>{title[language]}</h3>
        <p>{subtitle[language]}</p>
      </div>
      <BloodDonationInfo />
      <form className="flex flex-col gap-6 w-full">
        <form.Field name="patientName">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label={patientNameLabel[language]}
                placeholder={patientNamePlaceholder[language]}
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 w-full gap-3">
          <form.Field name="bloodGroup">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormSelect
                  field={field}
                  label={bloodGroupLabel[language]}
                  placeholder={bloodGroupPlaceholder[language]}
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
          <form.Field name="amountInBag">
            {(field) => (
              <div className="flex flex-col gap-1 w-full">
                <FormNumberInput
                  field={field}
                  label={amountInBagLabel[language]}
                  placeholder={amountInBagPlaceholder[language]}
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <form.Field name="exactDateAndTime">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormDateAndTimePicker
                field={field}
                label={exactDateAndTimeLabel[language]}
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton
            to="/issues/new"
            label={language === "en" ? "Edit Issue Type" : "সমস্যার ধরণ এডিট করুন"}
          />
          <NextButton onClick={handleNextButtonClick} />
        </div>
      </form>
    </>
  );
}
