import { http } from "../http";

const base = () => process.env["NEXT_PUBLIC_AUTH_API_URL"] ?? "";

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { firstName: string; lastName: string; email: string; password: string; phone?: string; }
export interface ForgotPasswordRequest { email: string; }
export interface ResetPasswordRequest { token: string; password: string; }
export interface AuthResponse { accessToken: string; refreshToken: string; expiresIn: number; }

export const storeAuthApi = {
  login: (body: LoginRequest) =>
    http.post<AuthResponse>(`${base()}/api/auth/login`, body),
  register: (body: RegisterRequest) =>
    http.post<AuthResponse>(`${base()}/api/auth/register`, body),
  forgotPassword: (body: ForgotPasswordRequest) =>
    http.post<void>(`${base()}/api/auth/forgot-password`, body),
  resetPassword: (body: ResetPasswordRequest) =>
    http.post<void>(`${base()}/api/auth/reset-password`, body),
  refresh: (refreshToken: string) =>
    http.post<AuthResponse>(`${base()}/api/auth/refresh`, { refreshToken }),
  logout: (opts?: { token?: string }) =>
    http.post<void>(`${base()}/api/auth/logout`, {}, opts),
};
