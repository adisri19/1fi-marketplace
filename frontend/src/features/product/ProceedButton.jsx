import React from 'react';
import { formatINR } from '../../utils/formatCurrency';
import { ArrowRight, Lock } from 'lucide-react';

export default function ProceedButton({ selectedPlan, onProceed }) {
  const isEnabled = Boolean(selectedPlan);

  const buttonText = isEnabled
    ? `Buy on ${selectedPlan.tenureMonths} months EMI`
    : 'Select an EMI plan to proceed';

  return (
    <>
      {/* Desktop View: placed below EMI list */}
      <div className="hidden md:block pt-4">
        <button
          type="button"
          disabled={!isEnabled}
          onClick={onProceed}
          className={`w-full h-12 rounded-pill font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
            isEnabled
              ? 'bg-[#4B1FD6] hover:bg-[#3B0764] text-white shadow-lg shadow-[#4B1FD6]/25 active:scale-[0.99] cursor-pointer'
              : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
          }`}
        >
          {isEnabled ? (
            <>
              <span>{buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>{buttonText}</span>
            </>
          )}
        </button>

        {isEnabled && (
          <p className="text-center text-xs text-zinc-400 mt-2 font-medium">
            Mutual Fund collateral pledged securely • No impact on your credit card limit
          </p>
        )}
      </div>

      {/* Mobile View: Sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E4E7] p-4 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {isEnabled && (
            <div className="flex-1">
              <div className="text-xs text-zinc-500 font-medium">Monthly EMI</div>
              <div className="text-base font-bold text-[#4B1FD6] leading-none">
                {formatINR(selectedPlan.monthlyAmount)}
                <span className="text-xs text-zinc-600 font-normal">/mo</span>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!isEnabled}
            onClick={onProceed}
            className={`flex-1 h-12 rounded-pill font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              isEnabled
                ? 'bg-[#4B1FD6] text-white shadow-md shadow-[#4B1FD6]/30 active:scale-[0.98]'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
            }`}
          >
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </>
  );
}
