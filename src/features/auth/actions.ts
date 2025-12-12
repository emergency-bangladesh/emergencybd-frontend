import * as v from "valibot";
import { type LoginPayload, loginSchema } from "@/features/auth/schemas";
import { type User, userSchema } from "@/features/users/schemas";
import { fetchBackend } from "@/lib/fetch-backend";

export async function getCurrentUser(): Promise<User> {
  const res = await fetchBackend("/auth/me", "GET");
  const data = await res.json();
  return v.parse(userSchema, data.data);
}

export const login = async (payload: LoginPayload) => {
  const safePayload = v.parse(loginSchema, payload);
  return await fetchBackend("/auth/login", "POST", safePayload);
};

export const logout = async () => await fetchBackend("/auth/logout", "POST");
