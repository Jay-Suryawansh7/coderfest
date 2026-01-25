import DonationCard from "@/components/DonationCard";
import { donationTiers } from "@/lib/mockData";

const impactStats = [
  { value: "₹2.5Cr+", label: "Raised for Restoration" },
  { value: "25", label: "Monuments Restored" },
  { value: "5,000+", label: "Active Donors" },
  { value: "100%", label: "Transparency" },
];

const recentProjects = [
  {
    name: "Adalaj Stepwell Restoration",
    location: "Gujarat",
    raised: 1500000,
    goal: 2000000,
    image: "🏛️",
  },
  {
    name: "Hampi Temple Conservation",
    location: "Karnataka",
    raised: 850000,
    goal: 1200000,
    image: "🕌",
  },
  {
    name: "Traditional Puppetry Revival",
    location: "Rajasthan",
    raised: 320000,
    goal: 500000,
    image: "🎭",
  },
];

export default function DonatePage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container-heritage text-center mb-16">
        <span className="inline-block px-4 py-1 bg-accent/20 text-accent-dark text-sm font-medium rounded-full mb-4">
          Make an Impact
        </span>
        <h1 className="text-text mb-4 max-w-3xl mx-auto">
          Help Preserve India&apos;s
          <span className="text-primary"> Cultural Legacy</span>
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto mb-8">
          Your contribution directly funds monument restoration, craft preservation,
          and educational programs that keep our heritage alive for future generations.
        </p>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {impactStats.map((stat, index) => (
            <div key={index} className="p-4 bg-white rounded-xl border border-border">
              <div className="text-2xl font-heading font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="bg-gradient-to-b from-surface-cream to-surface py-16">
        <div className="container-heritage">
          <div className="text-center mb-12">
            <h2 className="text-text mb-4">
              Choose Your <span className="text-primary">Impact Level</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Every contribution matters. Select a tier that works for you and become
              part of our heritage preservation community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {donationTiers.map((tier) => (
              <DonationCard key={tier.name} tier={tier} />
            ))}
          </div>

          <p className="text-center text-sm text-text-muted mt-8">
            All donations are eligible for 80G tax exemption under Indian law.
          </p>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 container-heritage">
        <div className="text-center mb-12">
          <h2 className="text-text mb-4">
            Active <span className="text-primary">Projects</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            See where your donations are making a difference. Track the progress of
            our ongoing restoration and preservation initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recentProjects.map((project, index) => {
            const progress = Math.round((project.raised / project.goal) * 100);
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center text-3xl mb-4">
                  {project.image}
                </div>
                <h3 className="font-heading font-semibold text-text mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">{project.location}</p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-2 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary font-medium">
                    ₹{(project.raised / 100000).toFixed(1)}L raised
                  </span>
                  <span className="text-text-muted">{progress}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-primary py-16">
        <div className="container-heritage">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white mb-4">
              Your Trust, <span className="text-accent">Our Commitment</span>
            </h2>
            <p className="text-white/80 mb-10 max-w-2xl mx-auto">
              We believe in complete transparency. Every rupee you donate is tracked
              and reported. View our annual reports and financial statements anytime.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "📊",
                  title: "Annual Reports",
                  desc: "Detailed breakdown of funds utilization",
                },
                {
                  icon: "🔍",
                  title: "Project Updates",
                  desc: "Monthly progress reports on all projects",
                },
                {
                  icon: "✅",
                  title: "Verified by CA",
                  desc: "Audited financial statements",
                },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-heading font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Amount */}
      <section className="py-16 container-heritage">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="font-heading text-2xl font-semibold text-text mb-3">
            Custom Donation
          </h3>
          <p className="text-text-muted mb-6">
            Want to contribute a different amount? Enter your preferred donation below.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">
                ₹
              </span>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-3 pl-8 bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <button className="btn btn-primary">Donate</button>
          </div>
        </div>
      </section>
    </div>
  );
}
