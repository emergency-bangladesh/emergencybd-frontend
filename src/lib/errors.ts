export class AuthError extends Error {
  constructor(message = "Authentication failed") {
    super(message);
    this.name = "AuthError";
  }
}

export class RefreshError extends Error {
  constructor(message = "Failed to refresh token") {
    super(message);
    this.name = "RefreshError";
  }
}

export class NetworkError extends Error {
  constructor(message = "Network error") {
    super(message);
    this.name = "NetworkError";
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message = "API error") {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
