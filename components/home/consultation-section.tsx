"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { FormField } from "@/components/ui/form-field";
import { Phone, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const consultationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid Australian phone number"),
  financeType: z.string().min(1, "Please select a finance category"),
  contactMethod: z.enum(["phone", "email"]),
  message: z.string().optional(),
  agreePrivacy: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

const financeOptions = [
  { value: "home-loan", label: "Home Loan / First Home Buyer" },
  { value: "refinance", label: "Refinancing & Equity Release" },
  { value: "car-loan", label: "Car & Vehicle Finance" },
  { value: "personal-loan", label: "Personal Loan" },
  { value: "business-finance", label: "Commercial & Business Finance" },
  { value: "general-inquiry", label: "General Scenario Discussion" },
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
    // Simulated clean submission
    void values;
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    reset();
  };

  return (
    <Section id="consultation" background="soft" spacing="lg">
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-brand-navy)] leading-tight">
              Let&apos;s Find a Way Forward.
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-brand-text-muted)] leading-relaxed">
              Tell us what you&apos;re planning, and start a conversation about your finance options. We&apos;ll be in touch promptly to discuss next steps.
            </p>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-4 w-full pt-2">
              <a
                href="tel:+61280000000"
                className="rounded-2xl border border-[var(--color-brand-border)] bg-white p-5 flex items-center gap-4 hover:border-[var(--color-brand-blue)] transition-colors shadow-sm"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-brand-text-muted)] uppercase tracking-wider">
                    Call Directly
                  </div>
                  <div className="text-base font-bold text-[var(--color-brand-navy)]">
                    +61 (02) 8000 0000
                  </div>
                </div>
              </a>

              <a
                href="mailto:advisory@talukdarfinance.com.au"
                className="rounded-2xl border border-[var(--color-brand-border)] bg-white p-5 flex items-center gap-4 hover:border-[var(--color-brand-blue)] transition-colors shadow-sm"
              >
                <div className="h-11 w-11 rounded-xl bg-[var(--color-brand-blue-subtle)] text-[var(--color-brand-blue)] flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-brand-text-muted)] uppercase tracking-wider">
                    Email Advisory
                  </div>
                  <div className="text-base font-bold text-[var(--color-brand-navy)] break-all">
                    advisory@talukdarfinance.com.au
                  </div>
                </div>
              </a>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-2.5 pt-4 border-t border-[var(--color-brand-border)] w-full text-xs sm:text-sm font-medium text-[var(--color-brand-text-muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-blue)] shrink-0" />
                <span>No obligation consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-blue)] shrink-0" />
                <span>Discreet and confidential handling of all information</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-brand-blue)] shrink-0" />
                <span>Fully licensed Australian Credit Representative</span>
              </div>
            </div>
          </div>

          {/* Right Column: Request Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-[var(--color-brand-border)] bg-white p-8 sm:p-10 shadow-xl">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-2">
                  Request a Consultation
                </h3>
                <p className="text-sm text-[var(--color-brand-text-muted)]">
                  Fill in your details below and a qualified specialist will reach out within one business day.
                </p>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center flex flex-col items-center gap-3">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  <h4 className="text-xl font-bold text-emerald-900">
                    Thank You for Reaching Out
                  </h4>
                  <p className="text-sm text-emerald-700 max-w-md">
                    Your inquiry has been received. A Talukdar Finance credit specialist will review your details and contact you shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Full Name"
                      htmlFor="fullName"
                      required
                      error={errors.fullName?.message}
                    >
                      <Input
                        id="fullName"
                        placeholder="e.g. Liam Smith"
                        hasError={!!errors.fullName}
                        {...register("fullName")}
                      />
                    </FormField>

                    <FormField
                      label="Email Address"
                      htmlFor="email"
                      required
                      error={errors.email?.message}
                    >
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com.au"
                        hasError={!!errors.email}
                        {...register("email")}
                      />
                    </FormField>
                  </div>

                  {/* Phone & Finance Type Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label="Phone Number"
                      htmlFor="phone"
                      required
                      error={errors.phone?.message}
                    >
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0400 000 000"
                        hasError={!!errors.phone}
                        {...register("phone")}
                      />
                    </FormField>

                    <FormField
                      label="Finance Type"
                      htmlFor="financeType"
                      required
                      error={errors.financeType?.message}
                    >
                      <Select
                        id="financeType"
                        placeholder="Select finance category"
                        options={financeOptions}
                        hasError={!!errors.financeType}
                        {...register("financeType")}
                      />
                    </FormField>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[var(--color-brand-navy)]">
                      Preferred Contact Method
                    </label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-sm text-[var(--color-brand-text)] cursor-pointer">
                        <input
                          type="radio"
                          value="phone"
                          checked={selectedMethod === "phone"}
                          onChange={() => setValue("contactMethod", "phone")}
                          className="h-4 w-4 text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                        />
                        <span>Phone Call</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[var(--color-brand-text)] cursor-pointer">
                        <input
                          type="radio"
                          value="email"
                          checked={selectedMethod === "email"}
                          onChange={() => setValue("contactMethod", "email")}
                          className="h-4 w-4 text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>

                  {/* Optional Message */}
                  <FormField
                    label="How can we help? (Optional)"
                    htmlFor="message"
                    error={errors.message?.message}
                  >
                    <Textarea
                      id="message"
                      rows={3}
                      placeholder="Share a quick note about what you're hoping to achieve..."
                      {...register("message")}
                    />
                  </FormField>

                  {/* Privacy Agreement Checkbox */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--color-brand-blue)] focus:ring-[var(--color-brand-blue)]"
                        {...register("agreePrivacy")}
                      />
                      <span className="text-xs text-[var(--color-brand-text-muted)] leading-relaxed">
                        I agree to the collection and handling of my information in accordance with the Talukdar Finance Privacy Policy.
                      </span>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="text-xs font-medium text-red-600">
                        {errors.agreePrivacy.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                    >
                      Request a Consultation
                    </Button>
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
