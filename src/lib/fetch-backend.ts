import { ApiError, AuthError, NetworkError, RefreshError } from "./errors";

export const apiUrl = import.meta.env.VITE_API_URL;

/**
 * A refactored and corrected function to send requests to the backend API.
 *
 * @param route The API route to call.
 * @param method The HTTP method.
 * @param body The request body.
 * @param contentType The content type of the request.
 * @returns The server's response.
 */
export async function fetchBackend(
  route: string,
  method: RequestInit["method"],
  body?: unknown,
  contentType: "application/json" | "multipart/form-data" = "application/json",
): Promise<Response> {
  const url = route.startsWith("/")
    ? `${apiUrl}${route}`
    : `${apiUrl}/${route}`;
  const isFormData = contentType === "multipart/form-data";

  const headers: HeadersInit = {};
  if (!isFormData) {
    headers["Content-Type"] = contentType;
  }

  const requestOptions: RequestInit = {
    method,
    headers,
    credentials: "include",
    body: isFormData
      ? (body as FormData)
      : body
        ? JSON.stringify(body)
        : undefined,
  };

  try {
    let res = await fetch(url, requestOptions);

    if (res.status === 401) {
      console.log("Token invalid/expired. Attempting to refresh...");
      const refreshRes = await fetch(`${apiUrl}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!refreshRes.ok) throw new RefreshError();

      res = await fetch(url, requestOptions);
      if (res.status === 401) throw new AuthError();
    }

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ detail: "No error detail available" }));
      console.error("API Error Response:", errorData);
      throw new ApiError(
        res.status,
        `Error ${res.status}: ${JSON.stringify(errorData.message)}`,
      );
    }

    return res;
  } catch (err) {
    if (
      err instanceof AuthError ||
      err instanceof RefreshError ||
      err instanceof ApiError
    ) {
      throw err;
    }
    throw new NetworkError(
      err instanceof Error ? err.message : "Unknown network issue",
    );
  }
}
