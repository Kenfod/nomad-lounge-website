# 🏔️ Nomad Lounge Website

A modern, highly performant, full-stack luxury cabin reservation platform tailored for remote workers and travelers. Built with **Next.js 15 (App Router)**, **React**, and integrated securely with a **Supabase** backend database layer.

## 🚀 Core Features

### 🔐 Authentication & Security
- **NextAuth.js (v5 / Auth.js Integration):** Secure social authentication loops powered by Google OAuth provider.
- **Dynamic Profile Provisioning:** Automated database syncing triggers upon first login to check for or create missing guest database rows.
- **Server-Side Security Locks:** Bulletproof CRUD protection using server-side authorization checkpoints preventing cross-user data manipulation.

### 📅 Advanced Booking Mechanism
- **Optimized Date Selection Grid:** Dynamic side-by-side dual-month calendar display powered by custom-themed `react-day-picker`.
- **Intelligent Constraint Validation:** Automatic calendar exclusions for historic past dates, fully booked periods, and active system min/max length thresholds.
- **Live Pricing Analytics:** Real-time multi-night price calculation layers integrating active discount rates dynamically.

### ⚡ Cutting-Edge UX Design
- **Instantaneous Optimistic Mutations:** Powered by React's `useOptimistic` hook, allowing deletions to visually reflect instantly on the UI before the network loop completes.
- **Dynamic Form Pending States:** Integrated `useFormStatus` hooks paired with bespoke brand loaders (`SpinnerMini`) to control and freeze dual-form submissions seamlessly.
- **Custom Modals:** Native browser `confirm()` calls are replaced with bespoke, high-contrast Tailwind CSS danger modals built over a blurred glass layer.
- **Advanced Image Pipelines:** Seamless conversion to native `next/image` structural components reducing Cumulative Layout Shift (CLS) for profile pictures and storage bucket media files.

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router, Server Actions, Dynamic Data Streaming)
- **Database Backend:** Supabase (PostgreSQL hosting with specialized real-time data tables)
- **State Coordination:** React Context Engine (`ReservationContext`) & React Hooks (`useTransition`, `useOptimistic`)
- **Styling Architecture:** Tailwind CSS v3 with customized primary, accent, and secondary color palettes
- **Utility Libraries:** `date-fns` for time interval computations, `@heroicons/react` for visual assets

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have Node.js installed on your machine.

### 2. Clone and Setup Environment Variables
Clone the repository, enter the directory, and run the dependencies installation:
```bash
git clone https://github.com
cd nomad-lounge
npm install
```

Create a `.env.local` file in the root folder and configure the following parameters:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_secure_service_role_key

AUTH_SECRET=your_nextauth_base64_secret_string
AUTH_GOOGLE_ID=your_google_cloud_client_id
AUTH_GOOGLE_SECRET=your_google_cloud_client_secret

REST_COUNTRIES_API_KEY=your_countries_api_key
```

### 3. Run Development Server
Fire up the local pipeline engine to test the deployment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your local web browser to explore your application.

## 📦 Netlify Deployment Checklist

When deploying your version of the Nomad Lounge project to **Netlify**, verify the following parameters match your target settings:
1. Ensure the Netlify Next.js adapter plugin is initialized via `npm install -D @netlify/plugin-nextjs` and mapped in your `netlify.toml`.
2. Configure all environment variables matching your `.env.local` configuration inside the Netlify Dashboard.
3. Make sure to define `NEXTAUTH_URL` pointing directly to your live production Netlify domain link.
4. Update the **Authorized JavaScript Origins** and **Authorized Redirect URIs** rules inside the Google Cloud Console to match the live domain.
```text
https://netlify.app
```

