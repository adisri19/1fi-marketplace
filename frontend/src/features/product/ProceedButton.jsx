import React, { useState } from 'react';
import { formatINR } from '../../utils/formatCurrency';
import { ArrowRight, Check } from 'lucide-react';

export default function ProceedButton({ selectedPlan, onProceed, isSuccess = false }) {
  const [clicked, setClicked] = useState(false);
  const isEnabled = Boolean(selectedPlan);

  const showSuccess = isSuccess || clicked;

  const handleClick = (e) => {
    if (!isEnabled) return;
    setClicked(true);
    if (onProceed) onProceed(e);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  const buttonText = showSuccess
    ? '✓ Plan Selected'
    : isEnabled
    ? `Buy on ${selectedPlan.tenureMonths} months EMI`
    : 'Select an EMI plan to proceed';

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block pt-4">
        <button
          type="button"
          disabled={!isEnabled}
          onClick={handleClick}
          className={`w-full h-12 rounded-btn font-medium text-base transition-all flex items-center justify-center gap-2 ${
            showSuccess
              ? 'bg-success text-white'
              : isEnabled
              ? 'bg-brand hover:opacity-95 text-white cursor-pointer'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {showSuccess ? (
            <>
              <Check className="w-4 h-4" />
              <span>{buttonText}</span>
            </>
          ) : (
            <>
              <span>{buttonText}</span>
              {isEnabled && <ArrowRight className="w-4 h-4" />}
            </>
          )}
        </button>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {isEnabled && (
            <div className="flex-1">
              <div className="text-xs text-gray-400">Monthly EMI</div>
              <div className="text-base font-semibold text-gray-900 leading-none mt-0.5">
                {formatINR(selectedPlan.monthlyAmount)}
                <span className="text-xs text-gray-400 font-normal">/mo</span>
              </div>
            </div>
          )}

          <button
            type="button"
            disabled={!isEnabled}
            onClick={handleClick}
            className={`flex-1 h-12 rounded-btn font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              showSuccess
                ? 'bg-success text-white'
                : isEnabled
                ? 'bg-brand text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </>
  );
}
