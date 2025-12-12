import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BloodDonationIssueFormProvider } from "@/features/issues/blood-donation/form/form-provider";

export const Route = createFileRoute("/issues/new/blood-donation")({
  component: BloodDonationIssueLayout,
});

function BloodDonationIssueLayout() {
  return (
    <BloodDonationIssueFormProvider>
      <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8">
        <Outlet />
      </div>
    </BloodDonationIssueFormProvider>
  );
}
