"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  User,
  Dumbbell,
  Leaf,
  Target,
  Apple,
  Sparkles,
  Award,
  Calendar,
  Check,
  Star,
  MapPin,
  Phone,
  Mail,
  Loader2,
  CheckCircle,
  Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import TestimonialSlider from "@/components/TestimonialSlider";
import FreeTrialForm from "@/components/FreeTrialForm";
import {
  STATS,
  PROGRAMS,
  TRAINERS,
  FAQS,
  GALLERY_IMAGES,
  CONTACT_INFO,
  SITE_TAGLINE,
} from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  User,
  Dumbbell,
  Leaf,
  Target,
  Apple,
  Sparkles,
};

// FAQ Component
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-neutral-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-medium text-neutral-900 pr-4 group-hover:text-emerald-600 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-emerald-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-neutral-500 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Contact Form Component
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [state, setState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
    errors: Record<string, string>;
  }>({
    status: "idle",
    message: "",
    errors: {},
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState({ status: "loading", message: "", errors: {} });

    try {
      const res = await fetch("/api/contact", {
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
      setForm({ name: "", email: "", phone: "", message: "" });
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10"
      >
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-neutral-900 mb-2">
          Message Sent
        </h3>
        <p className="text-neutral-500">
          Thank you for reaching out. We&apos;ll respond within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-3 bg-neutral-50 border rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              state.errors.name ? "border-red-400" : "border-neutral-200"
            }`}
          />
          {state.errors.name && (
            <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-3 bg-neutral-50 border rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
              state.errors.email ? "border-red-400" : "border-neutral-200"
            }`}
          />
          {state.errors.email && (
            <p className="text-red-500 text-xs mt-1">{state.errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={`w-full px-4 py-3 bg-neutral-50 border rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
            state.errors.phone ? "border-red-400" : "border-neutral-200"
          }`}
        />
        {state.errors.phone && (
          <p className="text-red-500 text-xs mt-1">{state.errors.phone}</p>
        )}
      </div>
      <div>
        <textarea
          rows={4}
          placeholder="Your message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`w-full px-4 py-3 bg-neutral-50 border rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none ${
            state.errors.message ? "border-red-400" : "border-neutral-200"
          }`}
        />
        {state.errors.message && (
          <p className="text-red-500 text-xs mt-1">{state.errors.message}</p>
        )}
      </div>

      {state.status === "error" && !Object.keys(state.errors).length && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="w-full py-3 bg-gradient-emerald text-white rounded-lg font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {state.status === "loading" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

// Pricing Toggle Component
function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const monthlyFeatures = [
    "Unlimited gym access",
    "All group classes",
    "Locker & towel service",
    "Member lounge access",
    "Wellness consultation",
    "Mobile app access",
  ];

  const yearlyFeatures = [
    ...monthlyFeatures,
    "24/7 premium access",
    "4 PT sessions/month",
    "Spa credits (₹5,000)",
    "Priority booking",
    "Guest passes (6/year)",
    "Exclusive events",
  ];

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span
          className={`text-sm font-medium transition-colors ${
            !isYearly ? "text-neutral-900" : "text-neutral-400"
          }`}
        >
          Monthly
        </span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className={`relative w-14 h-7 rounded-full transition-colors ${
            isYearly ? "bg-emerald-500" : "bg-neutral-300"
          }`}
          aria-label="Toggle pricing"
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md"
            animate={{ x: isYearly ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            isYearly ? "text-neutral-900" : "text-neutral-400"
          }`}
        >
          Yearly
        </span>
        {isYearly && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
          >
            Save ₹9,989
          </motion.span>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly */}
        <AnimatedSection delay={0}>
          <div
            className={`luxury-card rounded-2xl p-8 transition-all h-full ${
              !isYearly ? "ring-2 ring-emerald-500" : ""
            }`}
          >
            <div className="mb-6">
              <h3 className="text-xl font-medium text-neutral-900 mb-1">
                Monthly
              </h3>
              <p className="text-neutral-500 text-sm">
                Flexible month-to-month
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-neutral-900">
                  ₹4,999
                </span>
                <span className="text-neutral-400">/month</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {monthlyFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-neutral-600"
                >
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#trial"
              className={`block text-center py-3 rounded-xl font-medium transition-all ${
                !isYearly
                  ? "bg-gradient-emerald text-white hover:shadow-lg hover:shadow-emerald-500/25"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Start Free Trial
            </a>
          </div>
        </AnimatedSection>

        {/* Yearly */}
        <AnimatedSection delay={0.1}>
          <div
            className={`luxury-card rounded-2xl p-8 transition-all relative h-full ${
              isYearly ? "ring-2 ring-emerald-500" : ""
            }`}
          >
            <div className="absolute -top-3 right-6">
              <span className="px-3 py-1 bg-gradient-emerald text-white rounded-full text-xs font-medium">
                Best Value
              </span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-medium text-neutral-900 mb-1">
                Yearly
              </h3>
              <p className="text-neutral-500 text-sm">Premium annual access</p>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-light text-neutral-900">
                  ₹49,999
                </span>
                <span className="text-neutral-400">/year</span>
              </div>
              <p className="text-sm text-emerald-600 mt-1">
                ₹4,167/month effective
              </p>
            </div>
            <ul className="space-y-3 mb-8">
              {yearlyFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-neutral-600"
                >
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#trial"
              className={`block text-center py-3 rounded-xl font-medium transition-all ${
                isYearly
                  ? "bg-gradient-emerald text-white hover:shadow-lg hover:shadow-emerald-500/25"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              Start Free Trial
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-20"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000"
            alt="Luxury fitness studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/70" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-6">
                Delhi&apos;s Most Exclusive Fitness Club
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-neutral-900 leading-[1.1] mb-6">
                {SITE_TAGLINE.split(" ").map((word, i) =>
                  word === "Excellence" || word === "Elegance" ? (
                    <span key={i} className="text-gradient-emerald font-normal">
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={i}>{word} </span>
                  )
                )}
              </h1>
              <p className="text-lg text-neutral-600 mb-8 max-w-lg leading-relaxed">
                Experience fitness redefined at Apex Elite. World-class
                facilities, elite trainers, and bespoke wellness programs
                tailored to your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#trial"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-emerald text-white rounded-full font-medium text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
                >
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-neutral-200 text-neutral-700 rounded-full font-medium text-lg hover:bg-neutral-50 transition-all"
                >
                  Discover More
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neutral-400"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <Counter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/36833355/pexels-photo-36833355.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=640"
                    alt="Apex Elite studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 luxury-card rounded-2xl p-6 max-w-[200px]">
                  <div className="text-3xl font-light text-emerald-500 mb-1">
                    12+
                  </div>
                  <div className="text-sm text-neutral-500">
                    Years of Excellence
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Our Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">
                Redefining Luxury Fitness in Delhi
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Founded in 2012, Apex Elite has grown to become Delhi&apos;s
                most prestigious fitness destination. We believe that true
                wellness is a harmony of physical excellence, mental clarity,
                and spiritual balance.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-8">
                Our 50,000 sq ft facility houses state-of-the-art equipment,
                dedicated studios for yoga and Pilates, a recovery spa, and a
                members-only lounge. Every detail is curated to provide an
                unparalleled experience.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Premium Equipment", "Elite Trainers", "Spa & Recovery"].map(
                  (item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-700"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="section-padding bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Programs"
            title="Tailored Excellence"
            subtitle="Discover our comprehensive range of programs designed to elevate every aspect of your wellness journey"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((program, i) => {
              const Icon = iconMap[program.icon] || Sparkles;
              return (
                <AnimatedSection key={program.title} delay={i * 0.1}>
                  <div className="luxury-card rounded-2xl p-8 h-full group hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                      <Icon className="w-7 h-7 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-medium text-neutral-900 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-neutral-500 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section id="trainers" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Team"
            title="Elite Trainers"
            subtitle="Meet the industry's finest professionals dedicated to your transformation"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer, i) => (
              <AnimatedSection key={trainer.name} delay={i * 0.08}>
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <Award className="w-3 h-3" />
                        <span>{trainer.certifications}</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-medium text-neutral-900">
                    {trainer.name}
                  </h3>
                  <p className="text-emerald-600 text-sm mb-1">
                    {trainer.specialty}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-neutral-400">
                    <Calendar className="w-3 h-3" />
                    <span>{trainer.experience}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Our Facility
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-white">
                Experience Luxury
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white text-sm font-medium">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Membership"
            title="Investment in Excellence"
            subtitle="Choose the membership that aligns with your fitness aspirations"
          />
          <PricingSection />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Testimonials"
            title="What Our Members Say"
            subtitle="Hear from those who have experienced the Apex Elite difference"
          />
          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know about joining Apex Elite"
          />

          <div className="luxury-card rounded-2xl p-8">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trial Form */}
      <section
        id="trial"
        className="section-padding bg-gradient-to-br from-emerald-600 to-emerald-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="right">
              <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Limited Offer
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6">
                Begin Your Transformation
              </h2>
              <p className="text-emerald-100 text-lg mb-8">
                Experience the full Apex Elite experience with our complimentary
                trial. Choose between 7 or 14 days of unlimited access.
              </p>
              <ul className="space-y-4">
                {[
                  "Full access to all facilities",
                  "Complimentary wellness consultation",
                  "One personal training session",
                  "Spa facility access",
                  "Member lounge privileges",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-white"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h3 className="text-xl font-medium text-neutral-900 mb-6">
                  Request Your Trial
                </h3>
                <FreeTrialForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection direction="right">
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium uppercase tracking-wider mb-4">
                Contact
              </span>
              <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-neutral-600 mb-8">
                Have questions? Our concierge team is here to assist you.
                Schedule a visit or reach out directly.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Location</p>
                    <p className="text-neutral-500 text-sm mt-0.5">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Phone</p>
                    <p className="text-neutral-500 text-sm mt-0.5">
                      {CONTACT_INFO.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Email</p>
                    <p className="text-neutral-500 text-sm mt-0.5">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="luxury-card rounded-2xl p-8">
                <h3 className="text-xl font-medium text-neutral-900 mb-6">
                  Send a Message
                </h3>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
