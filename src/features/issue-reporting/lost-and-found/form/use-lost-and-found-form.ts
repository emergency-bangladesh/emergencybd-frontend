import { useContext } from "react";
import { LostAndFoundFormContext } from "./form-context";
import type { LostAndFoundFormInstance } from "./form-provider";

export function useLostAndFoundForm(): LostAndFoundFormInstance {
  const context = useContext(LostAndFoundFormContext);
  if (!context)
    throw new Error(
      "useLostAndFoundForm must be used within a LostAndFoundFormProvider",
    );

  return context;
}
