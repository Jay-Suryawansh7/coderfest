import Link from "next/link";
import { type Event, formatPrice, formatDate } from "@/lib/mockData";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured" | "compact";
}

const categoryIcons: Record<Event["category"], string> = {
  Festival: "🎭",
  Exhibition: "🖼️",
  Workshop: "🎨",
  "Heritage Walk": "🚶",
  Lecture: "📚",
  Performance: "🎻",
};

const categoryColors: Record<Event["category"], string> = {
  Festival: "bg-pink-100 text-pink-700",
  Exhibition: "bg-purple-100 text-purple-700",
  Workshop: "bg-blue-100 text-blue-700",
  "Heritage Walk": "bg-green-100 text-green-700",
  Lecture: "bg-amber-100 text-amber-700",
  Performance: "bg-rose-100 text-rose-700",
};

export default function EventCard({ event, variant = "default" }: EventCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/events/${event.id}`}
        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
      >
        <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center text-2xl flex-shrink-0">
          {categoryIcons[event.category]}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-text truncate group-hover:text-primary transition-colors">
            {event.title}
          </h4>
          <p className="text-sm text-text-muted">{formatDate(event.date)} • {event.city}</p>
        </div>
        <span className="text-sm font-semibold text-primary flex-shrink-0">
          {formatPrice(event.price)}
        </span>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/events/${event.id}`}
        className="card group relative overflow-hidden"
      >
        {/* Image */}
        <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-accent/20 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-50">{categoryIcons[event.category]}</span>
          </div>
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent text-text text-xs font-semibold rounded-full">
            Featured
          </div>
          {/* Price */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary font-semibold rounded-lg shadow-lg">
            {formatPrice(event.price)}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[event.category]}`}>
              {event.category}
            </span>
          </div>

          <h3 className="font-heading text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <p className="text-sm text-text-muted line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {event.city}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/events/${event.id}`}
      className="card group"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-surface to-surface-warm relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-40 group-hover:scale-110 transition-transform duration-500">
            {categoryIcons[event.category]}
          </span>
        </div>
        {/* Type Badge */}
        <div className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[event.category]}`}>
          {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-heading font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h4>

        <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(event.date)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text-muted">{event.city}</span>
          <span className="font-semibold text-primary">
            {formatPrice(event.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
