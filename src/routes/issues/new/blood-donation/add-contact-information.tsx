import { IconCircleCheck } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  FieldErrorInfo,
  FormCheckbox,
  FormEmailInput,
  FormTelInput,
  FormTextInput,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useBloodDonationIssueForm } from "@/features/issue-reporting/blood-donation/form/use-blood-donation-issue-form";
import { useLanguage } from "@/integrations/language/use-language";
import { BloodDonationInfo } from "./-info";
import { BloodDonationIssueStepper } from "./-stepper";

export const Route = createFileRoute(
  "/issues/new/blood-donation/add-contact-information",
)({
  component: AddContactInformationSection,
});

const title = {
  en: "Add Contact Information",
  bn: "কন্টাক্ট ইনফরমেশন যোগ করুন",
};
const subtitle = {
  en: "Add contact information for volunteers to communicate properly",
  bn: "ভলান্টিয়ারদের যোগাযোগ করা সহজ করার জন্য যোগাযোগের তথ্য যোগ করুন।",
};
const fullNameLabel = {
  en: "Full Name (this name will be used as 'Contact Person'",
  bn: "সম্পূর্ণ নাম (এই নামটি 'কন্টাক্ট পারসন' হিসেবে যোগ করা হবে)",
};
const fullNamePlaceholder = {
  en: "Enter Full Name",
  bn: "আপনার সম্পূর্ণ নাম",
};
const emailAddressLabel = {
  en: "Email Address",
  bn: "ইমেইল এড্রেস",
};
const phoneNumberLabel = {
  en: "Phone Number",
  bn: "ফোন নম্বর",
};
const emergencyContactNumberLabel = {
  en: "Emergency Contact Number",
  bn: "জরুরী যোগাযোগ নম্বর",
};
const acceptTermsLabel = {
  en: "I consent, the information can be used as per terms and conditions",
  bn: "আমি সম্মতি দিচ্ছি যে, প্রদানকৃত সকল তথ্য শর্তাবলী এবং নিয়মাবলি অনুযায়ী ব্যাবহার করা যেতে পারে",
};

function AddContactInformationSection() {
  const form = useBloodDonationIssueForm();
  const { user } = useAuth();
  const { language } = useLanguage();

  const hasInitialValue = !!user;

  return (
    <>
      <BloodDonationIssueStepper currentStep={3} />
      <div className="text-center">
        <h3>{title[language]}</h3>
        <p>{subtitle[language]}</p>
      </div>
      <BloodDonationInfo />
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="fullName">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label={fullNameLabel[language]}
                placeholder={fullNamePlaceholder[language]}
                disabled={!!hasInitialValue}
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <form.Field name="phoneNumber">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormTelInput
                  field={field}
                  label={phoneNumberLabel[language]}
                  disabled={!!hasInitialValue}
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name="emergencyContactNumber">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormTelInput
                  field={field}
                  label={emergencyContactNumberLabel[language]}
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <form.Field name="emailAddress">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormEmailInput
                field={field}
                label={emailAddressLabel[language]}
                placeholder="you@email.com"
                disabled={!!hasInitialValue}
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field
          name="acceptTerms"
          validators={{
            onChange: ({ value }) => {
              if (!value)
                return {
                  message:
                    language === "en"
                      ? "You must accept the terms and conditions"
                      : "আনাকে অবশ্যই শর্তাবলী এবং নিয়মাবলীর সাথে সম্মত হতে হবে",
                };
              return undefined;
            },
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormCheckbox field={field} label={acceptTermsLabel[language]} />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/issues/new/blood-donation/add-location-information" />
          <form.Subscribe
            selector={(state) => {
              return {
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              };
            }}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button className="w-full" type="submit" disabled={!canSubmit}>
                {isSubmitting ? (
                  <>
                    <Loader />
                    Submitting
                  </>
                ) : (
                  <>
                    <IconCircleCheck />
                    Submit
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </>
  );
}
