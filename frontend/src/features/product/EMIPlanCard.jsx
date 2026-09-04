import React from 'react';
import { formatINR } from '../../utils/formatCurrency';
import Badge from '../../components/ui/Badge';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onSelect(plan.id);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(plan.id)}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer rounded-xl p-4 transition-all duration-150 flex items-center justify-between gap-4 outline-none ${
        isSelected
          ? 'bg-[#EDE9FE] border-2 border-[#4B1FD6] shadow-sm'
          : 'bg-white border border-[#E4E4E7] hover:border-[#DDD6FE] hover:bg-violet-50/30'
      }`}
    >
      {/* Left side: Radio indicator and details */}
      <div className="flex items-center gap-3.5">
        {/* Radio Circle */}
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'border-[#4B1FD6] bg-[#4B1FD6]'
              : 'border-zinc-300 bg-white'
          }`}
        >
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>

        <div>
          <div className="text-[16px] font-bold text-zinc-900 leading-tight">
            {formatINR(plan.monthlyAmount)} × {plan.tenureMonths} months
          </div>
          {plan.cashback && plan.cashback > 0 && (
            <div className="text-xs font-semibold text-[#16A34A] mt-1 flex items-center gap-1">
              <span>✦</span> Additional cashback of {formatINR(plan.cashback)}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Badges */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        {plan.isPopular && (
          <Badge variant="recommended">
            RECOMMENDED
          </Badge>
        )}
        {plan.interestRate === 0 ? (
          <Badge variant="orange">
            0% EMI
          </Badge>
        ) : (
          <Badge variant="gray">
            {plan.interestRate}% EMI
          </Badge>
        )}
      </div>
    </div>
  );
}
