import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Home, CalendarClock, CreditCard, User } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Shop', path: '/shop' },
    { name: 'EMI Dues', path: '/emi-dues' },
    { name: 'Limit', path: '/limit' },
    { name: 'Profile', path: '/profile' },
  ];

  const isLinkActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    if (path === '/shop') {
      return (
        location.pathname.startsWith('/shop') ||
        location.pathname.startsWith('/products') ||
        location.pathname.startsWith('/brands')
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3B1FA8] to-[#5B21B6] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-[#4B1FD6]/20 group-hover:scale-105 transition-transform">
            1Fi
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-tight text-zinc-900">
              1Fi <span className="text-[#4B1FD6] font-semibold text-sm">Marketplace</span>
            </span>
            <span className="text-[10px] text-zinc-400 -mt-0.5 tracking-wide uppercase font-medium">
              Mutual Fund EMIs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F5F3FF] p-1 rounded-pill border border-[#E4E4E7]/70">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-pill text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#4B1FD6] text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right action / Trust badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-pill bg-[#EDE9FE] text-[#4B1FD6] text-xs font-semibold border border-[#DDD6FE]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B1FD6]" />
            <span>0% Interest Backed</span>
          </div>

          <Link
            to="/shop"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-violet-50 hover:bg-violet-100 text-[#4B1FD6] transition-colors border border-violet-100"
            title="Browse Shop"
          >
            <ShoppingBag className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
