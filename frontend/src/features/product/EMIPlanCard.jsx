import React from 'react';
import { formatINR } from '../../utils/formatCurrency';

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
      className={`bg-white rounded-xl border p-4 cursor-pointer hover:bg-gray-50 outline-none flex items-center justify-between gap-4 transition-[border-color] duration-100 ${
        isSelected
          ? 'border-gray-200 border-l-4 border-l-brand'
          : 'border-gray-200'
      }`}
    >
      {/* Left side: Radio indicator and details */}
      <div className="flex items-center gap-3">
        {/* Radio Circle */}
        <div
          className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 ${
            isSelected
              ? 'bg-brand'
              : 'border border-gray-200 bg-white'
          }`}
        >
          {isSelected && (
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-gray-900 leading-tight">
            <span>{formatINR(plan.monthlyAmount)} / mo × {plan.tenureMonths} months</span>
            {plan.isPopular && (
              <span className="text-xs text-brand font-normal ml-1">· Recommended</span>
            )}
          </div>
          {plan.cashback && plan.cashback > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              + {formatINR(plan.cashback)} cashback
            </p>
          )}
        </div>
      </div>

      {/* Right side: Interest rate */}
      <div className="shrink-0 text-right">
        {plan.interestRate === 0 ? (
          <span className="text-xs text-success font-medium">
            0% interest
          </span>
        ) : (
          <span className="text-xs text-warning font-medium">
            {plan.interestRate}% interest
          </span>
        )}
      </div>
    </div>
  );
}
