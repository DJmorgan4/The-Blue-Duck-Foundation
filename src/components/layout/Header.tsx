"use client";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/",             label: "Home" },
  { href: "/about",        label: "About" },
  { href: "/conservation", label: "Conservation" },
  { href: "/events",       label: "Events" },
  { href: "/news",         label: "News" },
  { href: "/contact",      label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">

          {/* Logo */}
          <Link
            href="/"
            className="font-['Cormorant_Garamond'] text-[16px] font-light tracking-[0.16em] uppercase text-white hover:text-slate-300 transition-colors flex-shrink-0 mr-8"
          >
            <span className="hidden xl:inline">The Blue Duck Foundation</span>
            <span className="xl:hidden">Blue Duck Foundation</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.1em] uppercase font-medium text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/support"
            className="hidden lg:inline-flex text-[11px] font-medium tracking-[0.12em] uppercase bg-white text-slate-900 px-5 py-2.5 hover:bg-slate-100 transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Support
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 py-4">
            <div className="flex flex-col gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[11px] tracking-[0.1em] uppercase font-medium text-slate-400 hover:text-white transition-colors py-3 border-b border-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/support"
                className="text-[11px] font-medium tracking-[0.12em] uppercase bg-white text-slate-900 px-5 py-3 hover:bg-slate-100 transition-colors text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
