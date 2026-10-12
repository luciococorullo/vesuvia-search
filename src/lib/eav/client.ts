/**
 * Minimal HTTP client for EAV endpoints.
 *
 * - Only the headers EAV actually needs (the planner rejects requests without
 *   X-Requested-With by redirecting to /Home/Error). No spoofed browser UA.
 * - Hard timeout via AbortController.
 * - Redirects are treated as failures (that is how the planner signals errors).
 * - Raw payloads are never logged.
 */
import type { z } from 'zod';

export const PLANNER_BASE = 'https://planner.eavsrl.it';
export const ORARIOTRENI_BASE = 'https://orariotreni.eavsrl.it';

const DEFAULT_TIMEOUT_MS = 8_000;

/** Any failure talking to EAV (network, timeout, HTTP status, bad payload). */
export class EavUpstreamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EavUpstreamError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST';
  form?: Record<string, string>;
  timeoutMs?: number;
}

async function request(url: string, opts: RequestOptions = {}): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  const headers: Record<string, string> = { Accept: '*/*' };
  let body: string | undefined;
  if (opts.form) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    headers['X-Requested-With'] = 'XMLHttpRequest';
    body = new URLSearchParams(opts.form).toString();
  }
  try {
    const res = await fetch(url, {
      method: opts.method ?? (opts.form ? 'POST' : 'GET'),
      headers,
      body,
      redirect: 'manual',
      signal: controller.signal,
    });
    if (res.status < 200 || res.status >= 300) {
      throw new EavUpstreamError(`EAV responded ${res.status} for ${new URL(url).pathname}`);
    }
    return await res.text();
  } catch (err) {
    if (err instanceof EavUpstreamError) throw err;
    const reason = err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'network error';
    throw new EavUpstreamError(`EAV ${reason} for ${new URL(url).pathname}`);
  } finally {
    clearTimeout(timer);
  }
}

/** POST a form and validate the JSON response with a zod schema. */
export async function eavPostJson<T extends z.ZodTypeAny>(
  url: string,
  form: Record<string, string>,
  schema: T,
): Promise<z.infer<T>> {
  const text = await request(url, { form });
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new EavUpstreamError(`EAV returned non-JSON for ${new URL(url).pathname}`);
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new EavUpstreamError(`EAV payload did not match schema for ${new URL(url).pathname}`);
  }
  return parsed.data;
}

/** POST a form and return the raw text (HTML boards). */
export function eavPostText(url: string, form: Record<string, string>): Promise<string> {
  return request(url, { form });
}

/** GET a page as text. */
export function eavGetText(url: string): Promise<string> {
  return request(url, { method: 'GET' });
}
