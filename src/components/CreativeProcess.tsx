import React from 'react';
import { motion } from 'motion/react';
import { creativeProcess } from '../config/site';
import { Sparkles } from 'lucide-react';

const processContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const processCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const CreativeProcess: React.FC = () => {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-[#F5F0E7] text-[#111111] overflow-hidden">
      {/* Editorial Decorative Hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#111111]/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header with Inward Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#111111]/10"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#111111]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#C8B58C]" />
              <span>How We Collaborate</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111111] leading-none">
              CREATIVE PROCESS
            </h2>
            <p className="text-sm md:text-base text-[#111111]/75 font-sans max-w-xl">
              From the initial creative brainstorm to seamless on-ground capture and final deliverables.
            </p>
          </div>

          <div className="text-xs font-mono tracking-wider uppercase text-[#111111]/50">
            <span>Seamless 4-Stage Journey</span>
          </div>
        </motion.div>

        {/* 4 Process Cards with Staggered Inward Reveal */}
        <motion.div
          variants={processContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {creativeProcess.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={processCardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative p-8 rounded-lg bg-[#EFE8DC] border border-[#111111]/10 flex flex-col justify-between hover:border-[#111111]/40 transition-colors group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#111111]/10">
                  <span className="font-serif text-4xl font-light text-[#C8B58C] tracking-tight">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#111111]/50">
                    Stage {idx + 1}
                  </span>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="font-serif text-2xl font-medium text-[#111111] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#111111]/60">
                    {step.tagline}
                  </p>
                  <p className="pt-2 text-xs md:text-sm text-[#111111]/75 font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#111111]/10 space-y-1.5">
                {step.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#111111]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B58C]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
