import { useContext } from "react";
import { AddTeamPlanFormContext } from "./form-context";

export function useAddTeamPlanForm() {
  const context = useContext(AddTeamPlanFormContext);
  if (!context) {
    throw new Error(
      "useAddTeamPlanForm must be used within a AddTeamPlanFormProvider",
    );
  }
  return context;
}
