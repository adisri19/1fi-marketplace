import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, CalendarClock, CreditCard, User } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'EMI Dues', path: '/emi-dues', icon: CalendarClock },
    { name: 'Limit', path: '/limit', icon: CreditCard },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const isCurrentActive = (item) => {
    if (item.path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (item.path === '/shop') {
      return (
        location.pathname.startsWith('/shop') ||
        location.pathname.startsWith('/products') ||
        location.pathname.startsWith('/brands')
      );
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E4E4E7] px-2 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isCurrentActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                active ? 'text-[#4B1FD6]' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <div className={`p-1 rounded-full ${active ? 'bg-[#EDE9FE]' : ''}`}>
                <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 ${active ? 'font-bold' : 'font-medium'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
