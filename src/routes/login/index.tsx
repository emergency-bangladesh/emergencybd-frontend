import { IconAlertTriangle, IconLogin2 } from "@tabler/icons-react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import {
  FieldErrorInfo,
  FormEmailInput,
  FormPasswordInput,
} from "@/components/ui/form";
import Muted from "@/components/ui/typography/muted";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { ApiError } from "@/lib/errors";
import { parseResult } from "@/lib/result";

const loginFormSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
  password: v.pipe(v.string(), v.minLength(1, "Password is required")),
});

export const Route = createFileRoute("/login/")({
  component: LoginForm,
  validateSearch: v.object({
    next: v.optional(v.string()),
  }),
});

function LoginForm() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const { login } = useAuth();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      setGeneralError(null);
      console.log("Logging in...");
      const [user, error] = await parseResult(() => login(value));

      if (error) {
        console.error("Login error:", error);
        if (error instanceof ApiError) {
          if (error.status === 404) {
            loginForm.setErrorMap({
              onChange: {
                fields: {
                  email: { message: "No account found with this email" },
                },
              },
            });
          } else if (error.status === 403) {
            loginForm.setErrorMap({
              onSubmit: {
                fields: { password: { message: "Invalid Password" } },
              },
            });
          } else {
            setGeneralError("An unexpected error occurred. Please try again.");
          }
        } else {
          setGeneralError("An unexpected error occurred. Please try again.");
        }
        return;
      }

      console.log("Logged in!");
      console.log({ user });
      if (next) {
        navigate({ to: next });
      } else {
        navigate({ to: "/" });
      }
    },
  });

  return (
    <div className="flex justify-center items-center max-w-lg flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Login to Your Account</h1>
        <p className="text-muted-foreground">
          Regardless you&apos;re a volunteer or general user
        </p>
      </div>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          e.stopPropagation();

          await loginForm.handleSubmit();
        }}
      >
        {generalError && (
          <Muted className="text-destructive flex items-center gap-2">
            <IconAlertTriangle className="w-4 h-4" /> {generalError}
          </Muted>
        )}
        <loginForm.Field name="email">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormEmailInput
                field={field}
                label="Email Address"
                placeholder="you@example.com"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </loginForm.Field>

        <loginForm.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-1 w-full">
              <FormPasswordInput
                field={field}
                label="Password"
                placeholder="********"
              />
              <FieldErrorInfo field={field} />
            </div>
          )}
        </loginForm.Field>

        <loginForm.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <Button type="submit" disabled={!canSubmit} className="w-full">
              <IconLogin2 className="mr-2 h-4 w-4" /> Login
            </Button>
          )}
        </loginForm.Subscribe>
        <div className="text-center text-sm">
          {/* TODO: CHANGE LINK TO */}
          <Link to="." className="underline">
            Forgot Password?
          </Link>
          {" or "}
          <Link to="/registration" className="underline">
            Create a new account
          </Link>
        </div>
      </form>
    </div>
  );
}
