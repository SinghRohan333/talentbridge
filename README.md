<div align="center">

# 🌉 TalentBridge

### AI-powered job board connecting the right people with the right roles

Search, apply, and get matched — without the noise.

<p>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p>
  <a href="https://talentbridge-wheat.vercel.app"><strong>🚀 Live Demo</strong></a>
  ·
  <a href="https://github.com/SinghRohan333/talentbridge/issues"><strong>🐛 Report Bug</strong></a>
  ·
  <a href="https://github.com/SinghRohan333/talentbridge/issues"><strong>✨ Request Feature</strong></a>
</p>

<img src="https://api.microlink.io/?url=https%3A%2F%2Ftalentbridge-wheat.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000" alt="TalentBridge homepage preview" width="100%" />

</div>

<br />

## 📖 About

**TalentBridge** is a full-featured job board frontend built with the Next.js App Router. It pairs the fundamentals job seekers and employers actually need — search, filters, one-click applications, verified employer accounts — with AI-driven matching that gets more relevant the more you use it.

The app ships with three distinct experiences out of the box:

- **Job seekers** browse and filter listings, apply in a few clicks, track applications, save jobs for later, and get AI-curated recommendations.
- **Employers** post and manage job listings, review applicants, and track hiring activity from a dedicated dashboard.
- **Admins** moderate job listings and manage platform users from an internal admin console.

This repository contains the **frontend only** — a Next.js/TypeScript client that talks to a separate backend API over REST (JWT auth with refresh tokens + Google OAuth).

<br />

## ✨ Features

### For Job Seekers
- 🔍 Searchable, filterable job listings (category, location type, job type, and more)
- ⚡ One-click applications with cover letter support
- 📌 Save jobs to revisit later
- 🎯 AI-powered job recommendations based on activity
- 📊 Personal dashboard with real-time application status tracking
- 📄 Resume upload via drag-and-drop
- 💬 Conversational career chat assistant to search and ask questions in plain language

### For Employers
- 🏢 Company profile management
- 📝 Post, edit, and manage job listings
- 👥 Review and manage applicants per listing
- 📈 Employer dashboard with hiring analytics and charts

### For Admins
- 🛡️ Job moderation queue
- 👤 User management console
- 📊 Platform-wide analytics dashboard

### Platform-wide
- 🔐 Secure authentication with JWT access/refresh tokens and Google OAuth
- 💵 Transparent, upfront salary ranges on every listing
- ✅ Verified employer accounts
- 🌗 Fully responsive, accessible UI built with reusable components

<br />

## 🛠️ Built With

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Data Fetching / Cache | [TanStack Query](https://tanstack.com/query) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Forms & Validation | [React Hook Form](https://react-hook-form.com/) + Hookform Resolvers |
| Auth | [@react-oauth/google](https://github.com/MomenSherif/react-oauth) (Google OAuth) |
| Charts | [Recharts](https://recharts.org/) |
| File Uploads | [React Dropzone](https://react-dropzone.js.org/) |
| Notifications | [React Hot Toast](https://react-hot-toast.com/) |
| Icons | [Lucide React](https://lucide.dev/) · [React Icons](https://react-icons.github.io/react-icons/) |
| Deployment | [Vercel](https://vercel.com/) |

<br />

## 📸 Screenshots

<div align="center">

**Homepage**
<img src="https://api.microlink.io/?url=https%3A%2F%2Ftalentbridge-wheat.vercel.app&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000" width="100%" alt="Homepage" />

**Job Listings**
<img src="https://api.microlink.io/?url=https%3A%2F%2Ftalentbridge-wheat.vercel.app%2Fjobs&screenshot=true&meta=false&embed=screenshot.url&waitForTimeout=2000" width="100%" alt="Job listings page" />

</div>

> 💡 The screenshots above are generated live from the deployed app on every README render. Swap them out for static images in `/public` if you'd rather have full control over what's shown.

<br />

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- A running instance of the TalentBridge backend API (this repo is frontend-only)

### Installation

```bash
# Clone the repository
git clone https://github.com/SinghRohan333/talentbridge.git
cd talentbridge

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Set this to the base URL of your backend API instance.

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

<br />

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

<br />

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # Login / register routes
│   └── (main)/           # Jobs, dashboards, profile, admin, etc.
├── components/           # Feature-organized React components
│   ├── admin/  applications/  auth/  chat/
│   ├── dashboard/  home/  jobs/  profile/
│   └── ui/                # Shared, reusable UI primitives
├── hooks/                # Custom React Query hooks
├── lib/                  # API client, utils, validation schemas
├── providers/            # Auth & Query context providers
└── types/                # Shared TypeScript types
```

<br />

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br />

## 📄 License

No license has been added to this repository yet, so it's proprietary/all-rights-reserved by default. If you'd like others to freely use or contribute to this code, consider adding a [LICENSE](https://choosealicense.com/) file (MIT is a common choice for portfolio projects).

<br />

## 📬 Contact

**Rohan Singh** — [@SinghRohan333](https://github.com/SinghRohan333)

Project Link: [github.com/SinghRohan333/talentbridge](https://github.com/SinghRohan333/talentbridge)

Live App: [talentbridge-wheat.vercel.app](https://talentbridge-wheat.vercel.app)

<br />

<div align="center">

If this project helped you, consider giving it a ⭐️!

</div>
