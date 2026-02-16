import { useForm } from "@tanstack/react-form";
import { AddTeamPlanFormContext } from "./form-context";
import {
  type AddTeamPlanFormSchema,
  addTeamPlanFormSchema,
} from "./form-schema";

function useAddTeamPlanFormInstance() {
  const defaultValues: AddTeamPlanFormSchema = {
    planTitle: "",
    startDate: undefined!,
    endDate: undefined!,
    targetDistrict: "",
    targetUpazila: "",
    description: "",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: addTeamPlanFormSchema,
    },
    onSubmit: async (values) => {
      // TODO: implement submit
      console.log(values);
    },
  });

  return form;
}

export type AddTeamPlanFormInstance = ReturnType<
  typeof useAddTeamPlanFormInstance
>;

export const AddTeamPlanFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const form = useAddTeamPlanFormInstance();
  return (
    <AddTeamPlanFormContext.Provider value={form}>
      {children}
    </AddTeamPlanFormContext.Provider>
  );
};
