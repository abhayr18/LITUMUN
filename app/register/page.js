"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EVENTS, SITE_CONFIG } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const STEPS = ["details", "payment", "success"];

function RegistrationFormContent() {
  const searchParams = useSearchParams();
  const preselectedEvent = searchParams.get("event");

  const [step, setStep] = useState("details");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationData, setRegistrationData] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    eventId: preselectedEvent || "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  const selectedEvent = EVENTS.find((e) => e.id === form.eventId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name || form.name.trim().length < 2) errors.name = "Name is required (min 2 chars)";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Valid email is required";
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone.replace(/[\s-+]/g, "").replace(/^91/, ""))) errors.phone = "Valid 10-digit phone number required";
    if (!form.college || form.college.trim().length < 3) errors.college = "College name is required";
    if (!form.eventId) errors.eventId = "Please select an event";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Register
      const regRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const regData = await regRes.json();

      if (!regRes.ok) {
        throw new Error(regData.message || Object.values(regData.errors || {}).join(", "));
      }

      setRegistrationData(regData);

      // If free event, skip payment
      if (selectedEvent && selectedEvent.fee === 0) {
        setStep("success");
        setLoading(false);
        return;
      }

      // Step 2: Create payment order
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regData.registrationId,
          amount: regData.amount,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      // Step 3: Open Razorpay
      setStep("payment");
      openRazorpay(orderData, regData.registrationId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpay = useCallback((orderData, registrationId) => {
    if (typeof window === "undefined" || !window.Razorpay) {
      setError("Payment gateway not loaded. Please refresh and try again.");
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: SITE_CONFIG.fullName,
      description: `Registration for ${selectedEvent?.name}`,
      order_id: orderData.orderId,
      handler: async function (response) {
        setLoading(true);
        try {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              registrationId,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyRes.ok) {
            throw new Error(verifyData.message || "Payment verification failed");
          }

          setStep("success");
        } catch (err) {
          setError(err.message);
          setStep("details");
        } finally {
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          setStep("details");
          setError("Payment was cancelled. You can try again.");
        },
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#D4AF37",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }, [form, selectedEvent]);

  const retryPayment = async () => {
    if (!registrationData) return;
    setLoading(true);
    setError("");

    try {
      const orderRes = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: registrationData.registrationId,
          amount: registrationData.amount,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message);

      setStep("payment");
      openRazorpay(orderData, registrationData.registrationId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-center mb-10">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border ${
                STEPS.indexOf(step) >= i
                  ? "bg-[#b8975a] border-[#b8975a] text-black font-bold"
                  : "bg-[#1c0e07]/60 border-[#b8975a]/15 text-[#fbf9f4]/45"
              }`}
            >
              {STEPS.indexOf(step) > i ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-all ${
                STEPS.indexOf(step) > i ? "bg-[#b8975a]" : "bg-[#b8975a]/15"
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* DETAILS FORM */}
        {step === "details" && (
          <motion.form
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="luxury-card rounded-3xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h3 className="text-lg font-serif-luxury font-bold text-[#fbf9f4] mb-2 border-b border-[#b8975a]/15 pb-3">Personal Details</h3>

              {/* Name */}
              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-[#1c0e07]/60 border ${fieldErrors.name ? "border-red-400" : "border-[#b8975a]/15"} rounded-xl text-[#fbf9f4] placeholder-gray-500 focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 transition-all font-poppins-clean font-light`}
                />
                {fieldErrors.name && <p className="text-red-400 text-xs mt-1 font-semibold">{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 bg-[#1c0e07]/60 border ${fieldErrors.email ? "border-red-400" : "border-[#b8975a]/15"} rounded-xl text-[#fbf9f4] placeholder-gray-500 focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 transition-all font-poppins-clean font-light`}
                />
                {fieldErrors.email && <p className="text-red-500 text-xs mt-1 font-semibold">{fieldErrors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 bg-[#1c0e07]/60 border ${fieldErrors.phone ? "border-red-400" : "border-[#b8975a]/15"} rounded-xl text-[#fbf9f4] placeholder-gray-500 focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 transition-all font-poppins-clean font-light`}
                />
                {fieldErrors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{fieldErrors.phone}</p>}
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-1.5">College / University *</label>
                <input
                  type="text"
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  placeholder="Your college name"
                  className={`w-full px-4 py-3 bg-[#1c0e07]/60 border ${fieldErrors.college ? "border-red-400" : "border-[#b8975a]/15"} rounded-xl text-[#fbf9f4] placeholder-gray-500 focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 transition-all font-poppins-clean font-light`}
                />
                {fieldErrors.college && <p className="text-red-500 text-xs mt-1 font-semibold">{fieldErrors.college}</p>}
              </div>

              {/* Event Selection */}
              <div>
                <label className="block text-xs font-poppins-clean font-bold uppercase tracking-widest text-[#fbf9f4]/70 mb-1.5">Select Committee / Event *</label>
                <div className="relative">
                  <select
                    name="eventId"
                    value={form.eventId}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-[#1c0e07]/60 border ${fieldErrors.eventId ? "border-red-400" : "border-[#b8975a]/15"} rounded-xl text-[#fbf9f4] focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/30 transition-all appearance-none cursor-pointer font-poppins-clean font-medium`}
                  >
                    <option value="" className="text-gray-500 bg-[#1c0e07]">Choose a committee</option>
                    {EVENTS.map((evt) => (
                      <option key={evt.id} value={evt.id} className="text-[#fbf9f4] bg-[#1c0e07]">
                        {evt.name} — {evt.fee > 0 ? formatCurrency(evt.fee) : "Free"}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#b8975a]">
                    ▼
                  </div>
                </div>
                {fieldErrors.eventId && <p className="text-red-500 text-xs mt-1 font-semibold">{fieldErrors.eventId}</p>}
              </div>

              {/* Selected event summary */}
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[#b8975a]/10 border border-[#b8975a]/20 rounded-xl p-4.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[#fbf9f4] font-serif-luxury font-bold text-sm">{selectedEvent.name}</p>
                      <p className="text-[#fbf9f4]/60 text-xs font-poppins-clean font-medium mt-0.5">{selectedEvent.shortName} • {selectedEvent.difficulty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-serif-luxury font-bold text-[#b8975a]">
                        {selectedEvent.fee > 0 ? formatCurrency(selectedEvent.fee) : "Free"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/30 border border-red-500/20 rounded-xl p-4 text-red-400 text-xs font-poppins-clean font-semibold"
              >
                {error}
                {registrationData && (
                  <button
                    type="button"
                    onClick={retryPayment}
                    className="ml-2 text-red-400 underline hover:text-red-300 font-bold"
                  >
                    Retry Payment
                  </button>
                )}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-xl text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 border border-[#b8975a]/20 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing...
                </span>
              ) : selectedEvent && selectedEvent.fee > 0 ? (
                `Proceed to Pay ${formatCurrency(selectedEvent.fee)}`
              ) : (
                "Complete Registration"
              )}
            </button>
          </motion.form>
        )}

        {/* PAYMENT STEP */}
        {step === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <LoadingSpinner size="lg" text="Redirecting to gateway..." />
            <p className="text-[#fbf9f4]/50 text-xs mt-4 font-poppins-clean">Please do not close or refresh this browser page.</p>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === "success" && registrationData && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="luxury-card rounded-3xl p-8 sm:p-12 shadow-lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#b8975a] to-[#d5be8f] flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#b8975a]/20 text-black"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fbf9f4] mb-2 leading-tight">Registration Confirmed</h2>
              <p className="text-[#fbf9f4]/75 font-poppins-clean font-light text-sm mb-8">Your delegate seat at LITUMUN 2026 has been allocated.</p>

              <div className="bg-[#b8975a]/10 border border-[#b8975a]/20 rounded-xl p-6 mb-6">
                <p className="text-[10px] text-[#b8975a] font-poppins-clean font-bold uppercase tracking-widest mb-1.5">Official Credentials ID</p>
                <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fbf9f4] tracking-wider">
                  {registrationData.registrationId}
                </p>
              </div>

              <div className="space-y-2 text-sm text-[#fbf9f4]/80 font-poppins-clean font-medium border-t border-[#b8975a]/15 pt-4 max-w-xs mx-auto">
                <p className="flex justify-between"><span className="text-[#fbf9f4]/50">Council:</span> <span className="text-[#fbf9f4] font-semibold text-right">{registrationData.eventName}</span></p>
                <p className="flex justify-between"><span className="text-[#fbf9f4]/50">Invoice Fee:</span> <span className="text-[#fbf9f4] font-semibold">{formatCurrency(registrationData.amount)}</span></p>
              </div>

              <p className="text-[#fbf9f4]/50 text-xs mt-8 leading-relaxed font-poppins-clean font-light max-w-sm mx-auto">
                A receipt copy has been sent to your inbox. Please present your Credentials ID during on-campus verify checks on August 16.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="pt-24 bg-transparent pb-20">
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,151,90,0.05),transparent_60%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Delegacy Seats"
            title="Join LITUMUN 2026"
            description="Submit details to confirm your delegate allocation at Laxminarayan Innovation Technological University's flagship MUN."
          />

          <Suspense fallback={
            <div className="text-center py-20">
              <LoadingSpinner size="lg" text="Loading registration form..." />
            </div>
          }>
            <RegistrationFormContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
