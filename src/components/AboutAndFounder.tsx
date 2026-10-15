import React from 'react';
import { motion } from 'motion/react';
import { ASSETS, siteConfig, specialCapabilities } from '../config/site';
import { Sparkles, Video, Instagram, Zap, Clock, Compass } from 'lucide-react';

const capabilityIcons = [Video, Sparkles, Instagram, Zap, Clock, Compass];

const cardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const AboutAndFounder: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-[#F5F0E7] text-[#111111] overflow-hidden">
      {/* Decorative Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#111111]/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Brand Ethos Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl space-y-6"
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#111111]/60">
            <Sparkles className="w-3.5 h-3.5 text-[#C8B58C]" />
            <span>About The Brand</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
            {siteConfig.about.title}
          </h2>

          <p className="text-lg md:text-xl text-[#111111]/85 font-sans font-light leading-relaxed">
            {siteConfig.about.body}
          </p>
        </motion.div>

        {/* Special Capabilities Grid (6 features) with Inward Stagger */}
        <motion.div
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 pt-12 border-t border-[#111111]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {specialCapabilities.map((cap, idx) => {
            const Icon = capabilityIcons[idx % capabilityIcons.length];
            return (
              <motion.div
                key={cap.title}
                variants={cardItem}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="space-y-3 group p-4 -m-4 rounded-xl transition-colors hover:bg-[#EFE9DD]/50"
              >
                <div className="w-10 h-10 rounded-xs bg-[#111111]/5 flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#C8B58C] transition-colors shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#111111] tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-xs md:text-sm text-[#111111]/70 font-sans leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Founder Story Section: Prachi Pamnani */}
        <div className="mt-28 pt-20 border-t border-[#111111]/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Founder Portrait with Inward Slide & Scale */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative group rounded-xl overflow-hidden aspect-[3/4] bg-[#222222] border border-[#111111]/10 shadow-xl">
                <img
                  src={ASSETS.founderPortrait}
                  alt="Prachi Pamnani, Founder of Main Character Media"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <p className="font-serif text-2xl font-medium tracking-tight">
                    {siteConfig.founder.name}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#C8B58C] mt-1">
                    {siteConfig.founder.role} · 21
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-[#EFE9DD] border border-[#111111]/5 text-xs text-[#111111]/75 flex items-center justify-between">
                <span>Direct on-ground creative direction</span>
                <span className="font-mono text-[11px] text-[#111111]/50">Unscripted & Unfiltered</span>
              </div>
            </motion.div>

            {/* Right: Founder Personal Words with Inward Slide */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#111111]/60">
                <span>Meet The Founder</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] leading-tight">
                "Some people collect memories. I collect moments, camera shots, and approximately a million creative ideas."
              </h3>

              <div className="space-y-4 text-base md:text-lg text-[#111111]/80 font-sans font-light leading-relaxed">
                {siteConfig.founder.paragraphs.slice(1).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#111111]/10 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#111111]/70">
                <span className="px-3 py-1.5 bg-[#111111] text-[#F5F0E7]">No Boring Frames</span>
                <span className="px-3 py-1.5 bg-[#111111] text-[#F5F0E7]">No Copy-Paste Creativity</span>
                <span className="px-3 py-1.5 border border-[#111111]/20 text-[#111111]">Stories With Personality</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
