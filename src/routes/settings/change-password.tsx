import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import * as v from "valibot";

import { Button } from "@/components/ui/button";
import {
  FieldErrorInfo,
  FormPasswordInput,
  FormPasswordInputWithValidationFeedback,
} from "@/components/ui/form";
import { RequireAuth } from "@/features/auth/components/require-auth";
import { fetchBackend } from "@/lib/fetch-backend";

export const Route = createFileRoute("/settings/change-password")({
  component: ChangePasswordComponent,
});

const changePasswordSchema = v.pipe(
  v.object({
    oldPassword: v.pipe(v.string(), v.minLength(1, "Old password is required")),
    newPassword: v.pipe(
      v.string(),
      v.minLength(8, "Password must be at least 8 characters long"),
      v.maxLength(32, "Password must be at most 32 characters long"),
      v.regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
      v.regex(/[a-z]/, "Password must contain at least one lowercase letter"),
      v.regex(/[0-9]/, "Password must contain at least one number"),
      v.regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.check((data) => data.newPassword === data.confirmPassword, "Passwords don't match"),
    ["confirmPassword"],
  ),
);

function ChangePasswordComponent() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onChange: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await fetchBackend("/auth/update-password", "PATCH", {
          current_password: value.oldPassword,
          new_password: value.newPassword,
        });
        toast.success("Password updated");
        navigate({ to: "/" });
      } catch (err) {
        toast.error("Something went wrong", {
          description: (err as Error).message,
        });
      }
    },
  });

  return (
    <RequireAuth>
      <div className="flex justify-center items-center max-w-lg md:w-lg w-full flex-col gap-8 mx-auto p-5">
        <div className="text-center">
          <h3>Change Password</h3>
          <p>Update your password here.</p>
        </div>
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="oldPassword">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormPasswordInput field={field} label="Old Password" />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name="newPassword">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormPasswordInputWithValidationFeedback
                  field={field}
                  label="New Password"
                />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <form.Field name="confirmPassword">
            {(field) => (
              <div className="flex flex-col gap-1">
                <FormPasswordInput field={field} label="Confirm New Password" />
                <FieldErrorInfo field={field} />
              </div>
            )}
          </form.Field>
          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}
