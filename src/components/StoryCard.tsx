import Link from "next/link";
import { type Story, formatDate } from "@/lib/mockData";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "featured" | "horizontal";
}

const categoryColors: Record<Story["category"], string> = {
  Heritage: "bg-amber-100 text-amber-700",
  Architecture: "bg-violet-100 text-violet-700",
  "Oral History": "bg-orange-100 text-orange-700",
  Restoration: "bg-emerald-100 text-emerald-700",
  Tradition: "bg-rose-100 text-rose-700",
  Community: "bg-blue-100 text-blue-700",
};

const categoryIcons: Record<Story["category"], string> = {
  Heritage: "🏺",
  Architecture: "🏛️",
  "Oral History": "🗣️",
  Restoration: "🔧",
  Tradition: "🎭",
  Community: "👥",
};

export default function StoryCard({ story, variant = "default" }: StoryCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/stories/${story.id}`}
        className="card group relative overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/3] md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-30">{categoryIcons[story.category]}</span>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-text text-xs font-semibold rounded-full">
              Featured Story
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col justify-center">
            <span className={`inline-flex self-start px-3 py-1 text-xs font-medium rounded-full mb-4 ${categoryColors[story.category]}`}>
              {story.category}
            </span>

            <h3 className="font-heading text-2xl font-semibold text-text mb-3 group-hover:text-primary transition-colors">
              {story.title}
            </h3>

            <p className="text-text-muted mb-6 line-clamp-3">
              {story.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {story.author.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-text">{story.author}</p>
                <p className="text-xs text-text-muted">
                  {formatDate(story.date)} • {story.readTime} min read
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/stories/${story.id}`}
        className="flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-surface to-surface-warm flex-shrink-0 flex items-center justify-center">
          <span className="text-3xl">{categoryIcons[story.category]}</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full mb-2 ${categoryColors[story.category]}`}>
            {story.category}
          </span>
          <h4 className="font-medium text-text group-hover:text-primary transition-colors line-clamp-1">
            {story.title}
          </h4>
          <p className="text-sm text-text-muted line-clamp-1">{story.excerpt}</p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/stories/${story.id}`}
      className="card group"
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-gradient-to-br from-surface to-surface-warm relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500">
            {categoryIcons[story.category]}
          </span>
        </div>
        <div className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[story.category]}`}>
          {story.category}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs text-text-muted">
          {story.readTime} min read
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-heading font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {story.title}
        </h4>

        <p className="text-sm text-text-muted line-clamp-2 mb-4">
          {story.excerpt}
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
            <span className="text-xs font-medium text-primary">
              {story.author.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-text">{story.author}</p>
            <p className="text-xs text-text-muted">{formatDate(story.date)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
