import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, CalendarClock, CreditCard, User } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '#', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag, active: true },
    { name: 'EMI Dues', path: '#', icon: CalendarClock },
    { name: 'Limit', path: '#', icon: CreditCard },
    { name: 'Profile', path: '#', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E4E4E7] px-2 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isCurrentActive = item.name === 'Shop'
            ? location.pathname.startsWith('/shop') || location.pathname.startsWith('/products')
            : false;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isCurrentActive
                  ? 'text-[#4B1FD6]'
                  : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <div className={`p-1 rounded-full ${isCurrentActive ? 'bg-[#EDE9FE]' : ''}`}>
                <Icon className={`w-5 h-5 ${isCurrentActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 ${isCurrentActive ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
