"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import type { ServiceCategory } from "@/types";

const consultationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  financeType: z.string().min(1, "Please select a finance category"),
  serviceName: z.string().optional(),
  contactMethod: z.enum(["phone", "email"]),
  message: z.string().optional(),
  agreePrivacy: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

interface ConsultationSectionProps {
  initialCategory?: string;
  initialServiceName?: string;
}

export function ConsultationSection({
  initialCategory,
  initialServiceName,
}: ConsultationSectionProps) {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [categories, setCategories] = React.useState<ServiceCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [selectedService, setSelectedService] = React.useState<string>(
    initialServiceName || ""
  );

  React.useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (active && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        if (active) setLoadingCategories(false);
      }
    }

    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      financeType: initialCategory || "",
      serviceName: initialServiceName || "",
      contactMethod: "phone",
      message: "",
      agreePrivacy: true,
    },
  });

  const selectedCategory = watch("financeType");

  React.useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{
        category: string;
        serviceName: string;
      }>;
      if (customEvent.detail) {
        setValue("financeType", customEvent.detail.category);
        setValue("serviceName", customEvent.detail.serviceName);
        setSelectedService(customEvent.detail.serviceName);
      }
    };

    window.addEventListener("prefill-consultation", handlePrefill);
    return () =>
      window.removeEventListener("prefill-consultation", handlePrefill);
  }, [setValue]);

  const onSubmit = async (data: ConsultationFormValues) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.from("consultations").insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          finance_type: data.financeType,
          service_name: data.serviceName || null,
          contact_method: data.contactMethod,
          message: data.message || null,
          status: "pending",
        },
      ]);

      if (error) throw error;
      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error("Submission failed:", err);
      setIsSubmitted(true);
      reset();
    }
  };

  return (
    <section id="consultation" className="py-20 lg:py-28 bg-white">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white">
          {/* Left Column: Direct Broker Pitch */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-200 bg-[#FBFBFA] flex flex-col justify-between">
            <div>
              {/* LMG Style Pill Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 tracking-wider mb-5">
                Start Your Scenario
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
                Book a Free Discovery Call
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Speak directly with an accredited finance broker. We assess your borrowing capacity, compare viable lenders, and provide strategic clarity with no obligation.
              </p>

              <div className="flex flex-col gap-3.5 text-xs font-semibold text-slate-700 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>No Out-of-Pocket Broker Fee on Residential</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Confidential, Direct Advisory</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>FBAA Accredited Lending Broker</span>
                </div>
              </div>
            </div>

            <div className="pt-10 mt-10 border-t border-slate-200 text-xs text-slate-500">
              Talukdar Finance operates strictly under National Consumer Credit Protection and the Best Interests Duty (BID).
            </div>
          </div>

          {/* Right Column: Clean Rounded Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 bg-white">
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-[var(--color-brand-navy)] mb-2">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
                  Thank you. An accredited finance broker will review your scenario details and contact you via your preferred method within 1 business day.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3.5 rounded-full bg-[var(--color-brand-navy)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--color-brand-blue)] transition-colors cursor-pointer shadow-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name *
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] text-sm shadow-2xs"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-600">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] text-sm shadow-2xs"
                    />
                    {errors.email && (
                      <span className="text-xs text-red-600">{errors.email.message}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="0400 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] text-sm shadow-2xs"
                    />
                    {errors.phone && (
                      <span className="text-xs text-red-600">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                {/* Finance Type Selection */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Finance Category *
                  </label>
                  <select
                    {...register("financeType")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] text-sm bg-white cursor-pointer shadow-2xs"
                  >
                    <option value="">Select a loan category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.financeType && (
                    <span className="text-xs text-red-600">{errors.financeType.message}</span>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Preferred Contact Method
                  </label>
                  <div className="flex items-center gap-6 pt-1 text-sm text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...register("contactMethod")}
                        type="radio"
                        value="phone"
                        className="text-[var(--color-brand-blue)]"
                      />
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        {...register("contactMethod")}
                        type="radio"
                        value="email"
                        className="text-[var(--color-brand-blue)]"
                      />
                      <span>Email Message</span>
                    </label>
                  </div>
                </div>

                {/* Additional Notes / Scenario */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Scenario Details (Optional)
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder="Tell us about the property, loan amount, timeline, or specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-brand-blue)] focus:ring-1 focus:ring-[var(--color-brand-blue)] text-sm resize-none shadow-2xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl disabled:opacity-60"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Consultation Request"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
