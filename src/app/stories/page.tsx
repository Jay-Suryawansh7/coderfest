"use client";

import { useState } from "react";
import StoryCard from "@/components/StoryCard";
import { stories, type Story } from "@/lib/mockData";

const categoryFilters: { id: Story["category"] | "all"; label: string }[] = [
  { id: "all", label: "All Stories" },
  { id: "restoration", label: "Restoration" },
  { id: "discovery", label: "Discovery" },
  { id: "tradition", label: "Tradition" },
  { id: "community", label: "Community" },
  { id: "architecture", label: "Architecture" },
];

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState<Story["category"] | "all">("all");

  const filteredStories = stories.filter((story) => {
    if (activeCategory === "all") return true;
    return story.category === activeCategory;
  });

  const featuredStory = stories.find((s) => s.featured);

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent-dark text-sm font-medium rounded-full mb-4">
            Heritage Narratives
          </span>
          <h1 className="text-text mb-4">
            Stories of <span className="text-primary">Preservation</span>
          </h1>
          <p className="text-text-muted max-w-2xl">
            Discover inspiring tales of restoration, community efforts, forgotten traditions,
            and the people who dedicate their lives to preserving India&apos;s cultural legacy.
          </p>
        </div>

        {/* Featured Story */}
        {featuredStory && (
          <div className="mb-12">
            <h2 className="text-lg font-heading font-semibold text-text mb-4">
              Editor&apos;s Pick
            </h2>
            <StoryCard story={featuredStory} variant="featured" />
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === filter.id
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
          Showing {filteredStories.length} stories
        </div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>

        {/* Contribute CTA */}
        <div className="mt-16 p-8 bg-primary rounded-2xl text-center">
          <h3 className="font-heading text-2xl font-semibold text-white mb-3">
            Have a Heritage Story to Share?
          </h3>
          <p className="text-white/80 max-w-xl mx-auto mb-6">
            We&apos;re always looking for passionate storytellers who want to share
            their experiences with preservation, tradition, or cultural discovery.
          </p>
          <button className="btn btn-accent">
            Submit Your Story
          </button>
        </div>
      </div>
    </div>
  );
}
