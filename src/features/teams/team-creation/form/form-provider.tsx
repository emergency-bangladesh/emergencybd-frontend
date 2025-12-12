import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { createTeam } from "../actions/create-team";
import { parseResult } from "@/lib/result";
import { TeamCreationFormContext } from "./form-context";
import type { TeamCreationFormValue } from "./form-schema";
import { teamCreationFormSchema } from "./form-schema";

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
      const [_, error] = await parseResult(() => createTeam(value));
      if (error) {
        toast.error("Something went wrong", {
          description: error.message,
        });
        return;
      }
      toast.success("Team created");
      // TODO: Update to
      navigate({ to: "/" });
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
