"use client";

import * as React from "react";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import type { Metadata } from "next";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Separator,
  cn,
} from "@modernstores/ui";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
  { label: "One special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function ChangePasswordPage() {
  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  const passwordsMatch = confirm.length > 0 && newPassword === confirm;
  const passwordMismatch = confirm.length > 0 && newPassword !== confirm;
  const allRulesPassed = PASSWORD_RULES.every((r) => r.test(newPassword));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!allRulesPassed) {
      setError("New password does not meet requirements.");
      return;
    }
    if (newPassword !== confirm) {
      setError("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    // TODO: wire up change-password API
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSuccessMsg("Password updated successfully.");
    setNewPassword("");
    setConfirm("");
    e.currentTarget.reset();
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Change password</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Update your account password. You&apos;ll remain signed in on this device.
      </p>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            {successMsg && (
              <p className="rounded-md bg-primary/10 px-3 py-2 text-sm text-primary">
                {successMsg}
              </p>
            )}

            {/* Current password */}
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrent ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Separator />

            {/* New password */}
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  disabled={isLoading}
                  className="pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {newPassword.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(newPassword);
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

            {/* Confirm new password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirm-new-password">Confirm new password</Label>
              <div className="relative">
                <Input
                  id="confirm-new-password"
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

            <div className="flex justify-end pt-1">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
