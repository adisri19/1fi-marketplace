import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BrandCard({ brand }) {
  return (
    <Link
      to={`/brands/${brand.id}`}
      className="group bg-white rounded-card border border-[#E4E4E7] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#4B1FD6] hover:shadow-[0_8px_24px_rgba(75,31,214,0.12)] hover:scale-[1.01] transition-all duration-150 flex flex-col justify-between"
    >
      <div>
        <div className="w-16 h-16 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform overflow-hidden">
          <img
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              // Fallback if clearbit is blocked or fails
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=EDE9FE&color=4B1FD6&bold=true`;
            }}
          />
        </div>

        <h3 className="font-bold text-lg text-zinc-900 leading-tight group-hover:text-[#4B1FD6] transition-colors">
          {brand.name}
        </h3>

        <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
          {brand.tagline}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-[#4B1FD6]">
        <span>{brand.productCount} {brand.productCount === 1 ? 'product' : 'products'}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
