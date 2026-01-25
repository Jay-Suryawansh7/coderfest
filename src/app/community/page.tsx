import Link from "next/link";

const communityStats = [
  { value: "50K+", label: "Members" },
  { value: "120+", label: "Local Chapters" },
  { value: "500+", label: "Events Organized" },
  { value: "15K+", label: "Volunteer Hours" },
];

const activities = [
  {
    icon: "🏛️",
    title: "Heritage Documentation",
    description: "Help document lesser-known monuments, traditions, and cultural practices in your region.",
  },
  {
    icon: "🎨",
    title: "Craft Preservation",
    description: "Connect with local artisans and help preserve dying craft traditions through workshops.",
  },
  {
    icon: "📚",
    title: "Educational Outreach",
    description: "Organize heritage walks and educational sessions for schools and communities.",
  },
  {
    icon: "🌿",
    title: "Conservation Drives",
    description: "Participate in monument cleaning, restoration support, and awareness campaigns.",
  },
];

const members = [
  { name: "Ananya Sharma", role: "Heritage Photographer", location: "Delhi", avatar: "AS" },
  { name: "Rajesh Kumar", role: "Archaeology Student", location: "Varanasi", avatar: "RK" },
  { name: "Priya Menon", role: "Conservation Architect", location: "Chennai", avatar: "PM" },
  { name: "Arjun Singh", role: "Folk Music Researcher", location: "Jaipur", avatar: "AJ" },
];

export default function CommunityPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container-heritage mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Join the Movement
            </span>
            <h1 className="text-text mb-4">
              Heritage <span className="text-primary">Community</span>
            </h1>
            <p className="text-text-muted mb-8 max-w-lg">
              Connect with fellow heritage enthusiasts, historians, archaeologists, and
              conservationists dedicated to preserving India&apos;s cultural legacy.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Join Community</button>
              <Link href="/events" className="btn btn-secondary">
                Attend an Event
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-heading font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-gradient-to-b from-surface-cream to-surface py-16">
        <div className="container-heritage">
          <div className="text-center mb-12">
            <h2 className="text-text mb-4">
              Ways to <span className="text-primary">Get Involved</span>
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              There are many ways to contribute to heritage preservation, whether you&apos;re
              a professional or simply passionate about our cultural legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-surface flex items-center justify-center text-2xl mb-4">
                  {activity.icon}
                </div>
                <h3 className="font-heading font-semibold text-text mb-2">
                  {activity.title}
                </h3>
                <p className="text-sm text-text-muted">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-16 container-heritage">
        <div className="text-center mb-12">
          <h2 className="text-text mb-4">
            Meet Our <span className="text-primary">Members</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Our community brings together diverse professionals and enthusiasts united
            by their love for India&apos;s heritage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white font-medium text-lg mx-auto mb-4">
                {member.avatar}
              </div>
              <h4 className="font-heading font-semibold text-text">{member.name}</h4>
              <p className="text-sm text-primary mb-1">{member.role}</p>
              <p className="text-xs text-text-muted">{member.location}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="btn btn-secondary">View All Members</button>
        </div>
      </section>

      {/* Discussion Forum Preview */}
      <section className="bg-gradient-to-b from-surface-cream to-surface py-16">
        <div className="container-heritage">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-text mb-4">
                Community <span className="text-primary">Discussions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Documenting abandoned stepwells in Gujarat",
                  author: "Priya Menon",
                  replies: 24,
                  category: "Documentation",
                },
                {
                  title: "Best practices for heritage photography",
                  author: "Rajesh Kumar",
                  replies: 18,
                  category: "Tips",
                },
                {
                  title: "Upcoming conservation workshop in Mumbai",
                  author: "Community Team",
                  replies: 42,
                  category: "Events",
                },
              ].map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
                    💬
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text truncate">{topic.title}</h4>
                    <p className="text-sm text-text-muted">
                      by {topic.author} • {topic.replies} replies
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-surface text-xs text-text-muted rounded-full">
                    {topic.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="btn btn-primary">Join Discussion Forum</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
