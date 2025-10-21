import { IconFile, IconId } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { LinkCard } from "@/components/ui/link-card";
import { VolunteerRegistrationStepper } from "./-stepper";

export const Route = createFileRoute("/registration/volunteer/select-id-type")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <VolunteerRegistrationStepper currentStep={3} />
      <div className="text-center">
        <h3>Select ID Type</h3>
        <p>We need to verify you before any official registration</p>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <LinkCard
          icon={<IconId className="size-12" />}
          to="/registration/volunteer/nid-information"
          heading="NID"
          subHeading="National ID Card"
        />
        <LinkCard
          icon={<IconFile className="size-12" />}
          to="/registration/volunteer/brn-information"
          heading="BRN"
          subHeading="Birth Registration Number"
        />
        <BackButton to="/registration/volunteer/location-information" />
      </div>
    </>
  );
}
