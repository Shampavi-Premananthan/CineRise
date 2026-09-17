"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/lib/api";

type RoleOption = {
  value: Role;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const ROLES: RoleOption[] = [
  {
    value: "FILMMAKER",
    label: "Filmmaker",
    description: "Directors, writers, producers",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    value: "CREW",
    label: "Crew",
    description: "Cinematographers, editors, crew",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    value: "ORGANIZATION",
    label: "Organization",
    description: "Studios, agencies, companies",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
];

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role | "";
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}

export default function RegisterPage() {
  const { register, isLoading } = useAuth();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function validate(): boolean {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = "Full name is required";
    } else if (form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      errs.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if (!form.role) {
      errs.role = "Please select your role";
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
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role as Role,
      });
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
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
        <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
        <p className="text-sm text-white/50">Join the CineRise community</p>
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

      <form id="register-form" onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="register-name" className="block text-sm font-medium text-white/70 mb-1.5">
            Full name
          </label>
          <input
            id="register-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Your full name"
            className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
              errors.name
                ? "border-red-500/50 focus:border-red-500/50"
                : "border-white/[0.1] focus:border-[#c8a84b]/60"
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="register-email" className="block text-sm font-medium text-white/70 mb-1.5">
            Email address
          </label>
          <input
            id="register-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="you@example.com"
            className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
              errors.email
                ? "border-red-500/50 focus:border-red-500/50"
                : "border-white/[0.1] focus:border-[#c8a84b]/60"
            }`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="register-password" className="block text-sm font-medium text-white/70 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="Min. 6 characters"
              className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
                errors.password
                  ? "border-red-500/50 focus:border-red-500/50"
                  : "border-white/[0.1] focus:border-[#c8a84b]/60"
              }`}
            />
            <button
              type="button"
              id="toggle-register-password"
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
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="register-confirm-password" className="block text-sm font-medium text-white/70 mb-1.5">
            Confirm password
          </label>
          <div className="relative">
            <input
              id="register-confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
              placeholder="Re-enter your password"
              className={`w-full rounded-xl border bg-white/[0.05] px-4 py-3 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:ring-2 focus:ring-[#c8a84b]/50 ${
                errors.confirmPassword
                  ? "border-red-500/50 focus:border-red-500/50"
                  : "border-white/[0.1] focus:border-[#c8a84b]/60"
              }`}
            />
            <button
              type="button"
              id="toggle-confirm-password"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? (
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
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2.5">
            I am a…
          </label>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Select your role">
            {ROLES.map((role) => {
              const selected = form.role === role.value;
              return (
                <button
                  key={role.value}
                  id={`role-${role.value.toLowerCase()}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setForm((f) => ({ ...f, role: role.value }))}
                  className={`relative flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a84b]/70 ${
                    selected
                      ? "border-[#c8a84b] bg-[#c8a84b]/10 text-[#e8c96b] shadow-lg shadow-[#c8a84b]/10"
                      : "border-white/[0.1] bg-white/[0.03] text-white/50 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/70"
                  }`}
                >
                  {selected && (
                    <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#c8a84b]">
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#0a0a0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                  <span className={selected ? "text-[#c8a84b]" : ""}>{role.icon}</span>
                  <div>
                    <div className="text-xs font-semibold leading-tight">{role.label}</div>
                    <div className="text-[10px] leading-tight opacity-70 mt-0.5">{role.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.role && <p className="mt-1.5 text-xs text-red-400">{errors.role}</p>}
        </div>

        {/* Submit */}
        <button
          id="register-submit"
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-gradient-to-r from-[#c8a84b] to-[#e8c96b] px-4 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg shadow-[#c8a84b]/25 transition-all duration-200 hover:scale-[1.02] hover:shadow-[#c8a84b]/40 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#0a0a0f] border-t-transparent rounded-full animate-spin" />
              Creating account…
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-white/40">
          Already have an account?{" "}
          <Link
            href="/login"
            id="go-to-login"
            className="text-[#c8a84b] hover:text-[#e8c96b] font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
