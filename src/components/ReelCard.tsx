import React, { useState } from 'react';
import { Play, ExternalLink, X, Maximize2 } from 'lucide-react';
import { ReelItem } from '../types';

interface ReelCardProps {
  reel: ReelItem;
  isPlayingInline: boolean;
  onTogglePlayInline: (reelId: string) => void;
  onOpenModal: (reel: ReelItem) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  isPlayingInline,
  onTogglePlayInline,
  onOpenModal,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const embedUrl = `https://www.instagram.com/reel/${reel.reelId}/embed/?utm_source=ig_embed`;

  return (
    <div
      className={`group relative flex flex-col justify-end aspect-[9/16] w-full bg-[#141414] rounded-2xl overflow-hidden border transition-all duration-500 ${
        isPlayingInline
          ? 'border-[#C8B58C] shadow-[0_0_50px_rgba(200,181,140,0.35)] ring-1 ring-[#C8B58C]/40'
          : 'border-white/10 hover:border-[#C8B58C]/50 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_50px_-10px_rgba(200,181,140,0.25)] hover:-translate-y-1'
      }`}
      aria-label={`Reel: ${reel.title}`}
    >
      {/* Subtle Inner Ambient Glow on the Card Edge */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-b from-white/5 via-transparent to-[#C8B58C]/10 opacity-60 group-hover:opacity-100 transition-opacity" />

      {isPlayingInline ? (
        /* Active Inline Player inside the Card */
        <div className="relative w-full h-full bg-black flex flex-col">
          {/* Top Control Bar over the inline player */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between p-3.5 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#C8B58C] bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
              Playing Reel
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(reel);
                }}
                className="p-1.5 rounded-full bg-black/70 text-white/80 hover:text-white hover:bg-black transition-colors"
                title="Expand details"
                aria-label="Expand reel details"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePlayInline(reel.id);
                }}
                className="p-1.5 rounded-full bg-black/80 text-[#C8B58C] border border-[#C8B58C]/40 hover:bg-[#C8B58C] hover:text-[#111111] transition-colors"
                title="Stop playback"
                aria-label="Stop playback"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Inline Loading Indicator */}
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-black/85">
              <div className="w-8 h-8 border-2 border-[#C8B58C] border-t-transparent rounded-full animate-spin mb-3" />
              <span className="text-xs uppercase tracking-widest text-[#C8B58C] font-mono">
                Loading Reel...
              </span>
            </div>
          )}

          {/* Instagram Embed Iframe */}
          <iframe
            src={embedUrl}
            title={reel.title}
            className={`w-full h-full border-0 relative z-20 transition-opacity duration-300 ${
              iframeLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Quick External Fallback Bar at Bottom */}
          <div className="absolute bottom-0 inset-x-0 z-30 p-2.5 bg-gradient-to-t from-black/95 to-transparent flex items-center justify-between text-[11px] text-neutral-300">
            <span className="truncate max-w-[180px] font-mono text-[10px] text-[#C8B58C]">
              {reel.title}
            </span>
            <a
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-white hover:text-[#C8B58C]"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        /* Poster & Play Action View */
        <div
          onClick={() => onTogglePlayInline(reel.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onTogglePlayInline(reel.id);
            }
          }}
          className="relative w-full h-full flex flex-col justify-end cursor-pointer"
        >
          {/* Background Poster Image */}
          <img
            src={reel.posterImage}
            alt={reel.title}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104 ${
              imageLoaded ? 'opacity-90' : 'opacity-0'
            }`}
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#161616] flex items-center justify-center p-6 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8B58C]/60">
                {reel.title}
              </span>
            </div>
          )}

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

          {/* Top Subtle Instagram Link */}
          <div className="absolute top-4 right-4 z-10">
            <a
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/80 transition-all border border-white/10"
              title="Open on Instagram"
              aria-label="Open on Instagram"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Centered Minimal Play Button with Ambient Glow */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-[#C8B58C]/80 flex items-center justify-center text-[#C8B58C] shadow-[0_0_30px_rgba(200,181,140,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C8B58C] group-hover:text-[#111111] group-hover:shadow-[0_0_40px_rgba(200,181,140,0.6)]">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>

          {/* Bottom Minimalist Content Metadata */}
          <div className="relative z-10 p-6 space-y-1.5 pointer-events-none">
            <span className="text-[11px] text-[#C8B58C] font-mono tracking-wider uppercase block">
              {reel.category}
            </span>

            <h3 className="font-serif text-2xl text-white font-normal tracking-tight leading-tight group-hover:text-[#F5F0E7] transition-colors">
              {reel.title}
            </h3>

            <div className="pt-2 flex items-center justify-between text-[11px] text-white/60 font-sans font-light">
              <span className="text-neutral-400">Tap to play inline</span>
              <span className="text-[#C8B58C] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
