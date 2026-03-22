"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { cn } from "@modernstores/ui";

const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "number", label: "One number", test: (p: string) => /\d/.test(p) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const allRulesPass = PASSWORD_RULES.every((r) => r.test(password));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allRulesPass || !passwordsMatch) return;
    setError("");
    setIsLoading(true);

    try {
      // TODO: replace with storeAuthApi.resetPassword({ token, password })
      await new Promise((r) => setTimeout(r, 1000));
      setIsSuccess(true);
    } catch {
      setError("This reset link has expired. Please request a new one.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Password reset</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Your password has been successfully updated.
          <br />
          You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Sign In
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Lock className="h-7 w-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Must be at least 8 characters with mixed case and a number.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* New password */}
        <div>
          <label htmlFor="new-password" className="mb-1.5 block text-sm text-muted-foreground">
            New password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Strength indicators */}
          {password.length > 0 && (
            <div className="mt-3 space-y-1.5">
              {PASSWORD_RULES.map((rule) => {
                const passes = rule.test(password);
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

        {/* Confirm */}
        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm text-muted-foreground">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <input
              id="confirm-password"
              type={showConfirm ? "text" : "password"}
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                "w-full rounded-xl border bg-white/60 py-2.5 pl-10 pr-10 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-muted-foreground/50 focus:border-primary",
                confirmPassword.length > 0
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
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !allRulesPass || !passwordsMatch}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
          ) : (
            <>
              Reset Password
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Back to sign in
        </Link>
      </div>
    </>
  );
}
