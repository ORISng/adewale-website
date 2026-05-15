"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "Is participation free for schools?",
    a: "Yes. Registration and participation in all ASC competition categories — the STEM Contest and Innovation Pitch — are completely free for schools and students. There are no hidden fees at any stage.",
  },
  {
    q: "Which students are eligible for the STEM Contest?",
    a: "The STEM Contest is open to SS2 students only, in teams of up to four students per school. Each team must be accompanied by a registered supervising teacher. Schools may enter multiple teams.",
  },
  {
    q: "What happens if our school wins the zonal stage?",
    a: "Schools that qualify through the zonal stage advance to the October Grand Finale. Travel and accommodation for qualifying student teams and their supervising teacher are covered in full by the ASC programme.",
  },
  {
    q: "We are a school outside Remo — can we still participate?",
    a: "Absolutely. ASC is open to all secondary schools across Ogun State. While our roots are in Remo (Sagamu, Ikenne, and Remo North), the programme is statewide and we actively encourage schools from all LGAs to register.",
  },
  {
    q: "How are scholarship recipients selected?",
    a: "Scholarships are awarded primarily on merit — performance in the STEM Contest and Innovation Pitch stage. A portion of scholarship support is reserved for students who demonstrate exceptional potential but come from underserved communities within the Remo axis.",
  },
  {
    q: "How do I explore a sponsorship partnership?",
    a: "Complete the expression of interest form in our Partner section and our team will reach out within 48 hours with a full sponsorship deck. Alternatively, email us directly to start the conversation.",
  },
  {
    q: "What is the Ogun Economic & Innovation Council?",
    a: "The OEIC is a formally registered policy and economic development body co-founded by Michael Adewale Adesanya, focused on driving Ogun State's industrial and innovation future. From 2026, ASC operates as OEIC's flagship community programme.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-14 md:py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
          <div>
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="block w-6 h-px bg-[#E8A020]" />
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#E8A020]">
                  FAQs
                </span>
              </div>
              <h2 className="font-bebas text-5xl md:text-6xl lg:text-7xl leading-[0.95] text-[#0A0F1E]">
                Questions Answered.
              </h2>
            </div>
            <p className="text-sm md:text-base leading-relaxed text-[#555870] mt-6">
              Can't find what you're looking for? Email us at{" "}
              <strong>hello@asc2026.ng</strong> and we'll respond within 24 hours.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#E8EAF0] hover:border-[#E8A020] transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-[#FAF7F0] transition-colors duration-300"
                >
                  <span className="font-medium text-[#0A0F1E] text-base md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={`text-2xl text-[#E8A020] transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === idx ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openIndex === idx && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-sm md:text-base text-[#555870] leading-relaxed border-t border-[#E8EAF0]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
