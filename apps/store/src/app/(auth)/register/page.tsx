"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check } from "lucide-react";
import { cn } from "@modernstores/ui";

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function update(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  const passwordsMatch = form.password === form.confirmPassword && form.confirmPassword.length > 0;
  const allRulesPass = PASSWORD_RULES.every((r) => r.test(form.password));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allRulesPass || !passwordsMatch || !agreed) return;
    setError("");
    setIsLoading(true);

    try {
      // TODO: replace with storeAuthApi.register(form)
      await new Promise((r) => setTimeout(r, 1200));
      router.push("/login");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join ModernStores for fresh groceries delivered fast
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm text-muted-foreground">
              First name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <input
                id="firstName"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Jane"
                value={form.firstName}
                onChange={update("firstName")}
                className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm text-muted-foreground">
              Last name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <input
                id="lastName"
                type="text"
                required
                autoComplete="family-name"
                placeholder="Smith"
                value={form.lastName}
                onChange={update("lastName")}
                className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-muted-foreground">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
              className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm text-muted-foreground">
            Phone number <span className="text-muted-foreground/40">(optional)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={update("phone")}
              className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="reg-password" className="mb-1.5 block text-sm text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={update("password")}
              className="w-full rounded-xl border border-border bg-white/60 py-2.5 pl-10 pr-10 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Password strength */}
          {form.password.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {PASSWORD_RULES.map((rule) => {
                const passes = rule.test(form.password);
                return (
                  <div key={rule.id} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                        passes ? "bg-green-500 text-white" : "bg-muted"
                      )}
                    >
                      {passes && <Check className="h-2.5 w-2.5" />}
                    </div>
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        passes ? "text-green-600" : "text-muted-foreground"
                      )}
                    >
                      {rule.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm text-muted-foreground">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={update("confirmPassword")}
              className={cn(
                "w-full rounded-xl border bg-white/60 py-2.5 pl-10 pr-10 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary",
                form.confirmPassword.length > 0
                  ? passwordsMatch
                    ? "border-green-400"
                    : "border-red-300"
                  : "border-border"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            onClick={() => setAgreed((a) => !a)}
            className={cn(
              "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-md border transition-colors",
              agreed
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white/60"
            )}
          >
            {agreed && (
              <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <span className="text-sm leading-snug text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="text-primary underline">Terms of Service</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary underline">Privacy Policy</Link>
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !agreed || !allRulesPass || !passwordsMatch}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white/60 px-3 text-muted-foreground">or sign up with</span>
        </div>
      </div>

      {/* Social sign-up */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white/60 py-2.5 text-sm font-medium transition-colors hover:bg-accent/60"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white/60 py-2.5 text-sm font-medium transition-colors hover:bg-accent/60"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.1-.02-.2-.02-.3 0-1.06.55-2.18 1.23-2.95.76-.87 2.03-1.54 2.94-1.54.05 0 .1 0 .15.01.03.07.05.14.05.22l-.03-.03zM20.5 17.12c-.33.74-.49 1.07-.92 1.73-.6.92-1.44 2.06-2.48 2.07-.93.01-1.17-.61-2.43-.6-1.27.01-1.53.62-2.46.61-1.04-.01-1.83-1.03-2.43-1.95-1.68-2.57-1.86-5.59-.82-7.19.73-1.13 1.9-1.79 3-1.79 1.11 0 1.82.62 2.74.62.89 0 1.44-.62 2.73-.62 1.0 0 2.02.54 2.76 1.48-2.44 1.33-2.04 4.82.31 5.64z" />
          </svg>
          Apple
        </button>
      </div>

      {/* Login link */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}
