export interface RequestOptions {
  token?: string;
  signal?: AbortSignal;
}

async function request<T>(url: string, options: RequestInit & RequestOptions = {}): Promise<T> {
  const { token, signal, ...init } = options;
  const headers = new Headers(init.headers);

  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(url, { ...init, headers, signal });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((error as { message?: string }).message ?? "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const http = {
  get: <T>(url: string, opts?: RequestOptions) =>
    request<T>(url, { method: "GET", ...opts }),
  post: <T>(url: string, body: unknown, opts?: RequestOptions) =>
    request<T>(url, { method: "POST", body: JSON.stringify(body), ...opts }),
  put: <T>(url: string, body: unknown, opts?: RequestOptions) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body), ...opts }),
  patch: <T>(url: string, body: unknown, opts?: RequestOptions) =>
    request<T>(url, { method: "PATCH", body: JSON.stringify(body), ...opts }),
  delete: <T>(url: string, opts?: RequestOptions) =>
    request<T>(url, { method: "DELETE", ...opts }),
};
