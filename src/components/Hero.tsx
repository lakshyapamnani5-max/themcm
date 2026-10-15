import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { ASSETS, siteConfig } from '../config/site';

interface HeroProps {
  onOpenEnquiry: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, onExploreWork }) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between bg-[#0e0e0e] text-[#F5F0E7] overflow-hidden">
      {/* Full 9:16 Background Image with Ambient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.heroBanner}
          alt="The Main Character Media Atmosphere"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 animate-fade-in"
        />

        {/* Multi-stage Scrim for Clean Contrast & Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#0e0e0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      {/* Main Hero Content: Generous Space & Balanced Framing */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-40 sm:pt-48 md:pt-52 pb-16 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-4xl space-y-8 md:space-y-10">
          {/* Oversized Editorial Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-light leading-[1.05] tracking-tight text-white drop-shadow-md text-balance">
            {siteConfig.tagline}
          </h1>

          {/* Action CTAs - Positioned further downwards */}
          <div className="pt-16 sm:pt-20 md:pt-28 flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#C8B58C] text-[#111111] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#E3D6BC] transition-all duration-200 active:scale-98 shadow-2xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <span>Let's Create</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111]" />
            </button>

            <button
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black/40 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-[0.18em] uppercase hover:bg-white/15 hover:border-white transition-all duration-200 active:scale-98 cursor-pointer shadow-lg"
            >
              <span>Explore Selected Work</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="hidden lg:flex absolute bottom-12 right-10 z-10 flex-col items-center gap-2 text-white/50 text-[10px] font-mono uppercase tracking-widest pointer-events-none">
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C8B58C]" />
      </div>
    </section>
  );
};
