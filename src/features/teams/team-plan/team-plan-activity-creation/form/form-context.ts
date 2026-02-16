import { createContext } from "react";
import type { AddTeamPlanActivityFormInstance } from "./form-provider";

export const AddTeamPlanActivityFormContext = createContext<
  AddTeamPlanActivityFormInstance | undefined
>(undefined);
