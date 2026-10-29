"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Phone, Mail, CheckCircle2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const consultationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  financeType: z.string().min(1, "Please select a finance category"),
  contactMethod: z.enum(["phone", "email"]),
  message: z.string().optional(),
  agreePrivacy: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

const financeOptions = [
  { value: "home-loan", label: "Home Loans" },
  { value: "car-loan", label: "Car Loans" },
  { value: "personal-loan", label: "Personal Loans" },
  { value: "business-finance", label: "Business Finance" },
  { value: "refinance", label: "Refinancing & Equity Release" },
  { value: "commercial-property", label: "Commercial Property Loans" },
  { value: "smsf", label: "SMSF Property Lending" },
];

export function ConsultationSection() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
      financeType: "",
      contactMethod: "phone",
      message: "",
      agreePrivacy: true,
    },
  });

  const selectedMethod = watch("contactMethod");

  const onSubmit = async (values: ConsultationFormValues) => {
    void values;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    reset();
  };

  return (
    <Section id="consultation" background="navy" spacing="none" className="py-20 lg:py-28">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Dark Blue Editorial */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-200">
              START A CONVERSATION
            </span>

            <h2
              style={{ color: "#ffffff" }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight !text-white leading-[1.15]"
            >
              Let&apos;s Find a Way Forward.
            </h2>

            <p className="text-base text-blue-100/90 leading-relaxed max-w-md">
              Tell us what you&apos;re planning, and start a conversation about your finance options. We&apos;ll be in touch promptly to discuss next steps.
            </p>

            {/* Direct Contact Blocks */}
            <div className="flex flex-col gap-5 pt-2">
              <a
                href="tel:+61280000000"
                className="flex items-start gap-3.5 group text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 group-hover:bg-white group-hover:text-[#103B78] transition-colors shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-blue-200 font-medium">Call Directly</span>
                  <span className="text-base font-bold text-white tracking-tight">
                    +61 (02) 8000 0000
                  </span>
                </div>
              </a>

              <a
                href="mailto:advisory@talukdarfinance.com.au"
                className="flex items-start gap-3.5 group text-left"
              >
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-blue-200 group-hover:bg-white group-hover:text-[#103B78] transition-colors shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-blue-200 font-medium">Email Advisory</span>
                  <span className="text-base font-bold text-white tracking-tight break-all">
                    advisory@talukdarfinance.com.au
                  </span>
                </div>
              </a>
            </div>

            {/* Micro Checklist */}
            <div className="flex flex-col gap-2.5 pt-4 text-xs sm:text-sm text-blue-100/85">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                <span>No obligation consultation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                <span>Discreet and confidential handling of all information</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                <span>Fully licensed Australian Credit Representative</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean White Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white text-[#172B4D] p-8 sm:p-10 lg:p-12 shadow-2xl">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#103B78] tracking-tight mb-2">
                  Request a Consultation
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Fill in your details below and a qualified specialist will reach out within one business day.
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl bg-blue-50 border border-blue-200 p-8 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="h-12 w-12 text-[#246BFD]" />
                  <h4 className="text-xl font-bold text-[#103B78]">
                    Thank You for Reaching Out
                  </h4>
                  <p className="text-sm text-[#64748B] max-w-md">
                    Your inquiry has been received. A Talukdar Finance credit specialist will review your details and contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-3 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-[#103B78] hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-[#172B4D]">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        placeholder="e.g. Liam Smith"
                        {...register("fullName")}
                        className="w-full h-11 px-3.5 rounded-lg bg-[#F3F7FC] border border-slate-200/80 text-sm text-[#172B4D] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#246BFD] transition-all"
                      />
                      {errors.fullName && (
                        <p className="text-[11px] font-medium text-red-500">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-[#172B4D]">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="name@example.com.au"
                        {...register("email")}
                        className="w-full h-11 px-3.5 rounded-lg bg-[#F3F7FC] border border-slate-200/80 text-sm text-[#172B4D] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#246BFD] transition-all"
                      />
                      {errors.email && (
                        <p className="text-[11px] font-medium text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Finance Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-[#172B4D]">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="0400 000 000"
                        {...register("phone")}
                        className="w-full h-11 px-3.5 rounded-lg bg-[#F3F7FC] border border-slate-200/80 text-sm text-[#172B4D] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#246BFD] transition-all"
                      />
                      {errors.phone && (
                        <p className="text-[11px] font-medium text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="financeType" className="text-xs font-semibold text-[#172B4D]">
                        Finance Type *
                      </label>
                      <select
                        id="financeType"
                        defaultValue=""
                        {...register("financeType")}
                        className="w-full h-11 px-3.5 rounded-lg bg-[#F3F7FC] border border-slate-200/80 text-sm text-[#172B4D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#246BFD] transition-all cursor-pointer"
                      >
                        <option value="" disabled hidden>
                          Select finance category
                        </option>
                        {financeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.financeType && (
                        <p className="text-[11px] font-medium text-red-500">
                          {errors.financeType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-2 pt-1">
                    <span className="text-xs font-semibold text-[#172B4D]">
                      Preferred Contact Method
                    </span>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-sm text-[#172B4D] cursor-pointer">
                        <input
                          type="radio"
                          value="phone"
                          checked={selectedMethod === "phone"}
                          onChange={() => setValue("contactMethod", "phone")}
                          className="h-4 w-4 text-[#246BFD] focus:ring-[#246BFD]"
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#172B4D] cursor-pointer">
                        <input
                          type="radio"
                          value="email"
                          checked={selectedMethod === "email"}
                          onChange={() => setValue("contactMethod", "email")}
                          className="h-4 w-4 text-[#246BFD] focus:ring-[#246BFD]"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  {/* How Can We Help (Optional Textarea) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-[#172B4D]">
                      How can we help? (Optional)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Share a quick note about what you're hoping to achieve..."
                      {...register("message")}
                      className="w-full p-3.5 rounded-lg bg-[#F3F7FC] border border-slate-200/80 text-sm text-[#172B4D] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#246BFD] transition-all resize-y"
                    />
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex flex-col gap-1 pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("agreePrivacy")}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#246BFD] focus:ring-[#246BFD]"
                      />
                      <span className="text-xs text-[#64748B] leading-relaxed">
                        I agree to the collection and handling of my information in accordance with the Talukdar Finance Privacy Policy.
                      </span>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="text-[11px] font-medium text-red-500">
                        {errors.agreePrivacy.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button with Arrow Indicator */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-xl bg-[#246BFD] hover:bg-[#1A54D4] active:scale-[0.99] text-white font-semibold text-sm tracking-wide shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <span>Request a Consultation</span>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
