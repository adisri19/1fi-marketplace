import React from 'react';
import { Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#3B1FA8] via-[#441CB8] to-[#4B1FD6] text-white shadow-xl shadow-[#4B1FD6]/15 my-6 p-6 sm:p-8 md:p-10">
      {/* Background ambient glowing circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left column */}
        <div className="max-w-lg space-y-4 text-left">
          {/* Top-left pill badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white/10 backdrop-blur-md border border-white/25 text-xs font-semibold tracking-wider text-white">
            <span>✦</span>
            <span>NO-COST EMIs</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-white">
            Shop today,<br />
            Pay later using<br />
            <span className="text-violet-200">Mutual funds.</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-md font-normal">
            No credit score required. No interest.<br />
            Backed by your investments.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-white/90">
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <span className="text-emerald-300">✓</span> 100% Paperless Approval
            </div>
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
              <span className="text-emerald-300">✓</span> Keep Earning Returns
            </div>
          </div>
        </div>

        {/* Right side decorative illustration */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
            {/* Soft decorative backdrop */}
            <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse blur-xl" />
            
            {/* Collage of shopping & device representations */}
            <div className="relative grid grid-cols-2 gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                📱
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                💻
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                🛍️
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl shadow-inner">
                ✨
              </div>
            </div>

            {/* Floating pill badge */}
            <div className="absolute -bottom-2 -left-2 bg-emerald-500 text-white font-bold text-[11px] px-3 py-1 rounded-full shadow-lg border border-emerald-400 flex items-center gap-1">
              <span>0% Interest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
