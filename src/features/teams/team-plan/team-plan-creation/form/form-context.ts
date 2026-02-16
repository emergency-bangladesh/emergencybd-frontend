import { createContext } from "react";
import type { AddTeamPlanFormInstance } from "./form-provider";

export const AddTeamPlanFormContext = createContext<
  AddTeamPlanFormInstance | undefined
>(undefined);
