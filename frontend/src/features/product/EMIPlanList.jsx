import React from 'react';
import EMIPlanCard from './EMIPlanCard';

export default function EMIPlanList({ plans = [], selectedPlanId, onSelectPlan }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="bg-zinc-50 border border-dashed border-zinc-300 rounded-xl p-6 text-center text-zinc-500 text-sm">
        No EMI plans configured for this variant.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-zinc-900 tracking-tight">
          Choose EMI Tenure
        </h3>
        <span className="text-xs text-zinc-500 font-medium">
          Backed by Mutual Funds
        </span>
      </div>

      <div
        className="space-y-2.5"
        role="radiogroup"
        aria-label="Choose EMI Tenure"
      >
        {plans.map((plan) => (
          <EMIPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlanId === plan.id}
            onSelect={onSelectPlan}
          />
        ))}
      </div>
    </div>
  );
}
