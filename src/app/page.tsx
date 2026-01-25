import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import EventCard from "@/components/EventCard";
import StoryCard from "@/components/StoryCard";
import { getFeaturedEvents, getFeaturedStories, monuments as mockMonuments } from "@/lib/mockData";
import { api } from "@/lib/api";

export default async function HomePage() {
  // Default to mocks
  let monuments = mockMonuments;
  let featuredEvents = getFeaturedEvents().slice(0, 3);
  let featuredStories = getFeaturedStories().slice(0, 3);

  // Try fetching from backend
  try {
    const apiMonuments = await api.getHeritageSites();
    if (apiMonuments && apiMonuments.length > 0) {
      monuments = apiMonuments;
    }
    // console.log("Fetched monuments from API", monuments.length);
  } catch (e) {
    // console.warn("Using mock data as API is unavailable");
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Map Section */}
      <MapSection markers={monuments} />

      {/* Featured Events Section */}
      <section className="section-padding">
        <div className="container-heritage">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Upcoming Experiences
              </span>
              <h2 className="text-text">
                Cultural <span className="text-primary">Events</span>
              </h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View All Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="section-padding bg-gradient-to-b from-surface-cream to-surface">
        <div className="container-heritage">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent-dark text-sm font-medium rounded-full mb-4">
                Heritage Narratives
              </span>
              <h2 className="text-text">
                Stories That <span className="text-primary">Matter</span>
              </h2>
            </div>
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Read All Stories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-heritage">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-12 md:p-16 text-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-white mb-4">
                Join the Movement to
                <span className="block text-accent">Preserve Our Heritage</span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Every contribution helps protect India&apos;s irreplaceable cultural treasures.
                Become part of our community of heritage guardians today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/donate" className="btn btn-accent">
                  Make a Donation
                </Link>
                <Link
                  href="/community"
                  className="btn bg-white/10 text-white border border-white/30 hover:bg-white/20"
                >
                  Join Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
