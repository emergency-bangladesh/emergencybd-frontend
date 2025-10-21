import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LostAndFoundFormProvider } from "@/features/issue-reporting/lost-and-found/form/form-provider";

export const Route = createFileRoute("/issues/new/lost-and-found")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LostAndFoundFormProvider>
      <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8">
        <Outlet />
      </div>
    </LostAndFoundFormProvider>
  );
}
