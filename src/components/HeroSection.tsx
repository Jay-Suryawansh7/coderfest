"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════════
   HERO SECTION — Heritage Pulse
   Immersive hero with parallax, animated title, and prominent CTAs
═══════════════════════════════════════════════════════════════════════════════ */

interface HeroSectionProps {
  onExploreClick?: () => void;
  onVirtualTourClick?: () => void;
}

export default function HeroSection({
  onExploreClick,
  onVirtualTourClick,
}: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // Fade-in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        if (window.scrollY < heroBottom) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <section ref={heroRef} className="hero">
      {/* Background Image with Overlay */}
      <div className="hero__background">
        <div
          className="hero__image"
          style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        />
        <div className="hero__overlay" />
        <div className="hero__architectural-pattern" />
      </div>

      {/* Content */}
      <div
        className={`hero__content ${isVisible ? "hero__content--visible" : ""}`}
        style={{ transform: `translateY(${-parallaxOffset * 0.15}px)` }}
      >
        <div className="container-heritage">
          {/* Badge */}
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            <span>Preserving 5000+ Years of Culture</span>
          </div>

          {/* Main Title */}
          <h1 className="hero__title">
            Discover India&apos;s{" "}
            <span className="hero__title-accent">Living Heritage</span>
          </h1>

          {/* Subtitle */}
          <p className="hero__subtitle">
            Explore centuries of cultural richness through immersive virtual tours,
            interactive maps, and captivating stories that connect you to the soul of India.
          </p>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <Link
              href="/explore"
              className="hero__cta hero__cta--primary"
              onClick={onExploreClick}
            >
              <span>Start Exploring</span>
              <svg
                className="hero__cta-arrow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              href="/monument/taj-mahal"
              className="hero__cta hero__cta--secondary"
              onClick={onVirtualTourClick}
            >
              <svg
                className="hero__cta-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Virtual Tour</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">150+</span>
              <span className="hero__stat-label">Monuments Mapped</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">50K+</span>
              <span className="hero__stat-label">Community Members</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">12</span>
              <span className="hero__stat-label">UNESCO Sites</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator">
        <span>Scroll to explore</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .hero {
            min-height: 50vh;
          }
        }

        /* ─────────────────────────── Background ─────────────────────────── */

        .hero__background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero__image {
          position: absolute;
          inset: -10%;
          background-image: url("/images/red-fort.jpg");
          background-size: cover;
          background-position: center;
          will-change: transform;
        }

        .hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(44, 36, 22, 0.85) 0%,
            rgba(107, 42, 21, 0.75) 50%,
            rgba(44, 36, 22, 0.9) 100%
          );
        }

        .hero__architectural-pattern {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L35 15H45L37 24L40 39L30 31L20 39L23 24L15 15H25L30 0Z' fill='%23D4AF37' fill-opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.5;
        }

        /* ─────────────────────────── Content ─────────────────────────── */

        .hero__content {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 120px 0 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .hero__content--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(212, 175, 55, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 100px;
          margin-bottom: 24px;
          font-size: 13px;
          font-weight: 500;
          color: #D4AF37;
          letter-spacing: 0.02em;
        }

        .hero__badge-dot {
          width: 6px;
          height: 6px;
          background: #D4AF37;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .hero__title {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          color: white;
          line-height: 1.1;
          margin: 0 0 24px;
          max-width: 800px;
          letter-spacing: -0.02em;
        }

        .hero__title-accent {
          font-style: italic;
          background: linear-gradient(135deg, #D4AF37 0%, #E5C54A 50%, #D4AF37 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero__subtitle {
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          margin: 0 0 40px;
          max-width: 600px;
        }

        /* ─────────────────────────── CTAs ─────────────────────────── */

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 48px;
        }

        .hero__cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 15px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero__cta--primary {
          background: linear-gradient(135deg, #8B3A1F 0%, #6B2A15 100%);
          color: white;
          box-shadow: 
            0 4px 16px rgba(139, 58, 31, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .hero__cta--primary:hover {
          transform: scale(1.05);
          box-shadow: 
            0 8px 32px rgba(139, 58, 31, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          color: white;
        }

        .hero__cta-arrow {
          width: 18px;
          height: 18px;
          transition: transform 0.3s;
        }

        .hero__cta--primary:hover .hero__cta-arrow {
          transform: translateX(4px);
        }

        .hero__cta--secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .hero__cta--secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: white;
          transform: scale(1.05);
          color: white;
        }

        .hero__cta-icon {
          width: 18px;
          height: 18px;
        }

        /* ─────────────────────────── Stats ─────────────────────────── */

        .hero__stats {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 640px) {
          .hero__stats {
            flex-wrap: wrap;
            gap: 16px;
          }
        }

        .hero__stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero__stat-number {
          font-family: var(--font-heading);
          font-size: 28px;
          font-weight: 700;
          color: #D4AF37;
          line-height: 1;
        }

        .hero__stat-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 0.01em;
        }

        .hero__stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 640px) {
          .hero__stat-divider {
            display: none;
          }
        }

        /* ─────────────────────────── Scroll Indicator ─────────────────────────── */

        .hero__scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          animation: float 2s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        .hero__scroll-mouse {
          width: 24px;
          height: 36px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 12px;
          position: relative;
        }

        .hero__scroll-wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 1.5s ease-in-out infinite;
        }

        @keyframes scroll {
          0%, 100% { opacity: 1; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.3; transform: translateX(-50%) translateY(8px); }
        }

        @media (max-width: 768px) {
          .hero__scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
