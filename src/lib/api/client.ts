/**
 * Thin HTTP client for the existing Spring Boot backend.
 *
 * No endpoints are defined here on purpose — the real paths are added during
 * the integration phase. This only centralises the base URL, JSON handling and
 * bearer-token attachment so pages never talk to `fetch` directly.
 */
import { tokenStorage } from "@/lib/auth/token-storage";

export const API_BASE_URL = "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = tokenStorage.getToken();
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}`, response.status);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
