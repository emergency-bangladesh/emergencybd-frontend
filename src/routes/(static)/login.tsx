import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { IconAlertTriangle, IconLogin2 } from "@tabler/icons-react";
import {
  FieldErrorInfo,
  FormEmailInput,
  FormPasswordInput,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { ApiError } from "@/lib/errors";
import Muted from "@/components/ui/typography/muted";

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/(static)/login")({
  component: LoginForm,
  validateSearch: z.object({
    next: z.string().optional(),
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
      try {
        setGeneralError(null);
        console.log("Logging in...");
        const user = await login(value);
        console.log("Logged in!");
        console.log({ user });
        if (next) {
          navigate({ to: next });
        } else {
          navigate({ to: "/" });
        }
      } catch (error) {
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
        }
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="flex justify-center items-center max-w-lg flex-col gap-8">
      <div id="title" className="text-center">
        <h1 className="text-3xl font-bold">Login to Your Account</h1>
        <p className="text-muted-foreground">
          Regardless you&apos;re a volunteer or general user
        </p>
      </div>
      <form
        id="form-fields"
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
                id="email"
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
                id="password"
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
