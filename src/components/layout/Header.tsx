"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/foundation", label: "Forever 44" },
  { href: "/conservation", label: "Conservation" },
  { href: "/discovery-lab", label: "Discovery Lab" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900 text-white">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-[68px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 font-['Cormorant_Garamond'] text-[16px] font-light uppercase tracking-[0.16em] text-white transition-colors hover:text-slate-300"
          >
            <span className="hidden xl:inline">
              The Blue Duck Foundation
            </span>
            <span className="xl:hidden">Blue Duck Foundation</span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.09em] text-slate-400 transition-colors hover:text-white xl:text-[11px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/donate"
            className="hidden flex-shrink-0 whitespace-nowrap bg-white px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-slate-100 lg:inline-flex"
          >
            Donate
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              outline: "none",
              WebkitAppearance: "none",
            }}
            className="p-2 text-slate-400 transition-colors hover:text-white lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-800 py-4 lg:hidden"
          >
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-slate-800 py-3 text-[11px] font-medium uppercase tracking-[0.1em] text-slate-400 transition-colors hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/donate"
                className="mt-4 bg-white px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
