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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-2 py-1.5">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const active = isCurrentActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
                active ? 'text-brand' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={`text-xs mt-0.5 ${active ? 'font-semibold text-brand' : 'font-normal'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
