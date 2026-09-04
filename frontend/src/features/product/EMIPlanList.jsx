import React from 'react';
import EMIPlanCard from './EMIPlanCard';

export default function EMIPlanList({ plans = [], selectedPlanId, onSelectPlan }) {
  if (!plans || plans.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
        No EMI plans configured for this variant.
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">
        EMI plans backed by mutual funds
      </p>

      <div
        className="flex flex-col gap-2"
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
