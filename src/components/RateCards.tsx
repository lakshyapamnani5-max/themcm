import React, { useState, useRef } from 'react';
import {
  ArrowUpRight,
  Check,
  Clock,
  Calendar,
  X,
} from 'lucide-react';

interface RateCardsProps {
  onSelectPackage: (packageName: string) => void;
}

interface CelebrationCard {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  coverage: string;
  functions: string;
  deliverables: string[];
  festivities: string[];
}

const THREE_RATE_CARDS: CelebrationCard[] = [
  {
    id: 'weddings-love',
    subtitle: 'Full-spectrum celebration & ritual storytelling',
    title: 'Weddings & Love',
    description:
      'From intimate pre-wedding moments to high-octane sangeet nights and sacred rituals. We capture the pulse of your wedding without making you pose uncomfortably.',
    coverage: 'Single or Multi-day celebration coverage',
    functions: 'Up to 5 ceremonies (Haldi, Mehendi, Sangeet, Ceremony, Reception)',
    deliverables: [
      '5–7 bespoke cinematic 9:16 Instagram Reels',
      'Real-time raw story drops during the celebration',
      'Complete raw video footage library delivered within 24 hours',
      'Bespoke audio curation & editorial color grading',
      'Dedicated behind-the-scenes with the couple & close crew',
    ],
    festivities: [
      'Weddings & Pre-Wedding Shoots',
      'Haldi & Mehendi Festivities',
      'Sangeet & Cocktail Nights',
      'Garba / Raas & Pheras',
    ],
  },
  {
    id: 'lifes-celebrations',
    subtitle: 'Milestones that deserve main-character spotlight',
    title: "Life's Celebrations",
    description:
      'Birthdays that turn legendary, silver anniversaries, and personal triumphs captured with vibrant, modern storytelling.',
    coverage: 'Half-day or full-evening party coverage',
    functions: 'Milestone birthdays, anniversaries, & private celebrations',
    deliverables: [
      '2–4 high-retention vertical Reels synced to trending audio',
      'Real-time guest & dance floor story drops',
      'High-resolution raw video archive delivered within 24 hours',
      'Aesthetic color grading optimized for Instagram & TikTok',
    ],
    festivities: [
      'Milestone Birthdays (18th, 21st, 50th+)',
      'Wedding Anniversaries & Vow Renewals',
      'Private Dinners & Cocktail Parties',
      'Family Celebrations',
    ],
  },
  {
    id: 'brands-events',
    subtitle: 'Social-first commercial & experience visuals',
    title: 'Brands & Events',
    description:
      'Content that makes audiences stop scrolling. Tailored for modern lifestyle brands, dynamic pop-ups, product launches, and corporate experiences.',
    coverage: '4 to 8 hours commercial event presence',
    functions: 'Product launch, pop-up, corporate gala, or exhibition',
    deliverables: [
      '2–4 polished commercial vertical Reels for brand reach',
      'Full B-roll archive with attendees & key moments',
      'Same-day teaser clip for instant PR & press stories',
      'Commercial usage licensing for all brand channels',
    ],
    festivities: [
      'Brand Launches & Pop-Up Experiences',
      'Corporate Summits & Galas',
      'Art Exhibitions & Showcases',
      'Commercial Campaign Shoots',
    ],
  },
];

export const RateCards: React.FC<RateCardsProps> = ({ onSelectPackage }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [selectedDetailCard, setSelectedDetailCard] = useState<CelebrationCard | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.children;
    if (items[index]) {
      items[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveCardIndex(index);
    }
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth === 0) return;
    const newIdx = Math.round(scrollLeft / clientWidth);
    if (newIdx !== activeCardIndex && newIdx >= 0 && newIdx < THREE_RATE_CARDS.length) {
      setActiveCardIndex(newIdx);
    }
  };

  const handleOpenDetails = (card: CelebrationCard) => {
    setSelectedDetailCard(card);
  };

  return (
    <section id="rates" className="relative py-24 md:py-36 bg-[#111111] text-[#F5F0E7] overflow-hidden">
      {/* Ambient Lighting Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(200,181,140,0.15)_0%,rgba(200,181,140,0.04)_50%,transparent_75%)] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="pb-12 border-b border-white/10">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white/95">
            Rate Cards
          </h2>
          <p className="mt-2 text-xs md:text-sm text-neutral-400 font-sans max-w-xl">
            "Every celebration is different. Tell us about your plans for a personalised quote."
          </p>
        </div>

        {/* Carousel Container (All Three Cards) */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="mt-12 flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
        >
          {THREE_RATE_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="w-[85vw] sm:w-[420px] md:w-[calc(33.333%-1.35rem)] shrink-0 snap-center flex flex-col"
            >
              <div
                onClick={() => handleOpenDetails(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenDetails(card);
                  }
                }}
                className="group relative flex-1 p-8 md:p-10 rounded-2xl bg-[#171717] border border-white/10 hover:border-[#C8B58C]/60 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(200,181,140,0.22)] hover:-translate-y-1 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8B58C]"
              >
                {/* Inner Ambient Glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-[#C8B58C]/10 opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Content: Subtitle, Title, Description */}
                <div className="space-y-4 relative z-10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#C8B58C] block">
                    {card.subtitle}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight group-hover:text-[#F5F0E7] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm md:text-base text-neutral-300 font-sans font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Clickable Details Indicator */}
                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                  <span className="text-[#C8B58C] font-mono uppercase tracking-widest flex items-center gap-1.5 group-hover:underline underline-offset-4">
                    <span>View Details & Deliverables</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-neutral-500 font-mono text-[11px]">
                    Card 0{idx + 1}/03
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {THREE_RATE_CARDS.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === idx ? 'w-8 bg-[#C8B58C]' : 'w-2 bg-white/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Expanded Details Modal when any card is clicked */}
      {selectedDetailCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedDetailCard(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedDetailCard.title} Details`}
        >
          <div
            className="relative w-full max-w-2xl bg-[#181818] border border-white/15 rounded-2xl p-8 md:p-10 text-[#F5F0E7] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedDetailCard(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/15 transition-all"
              aria-label="Close details dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8B58C]">
                {selectedDetailCard.subtitle}
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-white font-medium">
                {selectedDetailCard.title}
              </h3>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {selectedDetailCard.description}
              </p>
            </div>

            {/* Scope / Coverage */}
            <div className="p-4 rounded-xl bg-[#202020] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C8B58C] shrink-0" />
                <span>{selectedDetailCard.coverage}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C8B58C] shrink-0" />
                <span>{selectedDetailCard.functions}</span>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[#C8B58C]">
                Included Deliverables & Production
              </p>
              <ul className="space-y-2.5">
                {selectedDetailCard.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <Check className="w-4 h-4 text-[#C8B58C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inquire Action Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-neutral-400 font-sans italic">
                Personalised quotes tailored to function timelines & locations.
              </p>

              <button
                onClick={() => {
                  const pkgName = selectedDetailCard.title;
                  setSelectedDetailCard(null);
                  onSelectPackage(pkgName);
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#C8B58C] text-[#111111] text-xs font-bold tracking-[0.16em] uppercase rounded-xs hover:bg-[#E3D6BC] transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Quote For This</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
