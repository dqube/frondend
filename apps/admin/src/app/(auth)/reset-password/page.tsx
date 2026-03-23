"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Check, X, ShieldCheck } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  cn,
} from "@modernstores/ui";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const passwordMismatch = confirm.length > 0 && password !== confirm;
  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!allRulesPassed) {
      setError("Password does not meet requirements.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    // TODO: call reset-password API with token from searchParams
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <Card className="w-full max-w-sm shadow-md border-border/60">
        <CardContent className="pt-8 pb-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Password reset</h2>
          <p className="text-sm text-muted-foreground">
            Your password has been updated successfully. Sign in with your new password.
          </p>
          <Button asChild className="mt-2 w-full">
            <Link href="/login">Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-md border-border/60">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">Reset password</CardTitle>
        <CardDescription>Choose a strong new password for your account.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                disabled={isLoading}
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {password.length > 0 && (
              <ul className="mt-2 space-y-1">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(password);
                  return (
                    <li key={rule.label} className={cn("flex items-center gap-1.5 text-xs", passed ? "text-primary" : "text-muted-foreground")}>
                      {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                required
                disabled={isLoading}
                className={cn(
                  "pr-10",
                  passwordMismatch && "border-destructive focus-visible:ring-destructive/30",
                  passwordsMatch && "border-primary focus-visible:ring-primary/30"
                )}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordMismatch && (
              <p className="text-xs text-destructive">Passwords do not match.</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
