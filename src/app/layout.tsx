import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Apex Elite Delhi – Luxury Fitness Club | Free Trial",
    template: "%s | Apex Elite Delhi",
  },
  description:
    "Delhi's most exclusive luxury fitness destination. World-class facilities, elite trainers, and bespoke wellness programs. Experience fitness redefined.",
  keywords: [
    "luxury gym Delhi",
    "premium fitness club Delhi",
    "best gym New Delhi",
    "elite fitness Delhi",
    "personal training Delhi",
    "wellness center Delhi",
    "high-end gym Delhi",
    "CBD Delhi gym",
    "Apex Elite Delhi",
    "fitness club trial Delhi",
  ],
  openGraph: {
    title: "Apex Elite Delhi – Where Excellence Meets Elegance",
    description:
      "Delhi's most exclusive luxury fitness destination. World-class facilities, elite trainers, and bespoke wellness programs.",
    type: "website",
    locale: "en_IN",
    siteName: "Apex Elite Delhi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
