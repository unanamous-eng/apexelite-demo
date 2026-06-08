"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, User, Mail, Phone, Calendar } from "lucide-react";

interface FormState {
  status: "idle" | "loading" | "success" | "error";
  message: string;
  errors: Record<string, string>;
}

export default function FreeTrialForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trialDays: "",
  });
  const [state, setState] = useState<FormState>({
    status: "idle",
    message: "",
    errors: {},
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "", errors: {} });

    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        const fieldErrors: Record<string, string> = {};
        if (data.errors) {
          for (const err of data.errors) {
            fieldErrors[err.field] = err.message;
          }
        }
        setState({
          status: "error",
          message: data.message || "Something went wrong",
          errors: fieldErrors,
        });
        return;
      }

      setState({ status: "success", message: data.message, errors: {} });
      setForm({ name: "", email: "", phone: "", trialDays: "" });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
        errors: {},
      });
    }
  }

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="luxury-card rounded-2xl p-10 text-center"
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-light text-neutral-900 mb-3">
          Welcome to Apex Elite
        </h3>
        <p className="text-neutral-500">
          Your luxury fitness journey begins now. Our concierge team will
          contact you within 2 hours to schedule your first visit.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 bg-neutral-50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition ${
              state.errors.name ? "border-red-400" : "border-neutral-200"
            }`}
          />
        </div>
        {state.errors.name && (
          <p className="text-red-500 text-sm mt-1.5 ml-1">{state.errors.name}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 bg-neutral-50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition ${
              state.errors.email ? "border-red-400" : "border-neutral-200"
            }`}
          />
        </div>
        {state.errors.email && (
          <p className="text-red-500 text-sm mt-1.5 ml-1">{state.errors.email}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 bg-neutral-50 border rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition ${
              state.errors.phone ? "border-red-400" : "border-neutral-200"
            }`}
          />
        </div>
        {state.errors.phone && (
          <p className="text-red-500 text-sm mt-1.5 ml-1">{state.errors.phone}</p>
        )}
      </div>

      <div>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <select
            value={form.trialDays}
            onChange={(e) => setForm({ ...form, trialDays: e.target.value })}
            className={`w-full pl-12 pr-4 py-4 bg-neutral-50 border rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition appearance-none ${
              state.errors.trialDays ? "border-red-400" : "border-neutral-200"
            } ${!form.trialDays ? "text-neutral-400" : ""}`}
          >
            <option value="">Select Trial Duration</option>
            <option value="7">7-Day Trial</option>
            <option value="14">14-Day Trial</option>
          </select>
        </div>
        {state.errors.trialDays && (
          <p className="text-red-500 text-sm mt-1.5 ml-1">
            {state.errors.trialDays}
          </p>
        )}
      </div>

      {state.status === "error" && !Object.keys(state.errors).length && (
        <p className="text-red-500 text-sm text-center">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="w-full py-4 bg-gradient-emerald text-white rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {state.status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          "Begin Your Journey"
        )}
      </button>

      <p className="text-xs text-neutral-400 text-center">
        No credit card required · Full access included
      </p>
    </form>
  );
}
