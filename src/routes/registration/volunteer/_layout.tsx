import { createFileRoute, Outlet } from "@tanstack/react-router";
import { VolunteerRegistrationFormProvider } from "@/features/volunteers/registration/form/form-provider";

export const Route = createFileRoute("/registration/volunteer")({
  component: VolunteerRegistrationPageLayout,
});

function VolunteerRegistrationPageLayout() {
  return (
    <VolunteerRegistrationFormProvider>
      <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8">
        <Outlet />
      </div>
    </VolunteerRegistrationFormProvider>
  );
}
