import { IconCircleCheck } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import {
  FieldErrorInfo,
  FormAvatarUpload,
  FormTextInput,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import Muted from "@/components/ui/typography/muted";
import {
  uploadNidImages,
  uploadProfilePic,
} from "@/features/volunteer-registration/actions/register-volunteer";
import { parseResult } from "@/lib/result";
import { useVolunteerQuery } from "@/queries/use-volunteer-query";

export const Route = createFileRoute("/volunteer/$uuid/upload-media")({
  component: UploadMissingMediaComponent,
});

const uploadMediaSchema = v.object({
  nidNumber: v.pipe(
    v.string(),
    v.minLength(1, "NID number is required"),
    v.regex(/^\d{10}$|^\d{13}$|^\d{17}$/, "NID must be 10, 13, or 17 digits"),
  ),
  nidImage1: v.instance(File, "Front of NID is required"),
  nidImage2: v.instance(File, "Back of NID is required"),
  profilePicture: v.instance(File, "Profile picture is required"),
});

type UploadMediaFormValue = v.InferOutput<typeof uploadMediaSchema>;

function UploadMissingMediaComponent() {
  const { uuid } = Route.useParams();
  const navigate = useNavigate();
  const { data: volunteer, isLoading, error } = useVolunteerQuery(uuid);

  // Redirect if volunteer is not in missing-media status
  useEffect(() => {
    if (volunteer && volunteer.status !== "missing-media") {
      toast.error("Access Denied", {
        description: "Only volunteers with missing media can access this page",
      });
      navigate({ to: "/volunteer/$uuid", params: { uuid } });
    }
  }, [volunteer, navigate, uuid]);

  const form = useForm({
    defaultValues: {
      nidNumber: "",
      nidImage1: null!,
      nidImage2: null!,
      profilePicture: null!,
    } as UploadMediaFormValue,
    validators: {
      onChange: uploadMediaSchema,
    },
    onSubmit: async ({ value }) => {
      // Upload NID images
      const [_, nidError] = await parseResult(() =>
        uploadNidImages(uuid, value.nidImage1, value.nidImage2),
      );

      if (nidError) {
        toast.error("Failed to upload NID images", {
          description: nidError.message,
        });
        return;
      }

      // Upload profile picture
      const [__, profileError] = await parseResult(() =>
        uploadProfilePic(uuid, value.profilePicture),
      );

      if (profileError) {
        toast.error("Failed to upload profile picture", {
          description: profileError.message,
        });
        return;
      }

      toast.success("Media uploaded successfully", {
        description: "Your media has been uploaded. Please wait for verification.",
      });
      navigate({ to: "/volunteer/$uuid", params: { uuid } });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-bold text-destructive">Error</h3>
          <p className="text-muted-foreground">
            Failed to load volunteer information
          </p>
        </div>
      </div>
    );
  }

  if (!volunteer || volunteer.status !== "missing-media") {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8 mx-auto p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Upload Missing Media</h3>
        <Muted>
          Your account is marked as missing media. Please upload the required
          documents to complete your verification.
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
        <form.Field name="nidNumber">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormTextInput
                field={field}
                label="NID Number"
                placeholder="Your 10, 13, or 17 digit NID number"
              />
              <Muted className="text-xs">
                {/* TODO: Add async validation to verify NID number matches backend */}
                Re-enter your NID number as a security check
              </Muted>
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="nidImage1">
          {(nidImage1Field) => (
            <form.Field name="nidImage2">
              {(nidImage2Field) => {
                function setFilesToFields(files: Array<File>) {
                  nidImage1Field.handleChange(files[0] ?? null);
                  nidImage2Field.handleChange(files[1] ?? null);
                }
                return (
                  <div className="flex flex-col gap-1">
                    <FileUpload
                      maxFiles={2}
                      title="Upload NID"
                      description="Upload the front & back of your NID as proof"
                      acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                      onFilesChange={setFilesToFields}
                      {...(!!nidImage1Field.state.value &&
                        !!nidImage2Field.state.value && {
                          initialFiles: [
                            nidImage1Field.state.value,
                            nidImage2Field.state.value,
                          ],
                        })}
                    />
                    <FieldErrorInfo field={nidImage1Field} />
                    <FieldErrorInfo field={nidImage2Field} />
                  </div>
                );
              }}
            </form.Field>
          )}
        </form.Field>

        <form.Field name="profilePicture">
          {(field) => (
            <div className="flex flex-col gap-1">
              <FormAvatarUpload
                field={field}
                buttonLabel="Upload Profile Picture"
              />
              <Muted className="text-xs">
                Upload a clear face photo for identification
              </Muted>
              <FieldErrorInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <Button type="submit" disabled={!canSubmit} className="w-full">
              {isSubmitting ? <Loader /> : <IconCircleCheck />}
              Upload Media
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
