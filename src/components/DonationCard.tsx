import { type DonationTier, formatPrice } from "@/lib/mockData";

interface DonationCardProps {
  tier: DonationTier;
}

export default function DonationCard({ tier }: DonationCardProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
        tier.highlighted
          ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl scale-105"
          : "bg-white border border-border shadow-lg hover:shadow-xl"
      }`}
    >
      {/* Highlighted Badge */}
      {tier.highlighted && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-accent text-text text-xs font-semibold rounded-bl-lg">
          Most Popular
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h3
            className={`font-heading text-xl font-semibold mb-2 ${
              tier.highlighted ? "text-white" : "text-text"
            }`}
          >
            {tier.name}
          </h3>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={`text-4xl font-heading font-bold ${
                tier.highlighted ? "text-white" : "text-primary"
              }`}
            >
              {formatPrice(tier.amount, tier.currency)}
            </span>
            <span
              className={`text-sm ${
                tier.highlighted ? "text-white/70" : "text-text-muted"
              }`}
            >
              /month
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-center text-sm mb-6 ${
            tier.highlighted ? "text-white/80" : "text-text-muted"
          }`}
        >
          {tier.description}
        </p>

        {/* Benefits */}
        <ul className="space-y-3 mb-8">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  tier.highlighted ? "text-accent" : "text-primary"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span
                className={`text-sm ${
                  tier.highlighted ? "text-white/90" : "text-text-muted"
                }`}
              >
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
            tier.highlighted
              ? "bg-white text-primary hover:bg-surface"
              : "bg-primary text-white hover:bg-primary-dark"
          }`}
        >
          Choose {tier.name}
        </button>
      </div>
    </div>
  );
}
