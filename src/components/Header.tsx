"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

/* ═══════════════════════════════════════════════════════════════════════════════
   HEADER/NAVBAR — Dharohar
   Sticky navigation with mobile sheet overlay
═══════════════════════════════════════════════════════════════════════════════ */

interface NavLink {
  href: string;
  label: string;
  section?: string;
}

interface HeaderProps {
  currentRoute?: string;
  onNavClick?: (route: string, label: string) => void;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore", section: "Discover" },
  { href: "/events", label: "Events", section: "Discover" },
  { href: "/stories", label: "Stories", section: "Learn" },
  { href: "/community", label: "Community", section: "Connect" },
];

export default function Header({ currentRoute = "/", onNavClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  // Close sheet on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSheetOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleNavClick = useCallback(
    (href: string, label: string) => {
      setIsSheetOpen(false);
      onNavClick?.(href, label);
    },
    [onNavClick]
  );

  const isActiveLink = (href: string) => {
    if (href === "/") return currentRoute === "/";
    return currentRoute.startsWith(href);
  };

  // Group links by section for mobile
  const groupedLinks = navLinks.reduce((acc, link) => {
    const section = link.section || "Main";
    if (!acc[section]) acc[section] = [];
    acc[section].push(link);
    return acc;
  }, {} as Record<string, NavLink[]>);

  return (
    <>
      <header
        className={`header ${isScrolled ? "header--scrolled" : ""}`}
        role="banner"
      >
        <div className="container-heritage">
          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link
              href="/"
              className="header__logo"
              onClick={() => handleNavClick("/", "Home")}
            >
              <div className="header__logo-mark">
                <svg
                  className="w-full h-full text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21h18M5 21v-7l8-5 8 5v7M6 10l6-3.5L18 10" />
                </svg>
              </div>
              <div className="header__logo-text">
                <span className="header__logo-brand">Dharohar</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="header__links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`header__link ${isActiveLink(link.href) ? "header__link--active" : ""}`}
                    onClick={() => handleNavClick(link.href, link.label)}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    <span className="header__link-underline" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Support Button (Desktop) */}
            <div className="header__actions">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="header__link">Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="header__support-btn">Sign Up</button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <Link
                href="/donate"
                className="header__support-btn"
                onClick={() => handleNavClick("/donate", "Support")}
              >
                <svg
                  className="header__support-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Support
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSheetOpen(true)}
              className="header__hamburger"
              aria-label="Open navigation menu"
              aria-expanded={isSheetOpen}
              aria-controls="mobile-sheet"
            >
              <span className="header__hamburger-line" />
              <span className="header__hamburger-line" />
              <span className="header__hamburger-line" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sheet Overlay */}
      <div
        id="mobile-sheet"
        className={`sheet ${isSheetOpen ? "sheet--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className="sheet__backdrop"
          onClick={() => setIsSheetOpen(false)}
          aria-hidden="true"
        />

        {/* Sheet Panel */}
        <div className="sheet__panel">
          {/* Sheet Header */}
          <div className="sheet__header">
            <div className="header__logo-text">
              <span className="header__logo-brand">Dharohar</span>
            </div>
            <button
              onClick={() => setIsSheetOpen(false)}
              className="sheet__close"
              aria-label="Close navigation menu"
            >
              <svg
                className="sheet__close-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sheet Navigation */}
          <nav className="sheet__nav">
            {/* Main Home Link */}
            <Link
              href="/"
              className={`sheet__link sheet__link--featured ${isActiveLink("/") ? "sheet__link--active" : ""}`}
              onClick={() => handleNavClick("/", "Home")}
              aria-current={isActiveLink("/") ? "page" : undefined}
            >
              <svg className="sheet__link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>

            {/* Grouped Sections */}
            {Object.entries(groupedLinks).map(([section, links]) => (
              section !== "Main" && (
                <div key={section} className="sheet__section">
                  <h3 className="sheet__section-title">{section}</h3>
                  <ul className="sheet__section-links">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`sheet__link ${isActiveLink(link.href) ? "sheet__link--active" : ""}`}
                          onClick={() => handleNavClick(link.href, link.label)}
                          aria-current={isActiveLink(link.href) ? "page" : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}

            {/* Support CTA */}
            <div className="sheet__cta">
              <div className="flex flex-col gap-4 mb-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="sheet__link w-full justify-center">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="sheet__support-btn">Sign Up</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <div className="flex justify-center py-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>

              <Link
                href="/donate"
                className="sheet__support-btn"
                onClick={() => handleNavClick("/donate", "Support")}
              >
                <svg
                  className="sheet__support-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Support Heritage Preservation
              </Link>
            </div>
          </nav>

          {/* Sheet Footer */}
          <div className="sheet__footer">
            <p className="sheet__footer-text">Preserving India&apos;s Cultural Legacy</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ═══════════════════════════════════════════════════════════════════════════════
           HEADER STYLES
        ═══════════════════════════════════════════════════════════════════════════════ */
        
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header--scrolled {
          background: rgba(255, 251, 245, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 
            0 1px 0 rgba(139, 58, 31, 0.08),
            0 4px 20px rgba(44, 36, 22, 0.08);
        }

        .header__nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        /* ─────────────────────────── Logo ─────────────────────────── */

        .header__logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .header__logo-mark {
          position: relative;
          width: 32px;
          height: 32px;
          color: #8B3A1F;
        }

        .header__logo-brand {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 24px;
          color: #8B3A1F; /* Primary text color */
          line-height: 1;
          letter-spacing: -0.02em;
        }

        /* Removed old logo styles */

        /* ─────────────────────────── Desktop Links ─────────────────────────── */

        .header__links {
          display: none;
          align-items: center;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        @media (min-width: 768px) {
          .header__links {
            display: flex;
          }
        }

        .header__link {
          position: relative;
          display: block;
          padding: 10px 0;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: #5A4D3B;
          text-decoration: none;
          transition: color 0.2s;
        }

        .header__link:hover {
          color: #8B3A1F;
        }

        .header__link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #8B3A1F;
          border-radius: 1px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header__link:hover .header__link-underline {
          width: 100%;
        }

        .header__link--active {
          color: #8B3A1F;
        }

        .header__link--active .header__link-underline {
          width: 100%;
          background: #8B3A1F;
        }

        /* ─────────────────────────── Support Button ─────────────────────────── */

        .header__actions {
          display: none;
          align-items: center;
        }

        @media (min-width: 768px) {
          .header__actions {
            display: flex;
          }
        }

        .header__support-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #8B3A1F 0%, #6B2A15 100%);
          color: white;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 14px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 
            0 2px 8px rgba(139, 58, 31, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header__support-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(139, 58, 31, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: white;
        }

        .header__support-icon {
          width: 16px;
          height: 16px;
        }

        /* ─────────────────────────── Hamburger ─────────────────────────── */

        .header__hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 48px;
          height: 48px;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 768px) {
          .header__hamburger {
            display: none;
          }
        }

        .header__hamburger-line {
          width: 22px;
          height: 2px;
          background: #5A4D3B;
          border-radius: 1px;
          transition: all 0.3s;
        }

        .header__hamburger:hover .header__hamburger-line {
          background: #8B3A1F;
        }

        /* ═══════════════════════════════════════════════════════════════════════════════
           SHEET (MOBILE OVERLAY)
        ═══════════════════════════════════════════════════════════════════════════════ */

        .sheet {
          position: fixed;
          inset: 0;
          z-index: 200;
          visibility: hidden;
          pointer-events: none;
        }

        .sheet--open {
          visibility: visible;
          pointer-events: auto;
        }

        .sheet__backdrop {
          position: absolute;
          inset: 0;
          background: rgba(44, 36, 22, 0.5);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .sheet--open .sheet__backdrop {
          opacity: 1;
        }

        .sheet__panel {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 360px;
          background: linear-gradient(180deg, #FFFBF5 0%, #FAF3E8 100%);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
          box-shadow: -10px 0 40px rgba(44, 36, 22, 0.15);
        }

        .sheet--open .sheet__panel {
          transform: translateX(0);
        }

        .sheet__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid rgba(139, 58, 31, 0.1);
        }

        .sheet__close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          padding: 0;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }

        .sheet__close:hover {
          background: rgba(139, 58, 31, 0.08);
        }

        .sheet__close-icon {
          width: 24px;
          height: 24px;
          color: #5A4D3B;
        }

        .sheet__nav {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .sheet__link {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 48px;
          padding: 12px 16px;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 16px;
          color: #5A4D3B;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
          -webkit-tap-highlight-color: transparent;
        }

        .sheet__link:hover,
        .sheet__link:focus {
          background: rgba(139, 58, 31, 0.06);
          color: #8B3A1F;
        }

        .sheet__link--active {
          color: #8B3A1F;
          background: rgba(139, 58, 31, 0.08);
          position: relative;
        }

        .sheet__link--active::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 24px;
          background: #8B3A1F;
          border-radius: 0 2px 2px 0;
        }

        .sheet__link--featured {
          font-size: 18px;
          font-weight: 600;
        }

        .sheet__link-icon {
          width: 20px;
          height: 20px;
        }

        .sheet__section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sheet__section-title {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 11px;
          color: #8B7D68;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0 16px;
          margin: 0;
        }

        .sheet__section-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .sheet__cta {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid rgba(139, 58, 31, 0.1);
        }

        .sheet__support-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 56px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #8B3A1F 0%, #6B2A15 100%);
          color: white;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 15px;
          border-radius: 16px;
          text-decoration: none;
          box-shadow: 
            0 4px 16px rgba(139, 58, 31, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
          -webkit-tap-highlight-color: transparent;
        }

        .sheet__support-btn:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 24px rgba(139, 58, 31, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: white;
        }

        .sheet__support-icon {
          width: 18px;
          height: 18px;
        }

        .sheet__footer {
          padding: 20px 24px;
          border-top: 1px solid rgba(139, 58, 31, 0.1);
          text-align: center;
        }

        .sheet__footer-text {
          font-family: var(--font-body);
          font-size: 12px;
          color: #8B7D68;
          margin: 0;
        }
      `}</style>
    </>
  );
}
