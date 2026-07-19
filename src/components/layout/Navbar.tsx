"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const seekerLinks = [
    ...publicLinks,
    { href: "/dashboard", label: "Dashboard" },
    { href: "/saved-jobs", label: "Saved Jobs" },
    { href: "/applications", label: "My Applications" },
    { href: "/profile", label: "Profile" },
  ];

  const employerLinks = [
    ...publicLinks,
    { href: "/employer/dashboard", label: "Dashboard" },
    { href: "/jobs/post", label: "Post a Job" },
    { href: "/jobs/manage", label: "Manage Jobs" },
    { href: "/employer/company", label: "Company Profile" },
  ];

  const navLinks =
    user?.role === "seeker"
      ? seekerLinks
      : user?.role === "employer"
        ? employerLinks
        : publicLinks;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 font-display text-xl font-semibold text-ink"
          onClick={() => setIsOpen(false)}
        >
          Talent<span className="text-signal">Bridge</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap text-sm font-medium transition-colors hover:text-signal",
                pathname === link.href ? "text-signal" : "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <span className="whitespace-nowrap text-sm text-slate">
                Hi, {user.name.split(" ")[0]}
              </span>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="h-9 px-3 text-xs"
              >
                <LogOut className="h-3.5 w-3.5" /> Log out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink hover:text-signal"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-signal px-4 py-2 text-sm font-medium text-paper hover:bg-signal-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-line bg-paper px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium",
                  pathname === link.href
                    ? "bg-signal/10 text-signal"
                    : "text-ink hover:bg-line/30",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-line pt-3">
            {user ? (
              <>
                <p className="mb-2 px-1 text-sm text-slate">
                  Signed in as {user.name}
                </p>
                <Button variant="outline" fullWidth onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> Log out
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg border border-line px-3 py-2.5 text-center text-sm font-medium text-ink"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-signal px-3 py-2.5 text-center text-sm font-medium text-paper"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
