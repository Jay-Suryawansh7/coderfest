"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import { events, type Event } from "@/lib/mockData";

const typeFilters: { id: Event["type"] | "all"; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "festival", label: "Festivals" },
  { id: "exhibition", label: "Exhibitions" },
  { id: "workshop", label: "Workshops" },
  { id: "heritage-walk", label: "Heritage Walks" },
  { id: "lecture", label: "Lectures" },
];

export default function EventsPage() {
  const [activeType, setActiveType] = useState<Event["type"] | "all">("all");

  const filteredEvents = events.filter((event) => {
    if (activeType === "all") return true;
    return event.type === activeType;
  });

  const featuredEvent = events.find((e) => e.featured);

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Cultural Calendar
          </span>
          <h1 className="text-text mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="text-text-muted max-w-2xl">
            Immerse yourself in India&apos;s living heritage through festivals, workshops,
            exhibitions, and heritage walks curated for culture enthusiasts.
          </p>
        </div>

        {/* Featured Event */}
        {featuredEvent && (
          <div className="mb-12">
            <h2 className="text-lg font-heading font-semibold text-text mb-4">
              Featured Event
            </h2>
            <EventCard event={featuredEvent} variant="featured" />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveType(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeType === filter.id
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-text-muted">
          Showing {filteredEvents.length} events
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-surface to-surface-warm rounded-2xl border border-border">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl font-semibold text-text mb-3">
              Never Miss an Event
            </h3>
            <p className="text-text-muted mb-6">
              Subscribe to our newsletter and get weekly updates on heritage events near you.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
