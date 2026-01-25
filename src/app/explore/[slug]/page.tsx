"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Copy, MapPin, Clock, Calendar, Info } from "lucide-react";
import { MONUMENTS, getMonumentById, type Monument } from "@/lib/mockData";
import { useState, useEffect } from "react";

export default function MonumentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [monument, setMonument] = useState<Monument | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      const id = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const found = getMonumentById(id);
      if (found) {
        setMonument(found);
      } else {
        // Handle not found locally or let UI show not found state
      }
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!monument) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
        <h1 className="text-3xl font-heading font-bold text-text mb-4">Monument Not Found</h1>
        <p className="text-text-muted mb-8">The heritage site you are looking for does not exist in our database.</p>
        <Link href="/explore" className="btn btn-primary">
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-cream">
      {/* Hero Section - 360 Tour or Image */}
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-black">
        {monument.virtualTourUrl ? (
          <iframe
            src={monument.virtualTourUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            title={`360 tour of ${monument.name}`}
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={monument.image}
              alt={monument.name}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white pointer-events-none">
          <div className="container-heritage pointer-events-auto">
            <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-md mb-3">
              {monument.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 shadow-sm">
              {monument.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm md:text-base font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                {monument.city}, {monument.state}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                {monument.era}
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <Link
          href="/explore"
          className="absolute top-24 left-6 z-10 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full hover:bg-white/20 transition-all flex items-center gap-2 text-sm font-medium group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </div>

      {/* Details Content */}
      <div className="container-heritage py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-2xl font-heading font-semibold text-text mb-4 flex items-center gap-3">
                <Info className="w-6 h-6 text-primary" />
                About the Site
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                {monument.description}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-2xl font-heading font-semibold text-text mb-4 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Did You Know?
              </h2>
              <p className="text-text-muted text-lg italic border-l-4 border-accent pl-4">
                &ldquo;{monument.funFact}&rdquo;
              </p>
            </div>
            
            {/* Contextual 360 CTA if tour exists */}
            {monument.virtualTourUrl && (
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl shrink-0">
                  360°
                </div>
                <div>
                  <h3 className="font-semibold text-text">Interactive Tour Available</h3>
                  <p className="text-sm text-text-muted">
                    Scroll up to the top banner to explore this site in full 360-degree view. 
                    Drag to look around and zoom in/out for details.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm sticky top-24">
              <h3 className="font-heading font-semibold text-lg text-text mb-6 pb-4 border-b border-border">
                Visitor Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <Clock className="w-5 h-5" />
                    Visiting Hours
                  </div>
                  <p className="text-text-muted">{monument.visitingHours}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <MapPin className="w-5 h-5" />
                    Location
                  </div>
                  <p className="text-text-muted">{monument.city}, {monument.state}</p>
                  <p className="text-xs text-text-muted mt-1">
                    {monument.lat.toFixed(4)}, {monument.lng.toFixed(4)}
                  </p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => {
                       navigator.clipboard.writeText(window.location.href);
                       alert("Link copied to clipboard!");
                    }}
                    className="w-full btn btn-secondary flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Share this Site
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
