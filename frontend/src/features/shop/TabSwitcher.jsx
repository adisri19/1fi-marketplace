import React from 'react';

export default function TabSwitcher({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: '1fi-marketplace', label: '1Fi Marketplace' },
  ];

  return (
    <div className="flex items-center justify-center my-6">
      <div className="inline-flex p-1 bg-white border border-gray-200 rounded-pill max-w-full overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isMarketplace = tab.id === '1fi-marketplace';

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`px-4 sm:px-6 py-2 rounded-pill text-sm transition-all whitespace-nowrap ${
                isActive
                  ? `bg-white ${isMarketplace ? 'text-brand' : 'text-gray-900'} font-medium shadow-sm`
                  : 'text-gray-500 hover:text-gray-900 font-normal'
              }`}
            >
              {isMarketplace ? (
                <span className="flex items-center gap-1.5">
                  {tab.label}
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                </span>
              ) : (
                tab.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
