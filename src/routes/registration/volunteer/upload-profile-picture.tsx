import { IconCircleCheck } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import {
  FieldErrorInfo,
  FormAvatarUpload,
  FormCheckbox,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import Muted from "@/components/ui/typography/muted";
import { useVolunteerRegistrationForm } from "@/features/volunteer-registration/form/use-volunteer-registration-form";
import { VolunteerRegistrationStepper } from "./-stepper";

export const Route = createFileRoute(
  "/registration/volunteer/upload-profile-picture",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useVolunteerRegistrationForm();
  return (
    <>
      <VolunteerRegistrationStepper currentStep={6} />
      <div className="text-center">
        <h3>Upload A Profile Picture</h3>
        <Muted>
          Upload a clear face so that anyone can identify you. This picture will
          be used with notification when you respond to an issue. Your
          registration application can be rejected if the profile pic is not
          clear enough to identify you.
        </Muted>
      </div>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          form.handleSubmit();
        }}
      >
        <form.Field name="profilePicture">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormAvatarUpload
                field={field}
                buttonLabel="Upload Profile Picture"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <form.Field
          name="agreeTerms"
          validators={{
            onSubmit: ({ value }) =>
              !value
                ? { message: "You must agree to the terms and conditions" }
                : undefined,
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormCheckbox
                field={field}
                label="I consent, the information can be used as per terms and conditions"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton to="/registration/volunteer/set-password" />
          <form.Subscribe
            selector={(state) => {
              return {
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              };
            }}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? <Loader /> : <IconCircleCheck />}
                Submit
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </>
  );
}
