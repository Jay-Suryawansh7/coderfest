"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submitting logic here
    alert("Thank you for contacting us! We'll get back to you shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Get in Touch
            </span>
            <h1 className="text-text mb-6">
              We&apos;d Love to <span className="text-primary">Hear From You</span>
            </h1>
            <p className="text-text-muted text-lg mb-8 leading-relaxed">
              Have a question about a monument? Want to collaborate on a restoration project? 
              Or just want to say hello? Reach out to us.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-cream flex items-center justify-center text-xl text-primary shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text mb-1">Visit Us</h3>
                  <p className="text-text-muted">
                    124, Heritage Lane, Hauz Khas Village,<br />
                    New Delhi, Delhi 110016
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-cream flex items-center justify-center text-xl text-primary shrink-0">
                  📧
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text mb-1">Email Us</h3>
                  <p className="text-text-muted">
                    General: hello@dharohar.org<br />
                    Partnerships: partners@dharohar.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-cream flex items-center justify-center text-xl text-primary shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-text mb-1">Call Us</h3>
                  <p className="text-text-muted">
                    +91 11 2345 6789<br />
                    Mon-Fri, 9am - 6pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="font-heading text-2xl font-semibold text-text mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="">Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="restoration">Report a Restoration Issue</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 font-semibold text-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
