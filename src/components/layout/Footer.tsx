import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const seekerLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/register", label: "Create Account" },
  { href: "/about", label: "About Us" },
];

const employerLinks = [
  { href: "/register", label: "Post a Job" },
  { href: "/jobs/manage", label: "Manage Jobs" },
  { href: "/contact", label: "Talk to Us" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/help", label: "Help & Support" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/"
              className="font-display text-lg font-semibold text-ink"
            >
              Talent<span className="text-signal">Bridge</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate">
              Connecting job seekers with the right opportunities, powered by AI
              matching.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="text-slate hover:text-signal"
              >
                <FaXTwitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-slate hover:text-signal"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="text-slate hover:text-signal"
              >
                <FaGithub className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Job Seekers</h3>
            <ul className="space-y-2">
              {seekerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Employers</h3>
            <ul className="space-y-2">
              {employerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate hover:text-signal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href="mailto:support@talentbridge.dev"
              className="mt-3 flex items-center gap-1.5 text-sm text-slate hover:text-signal"
            >
              <IoMdMail className="h-3.5 w-3.5" /> support@talentbridge.dev
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-center text-xs text-slate">
          © {new Date().getFullYear()} TalentBridge. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
