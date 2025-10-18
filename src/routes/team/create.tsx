import { createFileRoute } from "@tanstack/react-router";
import { IconPlus } from "@tabler/icons-react";
import { TeamCreationFormProvider } from "@/features/team-creation/form/form-provider";
import { useTeamCreationForm } from "@/features/team-creation/form/use-team-creation-form";
import {
  FieldErrorInfo,
  FormDatePicker,
  FormEmailInput,
  FormTextInput,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { teamExistsWithName } from "@/actions/validate-team";
import { RequireAuth } from "@/components/require-auth";

export const Route = createFileRoute("/team/create")({
  component: () => (
    <RequireAuth allowedUserTypes={["volunteer"]}>
      <TeamCreationFormProvider>
        <TeamCreationFormSection />
      </TeamCreationFormProvider>
    </RequireAuth>
  ),
});

function TeamCreationFormSection() {
  const form = useTeamCreationForm();
  const handleCreateTeam = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <>
      <div className="flex justify-center items-center max-w-lg flex-col gap-8 mx-auto p-5">
        <div id="title" className="text-center">
          <h1 className="text-3xl font-bold">Create Emergency Response Team</h1>
          <p className="text-muted-foreground">
            Create an emergency response team for supporting and managing the
            crisis
          </p>
        </div>
        <form id="form-fields" className="flex flex-col gap-6 w-full">
          <form.Field
            name="teamName"
            validators={{
              onChangeAsync: async ({ value }) => {
                const exists = await teamExistsWithName(value);
                if (exists)
                  return { message: "A team with this name already exists" };
                return undefined;
              },
            }}
          >
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormTextInput
                  field={field}
                  label="Team Name"
                  placeholder="A Unique Team Name"
                  id="teamName"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name="expirationDate">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormDatePicker
                  field={field}
                  label="Expiration Date"
                  id="expirationDate"
                  placeholder="DD/MM/YYYY"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name="coLeaderEmail">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormEmailInput
                  field={field}
                  label="Co-Leader Email"
                  placeholder="coleader@team.id"
                  id="coLeaderEmail"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
            <BackButton />
            <Button className="w-full" onClick={handleCreateTeam}>
              <IconPlus className="mr-2 h-4 w-4" /> Create Team
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
