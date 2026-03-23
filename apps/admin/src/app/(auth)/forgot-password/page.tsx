"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@modernstores/ui";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: wire up password reset API
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <Card className="w-full max-w-sm shadow-md border-border/60">
        <CardContent className="pt-8 pb-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <MailCheck className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Check your email</h2>
          <p className="text-sm text-muted-foreground">
            If <span className="font-medium text-foreground">{email}</span> is registered, you&apos;ll receive a reset link within a few minutes.
          </p>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to sign in
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-md border-border/60">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a link to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@modernstores.com"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send reset link
          </Button>
        </form>

        <Button asChild variant="ghost" className="mt-3 w-full text-muted-foreground">
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
