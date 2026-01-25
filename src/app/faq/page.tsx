"use client";

import { useState } from "react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        q: "What is Dharohar's mission?",
        a: "Our mission is to document, preserve, and celebrate India's diverse cultural heritage through technology, community engagement, and active restoration projects.",
      },
      {
        q: "How can I contribute?",
        a: "You can contribute by donating to restoration projects, volunteering for local events, sharing your heritage stories, or simply attending our cultural workshops.",
      },
      {
        q: "Is Dharohar a non-profit organization?",
        a: "Yes, Dharohar is a registered non-profit trust. All funds raised are used exclusively for heritage preservation and educational activities.",
      },
    ],
  },
  {
    category: "Donations & Tax",
    questions: [
      {
        q: "Are donations tax-deductible?",
        a: "Yes, all donations to Dharohar are eligible for 50% tax exemption under Section 80G of the Income Tax Act for Indian citizens.",
      },
      {
        q: "Can I donate to a specific monument?",
        a: "Absolutely. When making a donation, you can choose a specific ongoing project (e.g., 'Hampi Temple Conservation') to direct your funds to.",
      },
      {
        q: "How do I get my donation receipt?",
        a: "Receipts are automatically emailed to you immediately after a successful transaction. You can also download them from your user dashboard.",
      },
    ],
  },
  {
    category: "Events & Volunteering",
    questions: [
      {
        q: "How do I sign up for a heritage walk?",
        a: "Visit the 'Events' page, browse upcoming walks in your city, and click 'Register'. You'll receive a confirmation ticket via email.",
      },
      {
        q: "Who can become a volunteer?",
        a: "Anyone with a passion for heritage! We have roles for photographers, writers, guides, and on-ground support staff. No prior experience is required for most roles.",
      },
      {
        q: "Can I host an event?",
        a: "Yes! If you are a historian, artist, or guide, you can propose an event through our 'Community' page. Our team will review and help you organize it.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-heritage max-w-4xl">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-surface-cream text-text-muted text-sm font-medium rounded-full mb-4">
            Help Center
          </span>
          <h1 className="text-text mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Everything you need to know about Dharohar, our mission, and how you can get involved.
          </p>
        </div>

        <div className="space-y-10">
          {faqs.map((section, sIdx) => (
            <div key={sIdx}>
              <h2 className="font-heading text-xl font-semibold text-text mb-6 pl-2 border-l-4 border-primary">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, qIdx) => {
                  const id = `${sIdx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div
                      key={qIdx}
                      className={`border border-border rounded-xl bg-white overflow-hidden transition-all duration-300 ${
                        isOpen ? "shadow-md border-primary/30" : "hover:border-primary/50"
                      }`}
                    >
                      <button
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                      >
                        <span className={`font-medium text-lg pr-4 ${isOpen ? "text-primary" : "text-text"}`}>
                          {item.q}
                        </span>
                        <span className={`text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                          +
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-5 pt-0 text-text-muted leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-surface-cream p-8 rounded-2xl border border-border">
          <h3 className="font-heading text-xl font-semibold text-text mb-2">Still have questions?</h3>
          <p className="text-text-muted mb-6">
            Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
          </p>
          <a href="/contact" className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
