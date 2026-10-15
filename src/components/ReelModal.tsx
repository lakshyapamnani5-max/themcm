import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, Sparkles, MessageSquare, Clock, MapPin } from 'lucide-react';
import { ReelItem } from '../types';
import { siteConfig } from '../config/site';

interface ReelModalProps {
  reel: ReelItem | null;
  onClose: () => void;
  onEnquireForStyle?: (category: string) => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, onClose, onEnquireForStyle }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!reel) return;
    setIframeLoaded(false);
    setIframeError(false);

    // Trap focus to close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [reel, onClose]);

  if (!reel) return null;

  const embedUrl = `https://www.instagram.com/reel/${reel.reelId}/embed/?utm_source=ig_embed`;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi Prachi! I saw "${reel.title}" from your cinematic portfolio and would love to check availability for my event.`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Reel viewer: ${reel.title}`}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#141414] border border-[#C8B58C]/25 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-[#F5F0E7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-right close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-30 p-2.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-all border border-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C8B58C]"
          aria-label="Close reel viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Frame / Instagram Embed (9:16 aspect container) */}
        <div className="relative w-full md:w-[380px] shrink-0 bg-black flex items-center justify-center aspect-[9/16] max-h-[50vh] md:max-h-[85vh] overflow-hidden">
          {reel.directVideoUrl ? (
            <video
              src={reel.directVideoUrl}
              poster={reel.posterImage}
              controls
              autoPlay
              playsInline
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              {/* Fallback poster while loading or if iframe blocked */}
              {!iframeLoaded && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={reel.posterImage}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-60 filter blur-xs"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                    <div className="w-10 h-10 border-2 border-[#C8B58C] border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-xs uppercase tracking-widest text-[#C8B58C] font-mono">
                      Loading Reel...
                    </span>
                  </div>
                </div>
              )}

              {/* Supported Instagram Embed iframe */}
              <iframe
                src={embedUrl}
                title={reel.title}
                className={`w-full h-full relative z-10 border-0 transition-opacity duration-300 ${
                  iframeLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIframeLoaded(true)}
                onError={() => {
                  setIframeError(true);
                  setIframeLoaded(true);
                }}
              />

              {iframeError && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/90">
                  <p className="text-sm text-neutral-300 mb-4">
                    Instagram embed preview is protected by third-party cookies.
                  </p>
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C8B58C] text-[#111111] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-[#E3D6BC]"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Reel Details & Story Context */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#141414]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#C8B58C] font-mono tracking-wider uppercase">
              <span className="bg-[#C8B58C]/10 px-2.5 py-1 rounded-full border border-[#C8B58C]/20">
                {reel.category}
              </span>
              {reel.duration && (
                <span className="flex items-center gap-1 text-white/60">
                  <Clock className="w-3 h-3 text-[#C8B58C]" />
                  {reel.duration}
                </span>
              )}
              {reel.location && (
                <span className="flex items-center gap-1 text-white/60">
                  <MapPin className="w-3 h-3 text-[#C8B58C]" />
                  {reel.location}
                </span>
              )}
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-white font-normal leading-snug">
              {reel.title}
            </h3>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-sans font-light">
              {reel.description}
            </p>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C8B58C]" />
                <span className="text-[#C8B58C] font-medium">Captured & Edited by The Main Character Media</span>
              </div>
              <p className="leading-normal">
                Vertical 9:16 high-definition cinematic capture engineered for instant engagement, authentic reactions, and unforgettable mobile feeds.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C8B58C] text-[#111111] hover:bg-[#E3D6BC] text-xs font-bold tracking-wider uppercase transition-colors rounded-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Book This Style on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onEnquireForStyle?.(reel.category);
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#C8B58C]/40 text-[#C8B58C] hover:bg-[#C8B58C]/10 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm"
            >
              <span>Custom Quote Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
