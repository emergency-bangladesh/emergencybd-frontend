import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Loader } from "@/components/ui/loader";
import type { User } from "@/types/user";
import { useAuth } from "../hooks/use-auth";

interface RequireAuthProps {
  children: ReactNode;
  allowedUserTypes?: Array<User["type"]> | "*";
}

export const RequireAuth = ({
  children,
  allowedUserTypes = "*",
}: RequireAuthProps) => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!user) {
    navigate({ to: "/login", replace: true });
    return null;
  }

  if (allowedUserTypes !== "*" && !allowedUserTypes.includes(user.type))
    return <span>You are not authorized to view this page.</span>;

  return <>{children}</>;
};
