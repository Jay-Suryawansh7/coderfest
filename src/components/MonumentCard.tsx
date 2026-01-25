import Link from "next/link";
import { type Monument } from "@/lib/mockData";

interface MonumentCardProps {
  monument: Monument;
}

export default function MonumentCard({ monument }: MonumentCardProps) {
  return (
    <Link
      href={`/explore/${monument.id}`}
      className="card group flex flex-col h-full"
    >
      {/* Image */}
      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        {monument.image ? (
          <img
            src={monument.image}
            alt={monument.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        )}

        {/* UNESCO Badge */}
        {monument.category === "UNESCO" && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-accent/90 backdrop-blur-sm text-text text-xs font-semibold rounded-full flex items-center gap-1 shadow-sm">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            UNESCO World Heritage
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs text-text-muted flex items-center gap-1 shadow-sm">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {monument.city}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="font-heading font-semibold text-text mb-1 group-hover:text-primary transition-colors">
          {monument.name}
        </h4>
        <p className="text-sm text-text-muted mb-3">
          {monument.state}
        </p>
        <p className="text-sm text-text-muted line-clamp-2 mb-4 flex-1">
          {monument.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-text-light mt-auto">
          <span className="flex items-center gap-1 bg-surface px-2 py-1 rounded">
             Built: {monument.era}
          </span>
          <span className="truncate max-w-[50%] bg-surface px-2 py-1 rounded">
             {monument.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
