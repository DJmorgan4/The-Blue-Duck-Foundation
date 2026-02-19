// components/layout/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-lg sm:text-xl font-bold hover:text-slate-200 transition-colors flex-shrink-0"
          >
            The Blue Duck Foundation
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/conservation" className="hover:text-blue-400 transition-colors">
                Conservation
              </Link>
            </li>
            <li>
              <Link href="/scholarship" className="hover:text-amber-400 transition-colors">
                Scholarship
              </Link>
            </li>
            <li>
              <Link href="/membership" className="hover:text-teal-400 transition-colors">
                Membership
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-blue-400 transition-colors">
                Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-blue-400 transition-colors">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>

          {/* CTA Button */}
          <Link
            href="/contribute"
            className="hidden md:inline-flex bg-white text-slate-900 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Get Involved
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/conservation" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Conservation
              </Link>
              <Link href="/scholarship" className="block px-3 py-2 rounded-lg text-base font-medium text-amber-400 hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Scholarship
              </Link>
              <Link href="/membership" className="block px-3 py-2 rounded-lg text-base font-medium text-teal-400 hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Membership
              </Link>
              <Link href="/events" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
              <Link href="/news" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                News
              </Link>
              <Link href="/contact" className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-slate-800 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/contribute" className="block px-3 py-2 mt-2 rounded-lg text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 transition-colors text-center" onClick={() => setMobileMenuOpen(false)}>
                Get Involved
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
