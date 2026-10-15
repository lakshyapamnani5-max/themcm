import React, { useState, useRef } from 'react';
import { portfolioReels } from '../config/site';
import { ReelItem } from '../types';
import { ReelCard } from './ReelCard';
import { ReelModal } from './ReelModal';

interface SelectedWorkProps {
  onEnquireForStyle?: (category: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onEnquireForStyle }) => {
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
  const [activeInlineReelId, setActiveInlineReelId] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleTogglePlayInline = (reelId: string) => {
    setActiveInlineReelId((prev) => (prev === reelId ? null : reelId));
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.children;
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const newIdx = Math.round(scrollLeft / clientWidth);
    if (newIdx !== activeIndex && newIdx >= 0 && newIdx < portfolioReels.length) {
      setActiveIndex(newIdx);
    }
  };

  return (
    <section id="work" className="relative py-24 md:py-36 bg-[#0e0e0e] text-[#F5F0E7] overflow-hidden">
      {/* Ambient Light Layers for Minimal Luxury Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(200,181,140,0.18)_0%,rgba(200,181,140,0.06)_45%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-[400px] h-[400px] bg-[#C8B58C]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-[400px] h-[400px] bg-[#C8B58C]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Minimal & Aesthetic Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/95">
              Our Cinematic Portfolio
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#C8B58C]/90">
              9:16 Vertical
            </span>
          </div>
        </div>

        {/* Reels Showcase with Ambient Backlight:
            - Mobile: Swipeable Carousel
            - Desktop: 3-Card Minimal Grid */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="mt-10 md:mt-16 flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0"
        >
          {portfolioReels.map((reel) => (
            <div
              key={reel.id}
              className="w-[82vw] max-w-[340px] md:w-auto shrink-0 snap-center transition-all duration-500"
            >
              <ReelCard
                reel={reel}
                isPlayingInline={activeInlineReelId === reel.id}
                onTogglePlayInline={handleTogglePlayInline}
                onOpenModal={(r) => setActiveModalReel(r)}
              />
            </div>
          ))}
        </div>

        {/* Minimal Pagination Dots on Mobile */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-2">
          {portfolioReels.map((reel, idx) => (
            <button
              key={reel.id}
              onClick={() => scrollToIndex(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6 bg-[#C8B58C]' : 'w-2 bg-white/20'
              }`}
              aria-label={`Go to reel ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Expanded Modal if clicked */}
      <ReelModal
        reel={activeModalReel}
        onClose={() => setActiveModalReel(null)}
        onEnquireForStyle={onEnquireForStyle}
      />
    </section>
  );
};
