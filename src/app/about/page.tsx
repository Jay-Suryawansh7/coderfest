import Image from "next/image";

const values = [
  {
    title: "Preservation",
    description: "We believe every stone, scroll, and story deserves to be protected for future generations.",
    icon: "🏛️",
  },
  {
    title: "Community",
    description: "Heritage belongs to the people. We empower local communities to become custodians of their legacy.",
    icon: "👥",
  },
  {
    title: "Transparency",
    description: "Our operations and financials are open books. Trust is the foundation of our work.",
    icon: "🔍",
  },
  {
    title: "Innovation",
    description: "Using modern technology like AI and VR to document and bring ancient history to life.",
    icon: "💡",
  },
];

const team = [
  {
    name: "Dr. Arindam Gupta",
    role: "Founder & Executive Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Archaeologist with 20+ years of experience in ASI and UNESCO projects.",
  },
  {
    name: "Sarah Fernandes",
    role: "Head of Conservation",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Specializes in restoring limestone structures and Mughal-era architecture.",
  },
  {
    name: "Vikram Singh",
    role: "Community Outreach Lead",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Passionate about connecting rural communities with their heritage tourism potential.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="container-heritage mb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1 bg-accent/20 text-accent-dark text-sm font-medium rounded-full mb-4">
              Our Story
            </span>
            <h1 className="text-text mb-6">
              Preserving India&apos;s <span className="text-primary">Soul</span>
            </h1>
            <p className="text-text-muted text-lg leading-relaxed mb-6">
              Dharohar was born from a simple realization: India&apos;s heritage is disappearing. 
              Not just the monuments crumbling from neglect, but the living traditions, 
              the oral histories, and the craftsmanship that defined civilizations for millennia.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Started in 2023 by a group of historians, tech enthusiasts, and conservationists, 
              we are on a mission to create a digital ark for Indian heritage—while actively 
              restoring the physical remnants of our glorious past.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop"
              alt="Team working at a heritage site"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-surface-cream py-16">
        <div className="container-heritage">
          <div className="text-center mb-12">
            <h2 className="text-text mb-4">Our Core <span className="text-primary">Values</span></h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              These principles guide every restoration project, workshop, and story we share.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="font-heading font-semibold text-text mb-2">{val.title}</h3>
                <p className="text-sm text-text-muted">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container-heritage">
        <div className="text-center mb-12">
          <h2 className="text-text mb-4">Meet the <span className="text-primary">Leadership</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="font-heading font-semibold text-lg text-text">{member.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
              <p className="text-sm text-text-muted">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container-heritage text-center">
          <h2 className="text-white mb-6">Join Us in This Journey</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
            Whether you are a donor, a volunteer, or just a history lover, 
            there is a place for you in the Dharohar family.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/volunteer" className="btn bg-white text-primary hover:bg-surface border-none">
              Become a Volunteer
            </a>
            <a href="/donate" className="btn bg-accent text-text border-none hover:bg-accent-dark hover:text-white">
              Donate Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
