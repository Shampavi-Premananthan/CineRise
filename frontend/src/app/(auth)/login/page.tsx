"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Enter a valid email address";
    }
    if (!form.password) {
      errs.password = "Password is required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-[#c8a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-white/50">Sign in to your CineRise account</p>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3"
        >
          <svg className="mt-0.5 shrink-0 text-red-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p className="text-sm text-red-400">{serverError}</p>
        </div>
      )}

      <form id="login-form" onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-white/70 mb-1.5">
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            onBlur={validate}
            placeholder="you@example.com"
            className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
              errors.email
                ? "border-red-500/50 focus:border-red-500/50"
                : "border-white/[0.1] focus:border-[#c8a84b]/60"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-white/70 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500/50"
                  : "border-white/[0.1] focus:border-[#c8a84b]/60"
              }`}
            />
            <button
              type="button"
              id="toggle-password-visibility"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          id="login-submit"
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-[#c8a84b] to-[#e8c96b] px-4 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg shadow-[#c8a84b]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-[#c8a84b]/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#0a0a0f] border-t-transparent rounded-full animate-spin" />
              Signing in…
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/40">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            id="go-to-register"
            className="text-[#c8a84b] hover:text-[#e8c96b] font-medium transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}
