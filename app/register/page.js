"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EVENTS, SITE_CONFIG } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const STEPS = ["details", "payment", "success"];

export default function RegisterPage() {
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
        color: "#7c3aed",
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
    <div className="pt-20">
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)]" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Register"
            title="Join LITUMUN 2026"
            description="Secure your spot at Central India's premier MUN conference."
          />

          {/* Progress */}
          <div className="flex items-center justify-center mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    STEPS.indexOf(step) >= i
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                      : "bg-white/5 text-gray-600"
                  }`}
                >
                  {STEPS.indexOf(step) > i ? "✓" : i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 transition-all ${
                    STEPS.indexOf(step) > i ? "bg-violet-500" : "bg-white/10"
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
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="bg-gray-900/60 border border-white/5 rounded-2xl p-6 sm:p-8 space-y-5">
                  <h3 className="text-lg font-bold text-white mb-2">Personal Details</h3>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 bg-white/5 border ${fieldErrors.name ? "border-red-500/50" : "border-white/10"} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all`}
                    />
                    {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 bg-white/5 border ${fieldErrors.email ? "border-red-500/50" : "border-white/10"} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all`}
                    />
                    {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full px-4 py-3 bg-white/5 border ${fieldErrors.phone ? "border-red-500/50" : "border-white/10"} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all`}
                    />
                    {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
                  </div>

                  {/* College */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">College / University *</label>
                    <input
                      type="text"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      placeholder="Your college name"
                      className={`w-full px-4 py-3 bg-white/5 border ${fieldErrors.college ? "border-red-500/50" : "border-white/10"} rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all`}
                    />
                    {fieldErrors.college && <p className="text-red-400 text-xs mt-1">{fieldErrors.college}</p>}
                  </div>

                  {/* Event Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Select Event *</label>
                    <select
                      name="eventId"
                      value={form.eventId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/5 border ${fieldErrors.eventId ? "border-red-500/50" : "border-white/10"} rounded-xl text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-gray-900">Choose an event</option>
                      {EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id} className="bg-gray-900">
                          {evt.name} — {evt.fee > 0 ? formatCurrency(evt.fee) : "Free"}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.eventId && <p className="text-red-400 text-xs mt-1">{fieldErrors.eventId}</p>}
                  </div>

                  {/* Selected event summary */}
                  {selectedEvent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-violet-500/5 border border-violet-500/10 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold">{selectedEvent.name}</p>
                          <p className="text-gray-400 text-sm">{selectedEvent.shortName} • {selectedEvent.difficulty}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
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
                    className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm"
                  >
                    {error}
                    {registrationData && (
                      <button
                        type="button"
                        onClick={retryPayment}
                        className="ml-2 text-red-300 underline hover:text-red-200"
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
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl text-base font-bold text-white shadow-2xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : selectedEvent && selectedEvent.fee > 0 ? (
                    `Proceed to Pay ${formatCurrency(selectedEvent.fee)}`
                  ) : (
                    "Register Now"
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
                <LoadingSpinner size="lg" text="Waiting for payment..." />
                <p className="text-gray-500 text-sm mt-4">Razorpay payment window should open. Please complete the payment.</p>
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === "success" && registrationData && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-gray-900/60 border border-emerald-500/20 rounded-2xl p-8 sm:p-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
                  >
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </motion.div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Registration Successful! 🎉</h2>
                  <p className="text-gray-400 mb-8">You&apos;re all set for LITUMUN 2026!</p>

                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-6 mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your Registration ID</p>
                    <p className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent tracking-widest">
                      {registrationData.registrationId}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-gray-400">
                    <p><span className="text-gray-500">Event:</span> <span className="text-white">{registrationData.eventName}</span></p>
                    <p><span className="text-gray-500">Amount:</span> <span className="text-white">{formatCurrency(registrationData.amount)}</span></p>
                  </div>

                  <p className="text-gray-500 text-xs mt-6">
                    A confirmation email has been sent to your registered email address. Please save your Registration ID for reference.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
