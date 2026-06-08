# Apex Elite Delhi — Luxury Fitness Club

A production-ready, luxury single-page fitness website built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and PostgreSQL via Drizzle ORM.

![Apex Elite Delhi](https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=800)

## ✨ Features

- **Modern minimal design** with White + Emerald (#00C853) theme
- **Single Page Application** with smooth scroll navigation
- **Scroll reveal animations** with Framer Motion
- **Sticky navbar** with active section highlighting
- **8 elite trainers** showcase
- **Pricing toggle**: Monthly (₹4,999) / Yearly (₹49,999)
- **Trial selection dropdown**: Choose 7 or 14 days
- **Testimonial slider** with auto-play
- **Transformation gallery** with hover effects
- **FAQ accordion** with smooth animations
- **Contact form** with Zod validation
- **Admin Dashboard** with:
  - Conversion trend chart (mock)
  - Plan interest visualization
  - Trial & contact submissions table
- **SEO optimized** with luxury gym Delhi keywords
- **Mobile-first** responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Validation**: Zod
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Auth**: JWT (jose) + bcryptjs
- **Icons**: Lucide React

## 📋 Setup Instructions

### Prerequisites

- Node.js 18+
- PostgreSQL database

### 1. Clone & Install

```bash
git clone <repo-url>
cd apex-elite-delhi
npm install
```

### 2. Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
ADMIN_EMAIL=admin@apexelite.demo
ADMIN_PASSWORD=Demo@Elite49
JWT_SECRET=your-super-secret-key-here
```

### 3. Push Database Schema

```bash
npx drizzle-kit push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build for Production

```bash
npm run build
npm start
```

## 🔐 Admin Access

- **Login URL**: `/admin/login`
- **Email**: `admin@apexelite.demo`
- **Password**: `Demo@Elite49`

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx            # Single-page app with all sections
│   ├── admin/
│   │   ├── login/
│   │   └── dashboard/
│   ├── api/
│   │   ├── health/
│   │   ├── trial/          # With trial duration
│   │   ├── contact/
│   │   └── admin/
│   ├── layout.tsx
│   └── globals.css         # Luxury theme
├── components/
│   ├── Navbar.tsx          # Sticky with scroll spy
│   ├── Footer.tsx
│   ├── AnimatedSection.tsx
│   ├── Counter.tsx
│   ├── SectionHeading.tsx
│   ├── FreeTrialForm.tsx   # With duration dropdown
│   └── TestimonialSlider.tsx
├── db/
│   ├── index.ts
│   └── schema.ts           # With trialDays field
└── lib/
    ├── auth.ts
    ├── constants.ts        # 8 trainers, programs, etc.
    └── validation.ts       # Zod schemas
```

## 🚀 Vercel Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `DATABASE_URL` (use Vercel Postgres or external)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
4. Deploy!

## 📱 Demo Contact Info

- **Address**: 303 Fictional Wellness Street, Central Business District, New Delhi, 110000
- **Phone**: +91 92222 22222
- **Email**: hello@apexelite.demo

## 🎨 Design System

- **Primary**: Emerald (#00C853)
- **Background**: White (#FFFFFF)
- **Text**: Neutral-900 (#171717)
- **Accent**: Neutral-50 to Neutral-500
- **Cards**: Subtle shadows with luxury-card class
- **Typography**: Light font weights for elegance
- **Animations**: Subtle, minimal, luxurious feel

## 📄 Sections

1. **Hero** - Full-screen with gradient overlay
2. **Stats** - Animated counters (3,000+ Members, 30 Trainers, etc.)
3. **About** - Philosophy and facility overview
4. **Programs** - 6 wellness programs with icons
5. **Trainers** - 8 elite trainers grid
6. **Gallery** - 6 facility images
7. **Pricing** - Monthly/Yearly toggle
8. **Testimonials** - Slider with ratings
9. **FAQ** - Accordion with 6 questions
10. **Trial Form** - With 7/14 day selection
11. **Contact** - Form + contact info
12. **Footer** - Links and social

---

Crafted with excellence for Delhi's elite fitness community.
