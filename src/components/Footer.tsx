import Link from "next/link";
import { Gem, MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-emerald rounded-xl flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">
                  Apex Elite
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 -mt-0.5">
                  Delhi
                </span>
              </div>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md mb-6">
              Delhi&apos;s most exclusive luxury fitness destination. Where
              excellence meets elegance, and every workout is a bespoke
              experience.
            </p>
            <div className="flex gap-3">
              {["IN", "FB", "TW", "YT"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-emerald-600 hover:text-white transition-colors text-xs font-bold"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-neutral-400">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-neutral-400">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-neutral-400">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-neutral-400">{CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Programs", "Trainers", "Pricing", "FAQ", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-neutral-400 hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
              <li>
                <Link
                  href="/admin/login"
                  className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Demo
            project.
          </p>
          <p className="text-xs text-neutral-600">
            Crafted with excellence in New Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}
