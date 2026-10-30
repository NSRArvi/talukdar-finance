"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("admin@talukdarfinance.com");
  const [password, setPassword] = React.useState("@TalukdarFinance26");
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[var(--color-brand-soft-blue)] flex flex-col justify-center items-center px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Logo Card Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="inline-block mb-3">
            <div className="relative h-12 w-[140px]">
              <Image
                src="/tf-logo.png"
                alt="Talukdar Finance Logo"
                fill
                priority
                className="object-contain"
                sizes="140px"
              />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)] tracking-tight">
            Admin Management Portal
          </h1>
          <p className="text-xs text-[var(--color-brand-text-muted)] mt-1">
            Private banking &amp; brokerage administration
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--color-brand-border)] shadow-xl">
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-[var(--color-brand-navy)]"
              >
                Admin Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@talukdarfinance.com"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-[var(--color-brand-border)] text-sm text-[var(--color-brand-text)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-[var(--color-brand-navy)]"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-[var(--color-brand-border)] text-sm text-[var(--color-brand-text)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full h-12 rounded-xl bg-[var(--color-brand-blue)] hover:bg-[var(--color-brand-blue-hover)] text-white font-semibold text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-medium text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-blue)] transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

