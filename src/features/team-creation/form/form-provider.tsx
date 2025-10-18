import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { createTeam } from "../actions/create-team";
import { teamCreationFormSchema } from "./form-schema";
import { TeamCreationFormContext } from "./form-context";
import type { TeamCreationFormValue } from "./form-schema";

function useInitTeamCreationForm() {
  const navigate = useNavigate();
  const defaultValues: TeamCreationFormValue = {
    teamName: "",
    expirationDate: undefined!,
    coLeaderEmail: undefined,
  };
  const form = useForm({
    defaultValues,
    validators: {
      onChange: teamCreationFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createTeam(value);
        toast.success("Team created");
        // TODO: Update to
        navigate({ to: "/" });
      } catch (err) {
        toast.error("Something went wrong", {
          description: (err as Error).message,
        });
      }
    },
  });
  return form;
}

export type TeamCreationFormInstance = ReturnType<
  typeof useInitTeamCreationForm
>;

export function TeamCreationFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const form = useInitTeamCreationForm();
  return (
    <TeamCreationFormContext.Provider value={form}>
      {children}
    </TeamCreationFormContext.Provider>
  );
}
