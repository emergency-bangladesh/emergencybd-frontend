import { useContext } from "react";
import { AddTeamPlanActivityFormContext } from "./form-context";

export function useAddTeamPlanActivityForm() {
  const context = useContext(AddTeamPlanActivityFormContext);
  if (!context) {
    throw new Error(
      "useAddTeamPlanActivityForm must be used within a AddTeamPlanActivityFormProvider",
    );
  }
  return context;
}
