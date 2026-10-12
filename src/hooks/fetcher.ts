import type { ApiError } from "@/lib/eav/types";

/** HTTP error carrying the status and the API's `code`, so the UI can branch (e.g. 404 → empty state). */
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code?: ApiError["code"],
    message?: string,
  ) {
    super(message ?? `HTTP ${status}`);
    this.name = "HttpError";
  }
}

export async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: { Accept: "application/json", ...(init?.body ? { "Content-Type": "application/json" } : {}), ...init?.headers },
  });
  if (!res.ok) {
    let body: Partial<ApiError> | undefined;
    try {
      body = (await res.json()) as Partial<ApiError>;
    } catch {
      /* non-JSON error body */
    }
    throw new HttpError(res.status, body?.code, body?.error);
  }
  return (await res.json()) as T;
}

export const isNotFound = (e: unknown) => e instanceof HttpError && e.status === 404;
