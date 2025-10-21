import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { reportLostAndFoundIssue } from "../actions/report-lost-and-found-issue";
import { LostAndFoundFormContext } from "./form-context";
import type { LostAndFoundFormValue } from "./form-schema";
import { lostAndFoundSchema } from "./form-schema";

function useInitLostAndFoundForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const defaultValues: LostAndFoundFormValue = {
    personsName: undefined!,
    age: undefined!,
    dateTimeLost: undefined!,
    details: undefined!,
    lastSeenLocation: undefined!,
    district: undefined!,
    upazila: undefined!,
    bloodGroup: undefined,
    occupation: undefined,
    images: [],
    acceptTerms: false,
    emailAddress: user?.email || undefined!,
    fullName: user?.name || undefined!,
    phoneNumber: user?.phoneNumber || undefined!,
    emergencyContactNumber: user?.phoneNumber || undefined!,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: lostAndFoundSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { issue_uuid: uuid } = await reportLostAndFoundIssue(value);
        toast.success("Issue Reported successfully");
        navigate({ to: "/issues/$uuid", params: { uuid: uuid } });
      } catch (err) {
        toast.error("Something went wrong", {
          description: (err as Error).message,
        });
      }
    },
  });
  return form;
}

export type LostAndFoundFormInstance = ReturnType<
  typeof useInitLostAndFoundForm
>;

export function LostAndFoundFormProvider({
  children,
}: {
  children: ReactNode;
}) {
  const form = useInitLostAndFoundForm();

  return (
    <LostAndFoundFormContext.Provider value={form}>
      {children}
    </LostAndFoundFormContext.Provider>
  );
}
