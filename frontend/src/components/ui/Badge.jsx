import React from 'react';

export default function Badge({ variant = 'default', children, className = '' }) {
  const baseClasses = 'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-pill transition-colors';

  const variants = {
    // 0% EMI orange badge - Snapmint style
    orange: 'bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]',
    warning: 'bg-orange-100 text-[#EA580C] font-bold border border-orange-200',
    // Recommended violet badge
    recommended: 'bg-[#4B1FD6] text-white font-medium text-[11px] tracking-wide uppercase',
    // "NEW" / "HOT" badges
    new: 'bg-violet-100 text-[#4B1FD6] font-bold tracking-wider text-[11px]',
    hot: 'bg-red-100 text-red-600 font-bold tracking-wider text-[11px]',
    // Green cashback / discount badge
    green: 'bg-green-100 text-green-700 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium',
    // Neutral gray badge
    gray: 'bg-zinc-100 text-zinc-600 font-medium',
    // Default
    default: 'bg-zinc-100 text-zinc-800',
  };

  const selectedVariant = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${selectedVariant} ${className}`}>
      {children}
    </span>
  );
}
