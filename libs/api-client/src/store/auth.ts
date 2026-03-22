import { http } from "../http";

const base = () => process.env["NEXT_PUBLIC_AUTH_API_URL"] ?? "";

export interface LoginRequest { email: string; password: string; }
export interface AuthResponse { accessToken: string; refreshToken: string; expiresIn: number; }

export const storeAuthApi = {
  login: (body: LoginRequest) =>
    http.post<AuthResponse>(`${base()}/api/auth/login`, body),
  refresh: (refreshToken: string) =>
    http.post<AuthResponse>(`${base()}/api/auth/refresh`, { refreshToken }),
  logout: (opts?: { token?: string }) =>
    http.post<void>(`${base()}/api/auth/logout`, {}, opts),
};
