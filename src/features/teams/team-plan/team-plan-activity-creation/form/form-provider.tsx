import { useForm } from "@tanstack/react-form";
import { AddTeamPlanActivityFormContext } from "./form-context";
import {
  type AddTeamPlanActivityFormSchema,
  addTeamPlanActivityFormSchema,
} from "./form-schema";

function useAddTeamPlanActivityFormInstance() {
  const defaultValues: AddTeamPlanActivityFormSchema = {
    exactLocation: "",
    details: "",
    effectiveDate: undefined!,
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: addTeamPlanActivityFormSchema,
    },
    onSubmit: async (values) => {
      // TODO: implement submit
      console.log(values);
    },
  });

  return form;
}

export type AddTeamPlanActivityFormInstance = ReturnType<
  typeof useAddTeamPlanActivityFormInstance
>;

export const AddTeamPlanActivityFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useAddTeamPlanActivityFormInstance();
  return (
    <AddTeamPlanActivityFormContext.Provider value={form}>
      {children}
    </AddTeamPlanActivityFormContext.Provider>
  );
};
