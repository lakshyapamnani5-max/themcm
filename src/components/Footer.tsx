import React, { useState } from 'react';
import { siteConfig, serviceCategories } from '../config/site';
import { Instagram, ArrowUpRight, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="relative bg-[#0d0d0d] text-[#F5F0E7] pt-20 pb-12 border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
            {/* Col 1: Brand & Wordmark */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-white block">
                {siteConfig.brandName}
              </span>
              <p className="text-xs font-mono uppercase tracking-widest text-[#C8B58C]">
                Founded by Prachi Pamnani
              </p>
              <p className="text-sm text-neutral-400 font-sans max-w-sm leading-relaxed">
                {siteConfig.about.body}
              </p>
              <div className="pt-2 text-xs text-neutral-400 font-sans">
                {siteConfig.contact.locationNotice}
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8B58C]">
                Exploration
              </p>
              <ul className="space-y-2.5 text-xs text-neutral-300 font-sans tracking-wide">
                <li>
                  <button
                    onClick={() => handleScrollTo('#work')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Selected Work (Reels)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('#rates')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Rate Cards & Scope
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('#about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About & Founder Story
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('#process')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Creative Process
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('#services')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Services & Festivities
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('#contact')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Enquiry Form
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Services Breakdown */}
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8B58C]">
                Festivities & Moments
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleScrollTo('#services')}
                    className="px-3 py-1.5 rounded-xs bg-[#1a1a1a] border border-white/10 text-xs text-neutral-300 hover:text-white hover:border-[#C8B58C]/50 transition-colors"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5 space-y-2">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  Instagram Channel
                </p>
                {siteConfig.contact.instagramUrl ? (
                  <a
                    href={siteConfig.contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#C8B58C] hover:text-[#E3D6BC]"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Follow Main Character Media</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : (
                  <p className="text-xs text-neutral-400 font-sans">
                    Official handle pending final release. Three featured reels showcased in the portfolio.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Privacy */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
            <p>
              © {currentYear} {siteConfig.brandName}. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-neutral-300 underline underline-offset-4 cursor-pointer"
              >
                Privacy & Data Notice
              </button>
              <span>·</span>
              <span>Stories with personality.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Notice Modal */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
          onClick={() => setShowPrivacyModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-lg bg-[#161616] border border-white/10 rounded-xl p-8 text-[#F5F0E7] space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C8B58C]">
              <Shield className="w-4 h-4" />
              <span>Privacy & Content Notice</span>
            </div>

            <h4 className="font-serif text-2xl font-medium text-white">
              Data Privacy & Media Ethics
            </h4>

            <div className="space-y-3 text-xs md:text-sm text-neutral-300 font-sans leading-relaxed">
              <p>
                <strong>Client Confidentiality:</strong> All enquiry information, event dates, and contact details submitted through this website are used strictly for communicating directly with you regarding Main Character Media production services. We never sell, rent, or distribute client contact data.
              </p>
              <p>
                <strong>Media Rights:</strong> Celebration videos and Instagram Reels are published strictly with client consent. Couples and event organizers always receive their private archives.
              </p>
              <p>
                <strong>Submissions Storage:</strong> Form inquiries are stored locally for immediate studio review and dispatched to our secured webhook endpoint if configured.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-5 py-2.5 bg-[#C8B58C] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E3D6BC]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
