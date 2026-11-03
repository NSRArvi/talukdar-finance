"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Home, Car, DollarSign, Calendar, Percent, ShieldCheck, ArrowRight, Sparkles, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type CalculatorType = "mortgage" | "car";

export function LoanCalculatorTool() {
  const [calculatorType, setCalculatorType] = React.useState<CalculatorType>("mortgage");

  // Mortgage Inputs (Moneysmart standard)
  const [mortgageAmount, setMortgageAmount] = React.useState<number>(600000);
  const [mortgageRate, setMortgageRate] = React.useState<number>(5.99);
  const [mortgageTerm, setMortgageTerm] = React.useState<number>(30);
  const [mortgageFrequency, setMortgageFrequency] = React.useState<"monthly" | "fortnightly" | "weekly">("monthly");
  const [repaymentType, setRepaymentType] = React.useState<"PI" | "IO">("PI");
  const [extraRepayment, setExtraRepayment] = React.useState<number>(0);

  // Car Loan Inputs (Westpac benchmark standard with $0 deposit default)
  const [carAmount, setCarAmount] = React.useState<number>(35000);
  const [carDeposit, setCarDeposit] = React.useState<number>(0);
  const [carRate, setCarRate] = React.useState<number>(7.49);
  const [carTerm, setCarTerm] = React.useState<number>(5);
  const [carFrequency, setCarFrequency] = React.useState<"monthly" | "fortnightly" | "weekly">("monthly");
  const [carBalloonPercent, setCarBalloonPercent] = React.useState<number>(0);

  // Calculate Mortgage (Moneysmart formula)
  const mortgageResults = React.useMemo(() => {
    const P = mortgageAmount;
    const annualRate = mortgageRate / 100;
    const nYears = mortgageTerm;

    let periodsPerYear = 12;
    if (mortgageFrequency === "fortnightly") periodsPerYear = 26;
    if (mortgageFrequency === "weekly") periodsPerYear = 52;

    const r = annualRate / periodsPerYear;
    const N = nYears * periodsPerYear;

    let basePayment = 0;
    if (repaymentType === "IO") {
      basePayment = P * r;
    } else {
      if (r === 0) {
        basePayment = P / N;
      } else {
        basePayment = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
      }
    }

    const totalPeriodicPayment = basePayment + extraRepayment;
    const totalRepayments = totalPeriodicPayment * N;
    const totalInterest = Math.max(0, totalRepayments - P);

    // Estimate interest and time saved with extra repayments
    let interestSaved = 0;
    let timeSavedYears = 0;
    if (extraRepayment > 0 && repaymentType === "PI") {
      // Amortization simulation with extra payment
      let balance = P;
      let periods = 0;
      let totalInterestWithExtra = 0;

      while (balance > 0 && periods < N) {
        const interestPeriod = balance * r;
        totalInterestWithExtra += interestPeriod;
        const principalPeriod = totalPeriodicPayment - interestPeriod;
        balance -= principalPeriod;
        periods++;
      }

      interestSaved = Math.max(0, totalInterest - totalInterestWithExtra);
      timeSavedYears = Math.max(0, Number(((N - periods) / periodsPerYear).toFixed(1)));
    }

    return {
      periodicPayment: Math.round(totalPeriodicPayment),
      totalRepayments: Math.round(totalRepayments),
      totalInterest: Math.round(totalInterest),
      interestSaved: Math.round(interestSaved),
      timeSavedYears,
    };
  }, [mortgageAmount, mortgageRate, mortgageTerm, mortgageFrequency, repaymentType, extraRepayment]);

  // Calculate Car Loan (Westpac benchmark standard)
  const carResults = React.useMemo(() => {
    const borrowedAmount = Math.max(0, carAmount - carDeposit);
    const annualRate = carRate / 100;
    const nYears = carTerm;

    let periodsPerYear = 12;
    if (carFrequency === "fortnightly") periodsPerYear = 26;
    if (carFrequency === "weekly") periodsPerYear = 52;

    const r = annualRate / periodsPerYear;
    const N = nYears * periodsPerYear;
    const balloonValue = (carAmount * carBalloonPercent) / 100;

    let payment = 0;
    if (r === 0) {
      payment = (borrowedAmount - balloonValue) / N;
    } else {
      const pvBalloon = balloonValue / Math.pow(1 + r, N);
      const loanToAmortize = borrowedAmount - pvBalloon;
      payment = (loanToAmortize * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }

    const totalPeriodicPaid = payment * N;
    const totalAmountPayable = totalPeriodicPaid + balloonValue + carDeposit;
    const totalInterestPayable = Math.max(0, totalAmountPayable - carAmount);

    return {
      borrowedAmount,
      periodicPayment: Math.round(payment),
      totalAmountPayable: Math.round(totalAmountPayable),
      totalInterestPayable: Math.round(totalInterestPayable),
      balloonValue: Math.round(balloonValue),
    };
  }, [carAmount, carDeposit, carRate, carTerm, carFrequency, carBalloonPercent]);

  return (
    <section id="calculator-tool" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <Container size="default">
        {/* Toggle Bar: Mortgage vs Car Loan */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-12">
          {/* LMG Style Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-slate-300 bg-[#FBFBFA] text-xs font-semibold text-slate-800 tracking-wider mb-5">
            Select Calculator
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--color-brand-navy)] tracking-tight leading-[1.12] mb-6">
            Compare Your Numbers
          </h2>

          <div className="inline-flex p-1.5 rounded-full border border-slate-200 bg-[#FBFBFA] shadow-xs">
            <button
              type="button"
              onClick={() => setCalculatorType("mortgage")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calculatorType === "mortgage"
                  ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                  : "text-slate-700 hover:text-black"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home Mortgage Calculator</span>
            </button>
            <button
              type="button"
              onClick={() => setCalculatorType("car")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                calculatorType === "car"
                  ? "bg-[var(--color-brand-navy)] text-white shadow-sm"
                  : "text-slate-700 hover:text-black"
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Car Loan ($0 Deposit) Calculator</span>
            </button>
          </div>
        </div>

        {/* Dynamic Calculator Body */}
        {calculatorType === "mortgage" ? (
          /* MORTGAGE CALCULATOR (Moneysmart Model) */
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white">
            {/* Left Inputs Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-[#FBFBFA]">
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8">
                <div>
                  <h3 className="text-2xl font-black text-[var(--color-brand-navy)]">
                    Mortgage Repayments
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Modeled in accordance with Moneysmart.gov.au standards
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-50 text-[var(--color-brand-blue)] text-xs font-bold border border-blue-200">
                  30 Lenders Averaged
                </div>
              </div>

              <div className="flex flex-col gap-7">
                {/* Loan Amount Slider & Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Amount to Borrow
                    </label>
                    <span className="text-lg font-black text-[var(--color-brand-navy)]">
                      ${mortgageAmount.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={2500000}
                    step={10000}
                    value={mortgageAmount}
                    onChange={(e) => setMortgageAmount(Number(e.target.value))}
                    className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>$100,000</span>
                    <span>$1,250,000</span>
                    <span>$2,500,000</span>
                  </div>
                </div>

                {/* Interest Rate & Term Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Interest Rate (p.a.)
                      </label>
                      <span className="text-base font-bold text-[var(--color-brand-navy)]">
                        {mortgageRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3.5}
                      max={10.5}
                      step={0.05}
                      value={mortgageRate}
                      onChange={(e) => setMortgageRate(Number(e.target.value))}
                      className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>3.5%</span>
                      <span>6.0%</span>
                      <span>10.5%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Loan Term
                      </label>
                      <span className="text-base font-bold text-[var(--color-brand-navy)]">
                        {mortgageTerm} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={mortgageTerm}
                      onChange={(e) => setMortgageTerm(Number(e.target.value))}
                      className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>5 Years</span>
                      <span>20 Years</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Repayment Type & Frequency Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
                  {/* Repayment Type */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Repayment Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRepaymentType("PI")}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          repaymentType === "PI"
                            ? "bg-[var(--color-brand-navy)] text-white border-[var(--color-brand-navy)]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        Principal &amp; Interest
                      </button>
                      <button
                        type="button"
                        onClick={() => setRepaymentType("IO")}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          repaymentType === "IO"
                            ? "bg-[var(--color-brand-navy)] text-white border-[var(--color-brand-navy)]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        Interest Only
                      </button>
                    </div>
                  </div>

                  {/* Frequency */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Frequency
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["monthly", "fortnightly", "weekly"] as const).map((freq) => (
                        <button
                          key={freq}
                          type="button"
                          onClick={() => setMortgageFrequency(freq)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold capitalize border transition-colors cursor-pointer ${
                            mortgageFrequency === freq
                              ? "bg-[var(--color-brand-navy)] text-white border-[var(--color-brand-navy)]"
                              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Extra Repayments Simulator */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[var(--color-brand-blue)]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Extra Repayments ({mortgageFrequency})
                      </span>
                    </div>
                    <span className="text-sm font-black text-emerald-600">
                      +${extraRepayment.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={2000}
                    step={50}
                    value={extraRepayment}
                    onChange={(e) => setExtraRepayment(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    See how additional contributions reduce interest and shorten your term.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Summary Output Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Estimated Repayment ({mortgageFrequency})
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight">
                  ${mortgageResults.periodicPayment.toLocaleString()}
                  <span className="text-xs font-semibold text-slate-400 capitalize ml-1.5">
                    /{mortgageFrequency === "monthly" ? "mo" : mortgageFrequency === "fortnightly" ? "fn" : "wk"}
                  </span>
                </div>

                {/* Extra Repayments Highlight */}
                {extraRepayment > 0 && mortgageResults.interestSaved > 0 && (
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <TrendingDown className="w-4 h-4 text-emerald-600" />
                      <span>Extra Repayment Savings</span>
                    </div>
                    <div className="text-lg font-black text-emerald-700 mt-1">
                      Save ${mortgageResults.interestSaved.toLocaleString()} in interest
                    </div>
                    <div className="text-xs text-emerald-700 mt-0.5">
                      Pay off your loan {mortgageResults.timeSavedYears} years sooner!
                    </div>
                  </div>
                )}

                {/* Detailed Breakdown Card */}
                <div className="mt-8 flex flex-col gap-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Principal Borrowed</span>
                    <span className="font-bold text-[var(--color-brand-navy)]">
                      ${mortgageAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Total Interest Payable</span>
                    <span className="font-bold text-amber-600">
                      ${mortgageResults.totalInterest.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                    <span className="text-slate-800 font-bold">Total Amount Payable</span>
                    <span className="font-black text-lg text-[var(--color-brand-navy)]">
                      ${mortgageResults.totalRepayments.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Moneysmart ASIC Note */}
                <p className="text-[11px] text-slate-400 leading-relaxed mt-6">
                  Calculations are model estimates based on Moneysmart.gov.au algorithms. Actual repayments will vary depending on lender product terms and fees.
                </p>
              </div>

              {/* Consultation CTA */}
              <div className="pt-8 mt-8 border-t border-slate-100">
                <a
                  href="#consultation"
                  className="w-full py-4 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Lock in this scenario with a broker</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* CAR & ASSET LOAN CALCULATOR (Westpac Benchmark Model) */
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[32px] sm:rounded-[40px] border border-slate-200/90 overflow-hidden shadow-xl bg-white">
            {/* Left Inputs Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 bg-[#FBFBFA]">
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-black text-[var(--color-brand-navy)]">
                      Car &amp; Asset Finance
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[var(--color-brand-blue)] text-[11px] font-extrabold uppercase tracking-wide">
                      $0 Deposit Available
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Modeled around Westpac / Tier-1 vehicle lending criteria with zero down payment options
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Consumer &amp; Chattel Mortgage
                </div>
              </div>

              <div className="flex flex-col gap-7">
                {/* Vehicle Price & Deposit Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Vehicle Purchase Price */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Vehicle Price
                      </label>
                      <span className="text-base font-black text-[var(--color-brand-navy)]">
                        ${carAmount.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10000}
                      max={150000}
                      step={2500}
                      value={carAmount}
                      onChange={(e) => setCarAmount(Number(e.target.value))}
                      className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>$10,000</span>
                      <span>$75,000</span>
                      <span>$150,000</span>
                    </div>
                  </div>

                  {/* Cash Deposit / Trade-in */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Deposit / Trade-In
                        </label>
                        <button
                          type="button"
                          onClick={() => setCarDeposit(0)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                            carDeposit === 0
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}
                        >
                          $0 Deposit
                        </button>
                      </div>
                      <span className="text-base font-black text-emerald-600">
                        ${carDeposit.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={Math.min(50000, carAmount)}
                      step={1000}
                      value={carDeposit}
                      onChange={(e) => setCarDeposit(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>$0</span>
                      <span>$25,000</span>
                      <span>$50,000</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate & Term Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Interest Rate */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Interest Rate (Fixed p.a.)
                      </label>
                      <span className="text-base font-bold text-[var(--color-brand-navy)]">
                        {carRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5.49}
                      max={14.99}
                      step={0.1}
                      value={carRate}
                      onChange={(e) => setCarRate(Number(e.target.value))}
                      className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>5.49%</span>
                      <span>9.99%</span>
                      <span>14.99%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Loan Term
                      </label>
                      <span className="text-base font-bold text-[var(--color-brand-navy)]">
                        {carTerm} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={1}
                      value={carTerm}
                      onChange={(e) => setCarTerm(Number(e.target.value))}
                      className="w-full accent-[var(--color-brand-blue)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>1 Year</span>
                      <span>4 Years</span>
                      <span>7 Years</span>
                    </div>
                  </div>
                </div>

                {/* Balloon Payment Option (Commercial / Low Repayment) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Balloon Residual Payment ({carBalloonPercent}%)
                    </label>
                    <span className="text-sm font-bold text-[var(--color-brand-navy)]">
                      ${carResults.balloonValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={carBalloonPercent}
                    onChange={(e) => setCarBalloonPercent(Number(e.target.value))}
                    className="w-full accent-[var(--color-brand-navy)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>0% (Full Payout)</span>
                    <span>20%</span>
                    <span>40% (Max Residual)</span>
                  </div>
                </div>

                {/* Repayment Frequency */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                    Repayment Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["monthly", "fortnightly", "weekly"] as const).map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => setCarFrequency(freq)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold capitalize border transition-colors cursor-pointer ${
                          carFrequency === freq
                            ? "bg-[var(--color-brand-navy)] text-white border-[var(--color-brand-navy)]"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Output Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 bg-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Estimated Repayment ({carFrequency})
                </span>
                <div className="text-4xl sm:text-5xl font-black text-[var(--color-brand-navy)] tracking-tight">
                  ${carResults.periodicPayment.toLocaleString()}
                  <span className="text-xs font-semibold text-slate-400 capitalize ml-1.5">
                    /{carFrequency === "monthly" ? "mo" : carFrequency === "fortnightly" ? "fn" : "wk"}
                  </span>
                </div>

                {/* Detailed Breakdown Card */}
                <div className="mt-8 flex flex-col gap-4 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Vehicle Purchase Price</span>
                    <span className="font-bold text-[var(--color-brand-navy)]">
                      ${carAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Deposit / Trade-In</span>
                    <span className="font-bold text-emerald-600">
                      -${carDeposit.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Net Amount Borrowed</span>
                    <span className="font-bold text-[var(--color-brand-navy)]">
                      ${carResults.borrowedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">Total Interest Payable</span>
                    <span className="font-bold text-amber-600">
                      ${carResults.totalInterestPayable.toLocaleString()}
                    </span>
                  </div>

                  {carBalloonPercent > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 font-medium">Balloon Due at End of Term</span>
                      <span className="font-bold text-[var(--color-brand-navy)]">
                        ${carResults.balloonValue.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                    <span className="text-slate-800 font-bold">Total Cost of Vehicle</span>
                    <span className="font-black text-lg text-[var(--color-brand-navy)]">
                      ${carResults.totalAmountPayable.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mt-6">
                  Based on consumer car loan formulas matching Westpac Australian standards. No dealer markups.
                </p>
              </div>

              {/* Consultation CTA */}
              <div className="pt-8 mt-8 border-t border-slate-100">
                <a
                  href="#consultation"
                  className="w-full py-4 rounded-full bg-[var(--color-brand-navy)] hover:bg-[var(--color-brand-blue)] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Apply for 24-48h car pre-approval</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

