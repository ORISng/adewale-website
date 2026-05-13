import { useState } from "react";

const sponsorTiers = [
  {
    badge: "🏆 PLATINUM",
    name: "Headline Sponsor",
    desc: "Title naming rights, keynote slot, full branding",
    amount: "₦10M+",
  },
  {
    badge: "🥇 GOLD",
    name: "Category Sponsor",
    desc: "Category naming rights, branded stage, shortlist access",
    amount: "₦5M",
  },
  {
    badge: "🥈 SILVER",
    name: "Programme Sponsor",
    desc: "Logo prominence, branded materials, VIP presence",
    amount: "₦2.5M",
  },
  {
    badge: "🥉 BRONZE",
    name: "Community Partner",
    desc: "Brand recognition, event listing, impact report",
    amount: "₦1M",
  },
  {
    badge: "🎓 SCHOLAR",
    name: "Scholarship Sponsor",
    desc: "Fund named scholarships with full attribution",
    amount: "From\n₦500K",
  },
];

export default function SponsorshipSection() {
  const [formData, setFormData] = useState({
    org: "",
    contact: "",
    email: "",
    phone: "",
    tier: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="partner" className="bg-[#E8A020] py-14 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">

          <div className="space-y-10">
            <div>
              <div className="text-sm font-bold tracking-[0.2em] uppercase text-[#0A0F1E] mb-2">Sponsorship</div>
              <h2 className="font-bebas text-5xl md:text-7xl text-[#0A0F1E] mb-8 leading-[0.95]">
                INVEST IN OGUN STATE'S<br />FUTURE.
              </h2>
              <p className="text-base md:text-lg text-[#0A0F1E] opacity-90 max-w-lg leading-relaxed">
                ASC 2026 is our most significant edition yet. We seek partners who believe investing in young people is the highest-return investment any organisation can make.
              </p>
            </div>

            <div className="space-y-2">
              {sponsorTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="bg-[rgba(10,15,30,0.05)] p-5 md:p-6 flex items-center justify-between group transition-colors hover:bg-white/20"
                >
                  <div className="flex items-center gap-6">
                    <div className="font-bebas text-[11px] tracking-widest bg-[#0A0F1E] text-[#E8A020] px-4 py-2 min-w-[100px] text-center">
                      {tier.badge}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0A0F1E] text-sm mb-1">{tier.name}</h3>
                      <p className="text-[11px] text-[#0A0F1E] opacity-60 leading-tight">{tier.desc}</p>
                    </div>
                  </div>
                  <div className="font-bebas text-xl md:text-2xl text-[#0A0F1E] whitespace-pre-line ml-4">
                    {tier.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0F1E] p-8 md:p-14 shadow-2xl">
            <h3 className="font-bebas text-3xl text-white mb-2 tracking-tight">EXPRESS YOUR INTEREST</h3>
            <p className="text-sm text-white opacity-50 mb-10">
              Our team will reach out within 48 hours with a full sponsorship deck.
            </p>

            <form onSubmit={handleSubmit} className="space-y-7">
              {[
                { label: "Organisation Name", name: "org", placeholder: "e.g. Dangote Industries Ltd", type: "text" },
                { label: "Contact Person", name: "contact", placeholder: "Full name", type: "text" },
                { label: "Email Address", name: "email", placeholder: "csr@yourcompany.com", type: "email" },
                { label: "Phone Number", name: "phone", placeholder: "+234 _", type: "tel" },
                { label: "Message (Optional)", name: "message", placeholder: "Any specific areas of interest or questions.....", type: "text" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-white opacity-40">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white placeholder-white opacity-30 outline-none focus:border-[#E8A020] focus:opacity-100 transition-all text-sm"
                  />
                </div>
              ))}

              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-white opacity-40">
                  Sponsorship Tier of Interest
                </label>
                <div className="relative">
                  <select
                    name="tier"
                    required
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white outline-none focus:border-[#E8A020] transition-colors cursor-pointer appearance-none text-sm"
                  >
                    <option value="" className="bg-[#0A0F1E]">Select a tier</option>
                    <option value="platinum" className="bg-[#0A0F1E]">Platinum — ₦10M+</option>
                    <option value="gold" className="bg-[#0A0F1E]">Gold — ₦5M</option>
                    <option value="silver" className="bg-[#0A0F1E]">Silver — ₦2.5M</option>
                    <option value="bronze" className="bg-[#0A0F1E]">Bronze — ₦1M</option>
                    <option value="scholar" className="bg-[#0A0F1E]">Scholarship Sponsor — From ₦500K</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white opacity-60">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-5 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    submitted
                      ? "bg-[#1A7A4A] text-white"
                      : "bg-[#E8A020] text-[#0A0F1E] hover:bg-white"
                  }`}
                >
                  {submitted ? "✓ ENQUIRY SENT" : "SEND SPONSORSHIP ENQUIRY →"}
                </button>

                <p className="text-[10px] text-white opacity-30 text-center mt-6 leading-relaxed">
                  Your information is handled in confidence and will only be used to respond to your enquiry.
                </p>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
