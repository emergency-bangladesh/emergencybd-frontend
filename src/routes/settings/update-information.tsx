import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import {
  FieldErrorInfo,
  FormAvatarUpload,
  FormComboBox,
} from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import { DISTRICT_WITH_UPAZILA_OR_THANA } from "@/constants";
import { RequireAuth } from "@/features/auth/components/require-auth";
import { useAuth } from "@/features/auth/hooks/use-auth";
import type { User } from "@/features/users/schemas";
import { uploadProfilePic } from "@/features/volunteers/registration/actions/register-volunteer";
import { fetchBackend } from "@/lib/fetch-backend";
import { parseResult } from "@/lib/result";
import { useVolunteerQuery } from "@/queries/use-volunteer-query";

export const Route = createFileRoute("/settings/update-information")({
  component: UpdateInformationComponent,
});

function UpdateInformationComponent() {
  return (
    <RequireAuth allowedUserTypes={["volunteer"]}>
      <div className="flex justify-center items-center max-w-lg w-full md:w-lg flex-col gap-8 mx-auto p-5">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Update Personal Information</h3>
          <small className="text-muted-foreground">
            We are currently letting <strong>only volunteers</strong> to update
            their information. They can now (for v0.1) update their{" "}
            <strong>current location and profile picture</strong> only. We shall
            update it on later releases
          </small>
        </div>

        <VolunteerUpdateForm />
      </div>
    </RequireAuth>
  );
}

const volunteerUpdateSchema = v.pipe(
  v.object({
    currentDistrict: v.optional(
      v.pipe(v.string(), v.minLength(1, "District is required")),
    ),
    currentUpazila: v.optional(
      v.pipe(v.string(), v.minLength(1, "Upazila is required")),
    ),
    profilePicture: v.optional(v.instance(File)),
  }),
  v.forward(
    v.check((data) => {
      if (data.currentDistrict) {
        return !!data.currentUpazila;
      }
      return true;
    }, "Upazila is required if district is selected"),
    ["currentUpazila"],
  ),
  v.forward(
    v.check((data) => {
      if (data.currentUpazila) {
        return !!data.currentDistrict;
      }
      return true;
    }, "District is required if upazila is selected"),
    ["currentDistrict"],
  ),
);

function VolunteerUpdateForm() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="w-full text-center">
        You are not authorized to view this page
      </div>
    );
  }
  return <VolunteerUpdateFormInner user={user} />;
}

function VolunteerUpdateFormInner({ user }: { readonly user: User }) {
  const { data: volunteerData } = useVolunteerQuery(user.uuid);

  console.log({ volunteerData });

  const form = useForm({
    defaultValues: {
      currentDistrict: volunteerData?.currentDistrict,
      currentUpazila: volunteerData?.currentUpazila,
      profilePicture: undefined,
    } as v.InferOutput<typeof volunteerUpdateSchema>,
    onSubmit: async ({ value }) => {
      if (value.currentDistrict && value.currentUpazila) {
        const [_, error] = await parseResult(() =>
          fetchBackend(`/volunteers/update`, "PATCH", {
            current_district: value.currentDistrict,
            current_upazila: value.currentUpazila,
          }),
        );
        if (error) {
          toast.error("Something went wrong", {
            description: error.message,
          });
          console.error(error);
          return;
        }
        toast.success("Information Updated");
      }
      if (value.profilePicture) {
        const [_, error] = await parseResult(() =>
          uploadProfilePic(user.uuid, value.profilePicture!),
        );
        if (error) {
          toast.error("Something went wrong", {
            description: error.message,
          });
          console.error(error);
          return;
        }
        toast.success("Profile Picture Updated");
      }
    },
    validators: {
      onChange: volunteerUpdateSchema,
    },
  });

  const districtOptions = useMemo(
    () =>
      DISTRICT_WITH_UPAZILA_OR_THANA.map((district) => ({
        value: district.name,
        label: district.name,
      })),
    [],
  );

  const getAllUpazilaOrThana = useCallback((district: string | undefined) => {
    if (!district) return [];

    const districtData = DISTRICT_WITH_UPAZILA_OR_THANA.find(
      (d) => d.name === district,
    );
    if (!districtData) return [];

    return districtData.allUpazilaOrThana.map((u) => ({ value: u, label: u }));
  }, []);

  return (
    <form
      className="flex flex-col justify-start gap-6 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <small> Select profile picture to update: </small>
      <form.Field name="profilePicture">
        {(field) => (
          <div className="flex flex-col gap-1">
            <FormAvatarUpload
              field={field}
              buttonLabel="Upload Profile Picture"
              initialAvatarSrc={volunteerData?.profilePictureSrc}
            />
            <FieldErrorInfo field={field} />
          </div>
        )}
      </form.Field>
      <small className="mt-6"> Update current location: </small>
      <div className="grid grid-cols-2 gap-3">
        <form.Field name="currentDistrict">
          {(districtField) => (
            <div className="flex flex-col gap-1">
              <FormComboBox
                field={districtField}
                label="Current District"
                placeholder="Select District"
                options={districtOptions}
                searchPlaceholder="Search districts..."
                noResultsMessage="No districts found."
                onChangeExtra={() =>
                  form.setFieldValue("currentUpazila", undefined)
                }
              />
              <FieldErrorInfo field={districtField} />
            </div>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => state.values.currentDistrict}>
          {(currentDistrict) => (
            <form.Field name="currentUpazila">
              {(field) => (
                <div className="flex flex-col gap-1">
                  <FormComboBox
                    field={field}
                    label="Current Upazila/Thana"
                    placeholder="Select Upazila/Thana"
                    options={getAllUpazilaOrThana(currentDistrict)}
                    disabled={!currentDistrict}
                    searchPlaceholder="Search"
                    noResultsMessage="No Upazila/Thana found."
                  />
                  <FieldErrorInfo field={field} />
                </div>
              )}
            </form.Field>
          )}
        </form.Subscribe>
      </div>

      <form.Subscribe
        selector={(state) => {
          return {
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          };
        }}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting}
          >
            {isSubmitting && <Loader />}
            Save Changes
          </Button>
        )}
      </form.Subscribe>
      <form.Subscribe>
        {(state) => {
          console.log(state);
          return <> </>;
        }}
      </form.Subscribe>
    </form>
  );
}
