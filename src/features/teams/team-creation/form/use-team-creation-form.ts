import { useContext } from "react";
import { TeamCreationFormContext } from "./form-context";
import type { TeamCreationFormInstance } from "./form-provider";

export function useTeamCreationForm(): TeamCreationFormInstance {
  const context = useContext(TeamCreationFormContext);
  if (!context) {
    throw new Error(
      "useTeamCreationForm must be used within a TeamCreationFormProvider",
    );
  }
  return context;
}
