"use client";

import { useState } from "react";
import MonumentCard from "@/components/MonumentCard";
import { monuments } from "@/lib/mockData";

const filters = [
  { id: "all", label: "All Sites", count: monuments.length },
  { id: "unesco", label: "UNESCO", count: monuments.filter((m) => m.category === "UNESCO").length },
  { id: "north", label: "North India", count: 6 },
  { id: "south", label: "South India", count: 4 },
  { id: "west", label: "West India", count: 3 },
  { id: "east", label: "East India", count: 2 },
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMonuments = monuments.filter((monument) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !monument.name.toLowerCase().includes(query) &&
        !monument.city.toLowerCase().includes(query) &&
        !monument.state.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Category filter
    if (activeFilter === "all") return true;
    if (activeFilter === "unesco") return monument.category === "UNESCO";
    if (activeFilter === "north") {
      return ["Delhi", "Uttar Pradesh", "Rajasthan", "Punjab"].includes(monument.state);
    }
    if (activeFilter === "south") {
      return ["Karnataka", "Tamil Nadu", "Kerala"].includes(monument.state);
    }
    if (activeFilter === "west") {
      return ["Maharashtra", "Gujarat"].includes(monument.state);
    }
    if (activeFilter === "east") {
      return ["West Bengal", "Odisha"].includes(monument.state);
    }
    return true;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Discovery
          </span>
          <h1 className="text-text mb-4">
            Explore <span className="text-primary">Heritage Sites</span>
          </h1>
          <p className="text-text-muted max-w-2xl">
            Discover India&apos;s magnificent monuments, from ancient temples to majestic
            forts. Each site holds centuries of history waiting to be explored.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8">
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <input
              type="text"
              placeholder="Search monuments, cities, states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white text-text-muted border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {filter.label}
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                    activeFilter === filter.id ? "bg-white/20" : "bg-surface"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 text-sm text-text-muted">
          Showing {filteredMonuments.length} heritage sites
        </div>

        {/* Monuments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMonuments.map((monument) => (
            <MonumentCard key={monument.id} monument={monument} />
          ))}
        </div>

        {/* Empty State */}
        {filteredMonuments.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
              <svg
                className="w-10 h-10 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-semibold text-text mb-2">
              No monuments found
            </h3>
            <p className="text-text-muted">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
