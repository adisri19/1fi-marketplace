import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center text-white font-bold text-xs">
            1Fi
          </div>
          <span className="font-bold text-lg text-brand tracking-tight">
            1Fi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-brand font-semibold'
                    : 'text-gray-600 hover:text-gray-900 font-medium'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
