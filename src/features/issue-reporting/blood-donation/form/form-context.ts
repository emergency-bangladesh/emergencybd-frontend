import { createContext } from "react";
import type { BloodDonationIssueFormInstance } from "./form-provider";

export const BloodDonationIssueFormContext = createContext<
  BloodDonationIssueFormInstance | undefined
>(undefined);
