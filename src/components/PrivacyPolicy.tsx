import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, Mail, Phone, Lock, Eye, CheckCircle, Navigation } from 'lucide-react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
  heroImage: string;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome, heroImage }) => {
  const [activeSection, setActiveSection] = useState('Introduction');

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    { id: 'Introduction', label: '1. Introduction' },
    { id: 'Data We Collect', label: '2. Data We Collect' },
    { id: 'How We Use Data', label: '3. How We Use Data' },
    { id: 'Sharing Policy', label: '4. Sharing Policy' },
    { id: 'Your Rights', label: '5. Your Rights' },
    { id: 'Security', label: '6. Security' },
    { id: 'Contact', label: '7. Contact' },
    { id: 'Call to Action', label: '8. Call to Action' },
  ];

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Accounting for sticky elements
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen pb-20 font-sans selection:bg-brand-red selection:text-white">
      {/* Absolute floating back navigation */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 bg-brand-navy text-white hover:bg-brand-red px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg duration-300 transition-all cursor-pointer"
          id="privacy-policy-back-cta"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>
      </div>

      {/* Hero Section (Height: 35-45%) */}
      <div className="relative h-[40vh] w-full overflow-hidden flex items-end">
        {/* Background Image of Skyline */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Property Junction Privacy Skyline"
            className="w-full h-full object-cover scale-102 brightness-[0.40]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-black/30" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-brand-red font-mono text-xs font-bold tracking-[0.25em] uppercase">
              <ShieldCheck className="w-4 h-4 text-brand-red" />
              <span>DATA PROTECTION PROTOCOL</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-belleza font-extrabold text-brand-navy tracking-tight leading-none mt-2">
              Privacy Policy
            </h1>
            <p className="text-sm md:text-base text-zinc-600 max-w-2xl mt-2 font-belleza">
              Your data, protected with full transparency.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Structural Index & Container */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Left Side: Sticky Section Index Index for scrollytelling */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28 flex flex-col gap-1.5 p-5 bg-white rounded-2xl border border-brand-navy/10 shadow-sm">
            <h4 className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-brand-navy/60 mb-3 ml-3 font-sans">
              Section Index
            </h4>
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => handleScrollToSection(sec.id)}
                className={`text-left text-xs py-2 px-3.5 rounded-lg font-medium transition-all duration-300 font-sans cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'text-zinc-600 hover:text-brand-navy hover:bg-zinc-100'
                }`}
                id={`policy-index-item-${sec.id.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: policy narrative contents */}
        <div className="col-span-1 lg:col-span-3">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-navy/10 shadow-sm flex flex-col gap-12 text-sm leading-relaxed text-zinc-700">
            {/* 1. Introduction */}
            <section id="Introduction" className="scroll-mt-28 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section One</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong>Property Junction</strong>. We value your trust and are committed to safeguarding the privacy of your personal data. This Privacy Policy clarifies how we handle your personal information when you access our high-end real estate portal or register for a personalized consultation/site visit with our professional advisors.
              </p>
              <p>
                Our real estate advisory serves as an experienced, trusted partner across Thane, Shilphata, Kharghar, and Navi Mumbai. To match your requirements with precision (from 1 BHK budget-friendly choices to 3 BHK ultra-premium custom penthouses), we collect key points of information to assist you in every step—from inquiry to final documentation.
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section id="Data We Collect" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Two</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                2. Data We Collect
              </h2>
              <p>
                In order to present tailored property choices and facilitate smooth bookings, we may collect the following information:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 font-sans text-xs">
                <li>
                  <strong className="text-brand-navy">Contact Specifics:</strong> Your full name, telephone digits, and email address when you write to us or schedule visits.
                </li>
                <li>
                  <strong className="text-brand-navy">Preferences &amp; Interests:</strong> Your budget ranges, interest in ready-to-move-in or under-construction sectors, and BHK properties of interest (1 BHK, 2 BHK, or 3 BHK layout models).
                </li>
                <li>
                  <strong className="text-brand-navy">Device and Tech Metadata:</strong> Indirect interaction data such as browser type, anonymous behavioral cookies, time of access, page scrolling patterns, and IP layout.
                </li>
              </ul>
            </section>

            {/* 3. How We Use Data */}
            <section id="How We Use Data" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Three</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                3. How We Use Data
              </h2>
              <p>
                Property Junction strictly employs collected user dimensions to enrich our brokerage-free consultancy experience:
              </p>
              <ol className="list-decimal pl-5 flex flex-col gap-2.5 font-sans text-xs">
                <li>
                  <strong className="text-brand-navy">Exorbitant Custom Selection:</strong> To analyze your inputs and present properties that carefully map with your preferences, location metrics, and budgets.
                </li>
                <li>
                  <strong className="text-brand-navy">Transit &amp; Assistance Coordination:</strong> To reserve, organize, and conduct the complimentary physical luxury site visits directly to properties in Shilphata, Thane, or Kharghar.
                </li>
                <li>
                  <strong className="text-brand-navy">Negotiation and Paperwork Assistance:</strong> To guide documentation workflows once you secure an estate, such as assisting you in coordinate the 20:80 payments structure.
                </li>
                <li>
                  <strong className="text-brand-navy">Direct Notification Channels:</strong> To keep you informed via phone calls, SMS notifications, or electronic brochures on newly cataloged, high-yield investment properties.
                </li>
              </ol>
            </section>

            {/* 4. Sharing Policy */}
            <section id="Sharing Policy" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Four</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                4. Sharing Policy
              </h2>
              <p>
                Property Junction maintains an iron-clad policy: <strong>We do not sell, rent, or lease your private personal files to third-party commercial marketing platforms.</strong>
              </p>
              <p>
                Your coordinates are only shared securely with associated premium developers, financial banks processing your home loans, or certified government registrars executing your physical sales deed, specifically to facilitate the property transaction. We may also disclose metrics if lawfully ordered by active Indian courts under the Jurisdiction of Thane, Maharashtra.
              </p>
            </section>

            {/* 5. Your Rights */}
            <section id="Your Rights" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Five</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                5. Your Rights
              </h2>
              <p>
                As a premier partner, you retain total command over your information directories:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 font-sans text-xs">
                <li><strong className="text-brand-navy">Right to Audit:</strong> Request transparent details regarding the exact directories we have logged on your behalf.</li>
                <li><strong className="text-brand-navy">Right to Correction:</strong> Instruct us to modify phone coordinates, name spellings, or interest preferences instantly.</li>
                <li><strong className="text-brand-navy">Right to Erasure ("Right to be Forgotten"):</strong> Request complete purging of all inquiries, bookings, or data profiles from our agency logs at any time.</li>
              </ul>
            </section>

            {/* 6. Security */}
            <section id="Security" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Six</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                6. Security
              </h2>
              <p>
                Our server storage facilities implement modern industry-wide physical and virtual firewall configurations. Sensitive consultation requests are handled over Secure Socket Layer (SSL) transits, and access is rigorously restricted to only registered and verified Property Junction officers under strict NDAs. While no online standard guarantees absolute invincibility, we continually audit our records to shield your real estate interactions.
              </p>
            </section>

            {/* 7. Contact */}
            <section id="Contact" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Seven</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                7. Contact
              </h2>
              <p>
                Should you wish to audit, modify, or strike your credentials, please get in touch with our Compliance Officer through our physical bureau or digital boxes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-xl p-4 flex gap-3">
                  <Mail className="w-5 h-5 text-brand-red shrink-0" />
                  <div className="font-sans">
                    <h5 className="text-xs font-bold text-brand-navy">Electronic Box</h5>
                    <p className="text-[11px] text-zinc-600 mt-0.5">newpropertyjunction123@gmail.com</p>
                    <p className="text-[11px] text-zinc-600">newpropertyjn@gmail.com</p>
                  </div>
                </div>

                <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-xl p-4 flex gap-3">
                  <Phone className="w-5 h-5 text-brand-red shrink-0" />
                  <div className="font-sans">
                    <h5 className="text-xs font-bold text-brand-navy">Telephone Hotlines</h5>
                    <p className="text-[11px] text-zinc-600 mt-0.5">+91 86686 44479</p>
                    <p className="text-[11px] text-zinc-600">+91 73040 30613</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Call to Action */}
            <section id="Call to Action" className="scroll-mt-28 flex flex-col gap-4 border-t border-zinc-100 pt-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-navy uppercase font-sans tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                <span>Section Eight</span>
              </div>
              <h2 className="text-2xl font-belleza font-extrabold text-[#0E2F56]">
                Our Assurance Commitment
              </h2>
              <p>
                Experience premium advisory centered around absolute transparency, stellar speed, and 0% brokerage. Let us safely guide you to your future home or investment masterpiece.
              </p>
              
              <div className="mt-4 p-6 bg-brand-navy text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="font-sans text-center sm:text-left">
                  <h4 className="text-sm font-bold text-brand-bg">Ready to inspect luxury properties?</h4>
                  <p className="text-[11px] text-zinc-300 mt-1">Book an expert transit with Property Junction today.</p>
                </div>
                <button
                  onClick={onBackToHome}
                  className="bg-brand-red hover:bg-brand-bg hover:text-brand-navy text-white text-xs font-serif font-bold tracking-[0.1em] px-6 py-3 rounded-lg duration-300 transition-all cursor-pointer"
                  id="policy-cta-book-direct"
                >
                  START REAL ESTATE DISCOVERY
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
