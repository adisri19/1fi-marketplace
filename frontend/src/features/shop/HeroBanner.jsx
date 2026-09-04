import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  const scrollToProducts = () => {
    const el = document.getElementById('marketplace-heading');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#3B1FA8] to-[#5B21B6] rounded-b-[24px] py-14 px-8 text-white my-6">
      <div className="max-w-xl text-left">
        <h1 className="text-3xl font-bold leading-tight text-white">
          Shop today,<br />
          pay later using<br />
          Mutual Funds.
        </h1>

        <p className="text-sm text-white/70 max-w-xs mt-4 leading-relaxed">
          No credit score. No interest.<br />
          Backed by your investments.
        </p>

        <button
          type="button"
          onClick={scrollToProducts}
          className="mt-6 inline-flex items-center gap-2 bg-white text-brand px-5 py-2.5 rounded-btn font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
