import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import { LostAndFoundIssueStepper } from "./-stepper";
import { LostAndFoundInfo } from "./-info";
import type { LostAndFoundFormValue } from "@/features/issue-reporting/lost-and-found/form/form-schema";
import { useLostAndFoundForm } from "@/features/issue-reporting/lost-and-found/form/use-lost-and-found-form";
import { FileUpload } from "@/components/ui/file-upload";
import { FieldErrorInfo } from "@/components/ui/form";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { validateLostAndFoundPictureInformationStep } from "@/features/issue-reporting/lost-and-found/form/form-step-validation";

export const Route = createFileRoute("/issues/new/lost-and-found/add-images")({
  component: RouteComponent,
});

const fieldNames = ["images"];

function RouteComponent() {
  const form = useLostAndFoundForm();
  const navigate = useNavigate();

  async function handleNextButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const values = form.state.values;
    const isValid = validateLostAndFoundPictureInformationStep(values);

    if (!isValid) {
      fieldNames.forEach((fieldName) => {
        form.setFieldMeta(fieldName as keyof LostAndFoundFormValue, (prev) => ({
          ...prev,
          isTouched: true,
        }));
      });

      await Promise.all(
        fieldNames.map((fieldName) =>
          form.validateField(
            fieldName as keyof LostAndFoundFormValue,
            "submit",
          ),
        ),
      );

      return;
    }

    navigate({ to: "/issues/new/lost-and-found/add-contact-information" });
  }

  return (
    <>
      <LostAndFoundIssueStepper currentStep={3} />
      <div id="title" className="text-center">
        <h3>Add Images of Lost Person</h3>
        <p>Upload max 3 clear images for identifying the person</p>
      </div>
      <LostAndFoundInfo />
      <form id="form-fields" className="flex flex-col gap-6 w-full">
        <form.Field name="images">
          {(field) => {
            function setFilesToField(files: Array<File>) {
              field.handleChange(files);
            }
            return (
              <div className="flex flex-col gap-3">
                <FileUpload
                  description="Drop your images here (Max. 3)"
                  title="Upload Clear Images"
                  onFilesChange={setFilesToField}
                  acceptedTypes={["image/*"]}
                  maxFiles={3}
                  initialFiles={field.state.value}
                />
                <FieldErrorInfo field={field} />
              </div>
            );
          }}
        </form.Field>
        <div className="grid grid-cols-2 items-center w-full max-w-lg justify-center gap-3">
          <BackButton
            to="/issues/new/lost-and-found/add-more-information"
            label="Edit Issue Type"
          />
          <Button className="w-full" onClick={handleNextButtonClick}>
            <IconArrowRight />
            Continue
          </Button>
        </div>
      </form>
    </>
  );
}
