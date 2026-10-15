import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { serviceCategories } from '../config/site';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface ServicesProps {
  onSelectServiceCategory: (categoryTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceCategory }) => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);

  const currentCategory = serviceCategories.find((c) => c.id === activeTab) || serviceCategories[0];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#141414] text-[#F5F0E7] overflow-hidden">
      {/* Editorial Decorative Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#242424_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header with Inward Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C8B58C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offerings & Coverage</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-none">
              SERVICES
            </h2>
            <p className="text-sm md:text-base text-neutral-400 font-sans max-w-xl">
              From high-voltage wedding rituals to intimate newborn beginnings and dynamic brand launches.
            </p>
          </div>

          <div className="text-xs font-mono tracking-wider uppercase text-neutral-400">
            <span>4 Distinct Celebration Chapters</span>
          </div>
        </motion.div>

        {/* Category Tabs / Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap gap-2 md:gap-3 p-1.5 bg-[#1d1d1d] rounded-lg border border-white/10"
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 text-xs md:text-sm font-sans font-medium tracking-wider uppercase rounded-md transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#C8B58C] text-[#111111] font-semibold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Active Category Editorial Presentation with Animated Transitions */}
        <div className="mt-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 25, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 md:p-12 rounded-xl bg-[#1a1a1a] border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Category Description & CTA */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#C8B58C]">
                    {currentCategory.subtitle}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
                    {currentCategory.title}
                  </h3>

                  <p className="text-sm md:text-base text-neutral-300 font-sans font-light leading-relaxed">
                    {currentCategory.description}
                  </p>

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onSelectServiceCategory(currentCategory.title)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8B58C] text-[#111111] text-xs font-bold tracking-[0.16em] uppercase hover:bg-[#E3D6BC] transition-colors rounded-xs cursor-pointer shadow-md"
                    >
                      <span>Enquire For {currentCategory.title}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Detailed Function List with Staggered items */}
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-400 pb-4 border-b border-white/10">
                    Included Festivities & Moments
                  </h4>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentCategory.items.map((item, itemIdx) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: itemIdx * 0.05 }}
                        className="p-4 rounded-md bg-[#222222] border border-white/5 flex items-start gap-3 group hover:border-[#C8B58C]/40 transition-colors"
                      >
                        <div className="mt-0.5 p-1 rounded-xs bg-[#C8B58C]/15 text-[#C8B58C]">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm text-neutral-200 font-sans font-medium">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Core Deliverable Note */}
                  <div className="mt-6 p-4 rounded-md bg-[#161616] border border-white/5 text-xs text-neutral-400 font-sans flex items-center justify-between">
                    <span>All shoots include 9:16 vertical storytelling, trending audio curation & prompt cuts.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
