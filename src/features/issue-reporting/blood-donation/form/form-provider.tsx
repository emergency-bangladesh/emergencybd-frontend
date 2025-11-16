import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { reportBloodDonationIssue } from "../actions/report-blood-donation-issue";
import { BloodDonationIssueFormContext } from "./form-context";
import type { BloodDonationIssueFormValue } from "./form-schema";
import { bloodDonationIssueSchema } from "./form-schema";

function useInitBloodDonationIssueForm() {
  const navigate = useNavigate();
  const defaultValues: BloodDonationIssueFormValue = {
    acceptTerms: false,
    amountInBag: undefined!,
    bloodGroup: undefined!,
    district: undefined!,
    exactDateAndTime: undefined!,
    hospitalName: undefined!,
    patientName: undefined!,
    specialInstruction: undefined,
    upazila: undefined!,
    emailAddress: undefined!,
    fullName: undefined!,
    phoneNumber: undefined!,
    emergencyContactNumber: undefined!,
  };
  const form = useForm({
    defaultValues,
    validators: {
      onChange: bloodDonationIssueSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { issue_uuid: uuid } = await reportBloodDonationIssue(value);
        toast.success("Issue Reported successfully");
        navigate({ to: "/issues/$uuid", params: { uuid } });
      } catch (err) {
        toast.error("Something went wrong", {
          description: (err as Error).message,
        });
      }
    },
  });
  return form;
}

export type BloodDonationIssueFormInstance = ReturnType<
  typeof useInitBloodDonationIssueForm
>;

export function BloodDonationIssueFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const form = useInitBloodDonationIssueForm();

  return (
    <BloodDonationIssueFormContext.Provider value={form}>
      {children}
    </BloodDonationIssueFormContext.Provider>
  );
}
