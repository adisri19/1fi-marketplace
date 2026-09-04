import React from 'react';

export default function TabSwitcher({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: '1fi-marketplace', label: '1Fi Marketplace' },
  ];

  return (
    <div className="flex items-center justify-center my-6">
      <div className="inline-flex p-1 bg-white border border-[#E4E4E7] rounded-pill shadow-sm max-w-full overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 sm:px-6 py-2 rounded-pill text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#4B1FD6] text-white shadow-md shadow-[#4B1FD6]/20'
                  : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              {tab.label}
              {tab.id === '1fi-marketplace' && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-violet-100 text-[#4B1FD6]'
                }`}>
                  Live
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
