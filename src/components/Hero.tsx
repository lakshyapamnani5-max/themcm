import React from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ASSETS, siteConfig } from '../config/site';

interface HeroProps {
  onOpenEnquiry: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, onExploreWork }) => {
  return (
    <section className="relative min-h-[100dvh] w-full flex flex-col justify-between bg-[#0e0e0e] text-[#F5F0E7] overflow-hidden">
      {/* Full 9:16 Background Image with Ambient Scrim & Cinematic Zoom-Inward */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={ASSETS.heroBanner}
          alt="The Main Character Media Atmosphere"
          referrerPolicy="no-referrer"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover object-center"
        />

        {/* Ambient Subtle Pulsing Light Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-[#C8B58C]/15 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Multi-stage Scrim for Clean Contrast & Blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#0e0e0e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      {/* Main Hero Content: Generous Space & Balanced Framing */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-40 sm:pt-48 md:pt-52 pb-16 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-4xl space-y-8 md:space-y-10">
          {/* Oversized Editorial Serif Headline with Inward Stagger */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-light leading-[1.05] tracking-tight text-white drop-shadow-md text-balance"
          >
            {siteConfig.tagline}
          </motion.h1>

          {/* Action CTAs - Smooth Inward Float & Interactive Physics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pt-10 sm:pt-14 md:pt-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 35px rgba(200, 181, 140, 0.45)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#C8B58C] text-[#111111] text-xs font-bold tracking-[0.18em] uppercase transition-all duration-200 shadow-2xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white cursor-pointer rounded-xs"
            >
              <span>Let's Create</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.6)' }}
              whileTap={{ scale: 0.97 }}
              onClick={onExploreWork}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-black/40 backdrop-blur-md border border-white/30 text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer shadow-lg rounded-xs"
            >
              <span>Explore Selected Work</span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt with Fade In */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hidden lg:flex absolute bottom-12 right-10 z-10 flex-col items-center gap-2 text-white/50 text-[10px] font-mono uppercase tracking-widest pointer-events-none"
      >
        <span className="[writing-mode:vertical-lr]">Scroll</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#C8B58C]" />
      </motion.div>
    </section>
  );
};
