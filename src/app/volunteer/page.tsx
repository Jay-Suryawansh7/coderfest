export default function VolunteerPage() {
  const roles = [
    {
      title: "Heritage Guide",
      commitment: "4-8 hours/month",
      location: "On-site",
      description: "Lead heritage walks and explain the history of monuments to visitors and student groups.",
      skills: ["Public Speaking", "History Knowledge", "Language Skills"],
    },
    {
      title: "Content Contributor",
      commitment: "Flexible",
      location: "Remote",
      description: "Write articles, blog posts, or create social media content about diverse heritage topics.",
      skills: ["Writing", "Research", "Social Media"],
    },
    {
      title: "Photographer / Videographer",
      commitment: "Event-based",
      location: "On-site",
      description: "Document festivals, events, and monuments for our archives and digital platforms.",
      skills: ["Photography", "Editing", "Visual Storytelling"],
    },
    {
      title: "Conservation Assistant",
      commitment: "Weekend Drives",
      location: "On-site",
      description: "Assist experts in non-technical cleaning and maintenance tasks at heritage sites.",
      skills: ["Physical Stamina", "Attention to Detail", "Teamwork"],
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage">
        {/* Hero */}
        <section className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            Become a Guardian
          </span>
          <h1 className="text-text mb-6">
            Volunteer with <span className="text-primary">Dharohar</span>
          </h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Join a passionate community of changemakers. Your time and skills can help 
            keep India&apos;s history alive for the next generation.
          </p>
        </section>

        {/* Roles Grid */}
        <section className="mb-20">
          <h2 className="font-heading text-2xl font-semibold text-text mb-8 text-center">Open Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-border hover:border-primary transition-all group">
                <h3 className="font-heading font-semibold text-lg text-text mb-2 group-hover:text-primary transition-colors">
                  {role.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 bg-surface rounded-md text-text-muted">
                    🕒 {role.commitment}
                  </span>
                  <span className="px-2 py-1 bg-surface rounded-md text-text-muted">
                    📍 {role.location}
                  </span>
                </div>
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  {role.description}
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-text mb-2 uppercase tracking-wide">Skills needed:</p>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span key={skill} className="text-xs text-primary bg-primary/5 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="max-w-3xl mx-auto bg-surface-cream rounded-3xl p-8 md:p-12 border border-border">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-semibold text-text mb-3">Apply Now</h2>
            <p className="text-text-muted">
              Fill out the form below and our volunteer coordinator will get in touch with you.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Email</label>
                <input type="email" className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Phone</label>
                <input type="tel" className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Which role interests you?</label>
              <select className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option>Select a role</option>
                {roles.map(r => <option key={r.title} value={r.title}>{r.title}</option>)}
                <option value="other">Other / Not Sure</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">Why do you want to volunteer?</label>
              <textarea rows={4} className="w-full px-4 py-3 bg-white border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"></textarea>
            </div>

            <button type="submit" className="w-full btn btn-primary py-3 text-lg">
              Submit Application
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
