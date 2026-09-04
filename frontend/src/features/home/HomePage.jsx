import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { formatINR } from '../../utils/formatCurrency';
import BottomNav from '../../components/layout/BottomNav';
import {
  ShoppingBag,
  CalendarClock,
  CreditCard,
  User,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import { useUserStore } from '../../store/userStore';

export default function HomePage() {
  const { data: featuredProducts } = useProducts({ limit: 4 });
  const { user } = useUserStore();

  const firstName = user?.name?.split(' ')[0] || 'Friend';
  const totalLimit = user?.limit || 250000;
  const usedLimit = user?.usedLimit || 0;
  const availableLimit = totalLimit - usedLimit;
  const usedPercent = totalLimit > 0 ? Math.round((usedLimit / totalLimit) * 100) : 0;

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const activeEMIs = [
    {
      id: 'emi-1',
      title: 'iPhone 17 Pro (256GB)',
      color: 'Natural Titanium',
      monthlyAmount: 11242,
      paidMonths: 8,
      totalMonths: 12,
      nextDue: 'Oct 3, 2026',
      icon: '📱',
      colorBadge: 'bg-violet-50 text-[#4B1FD6]',
    },
    {
      id: 'emi-2',
      title: 'Samsung Galaxy S25 Ultra',
      color: 'Titanium Black',
      monthlyAmount: 9999,
      paidMonths: 3,
      totalMonths: 6,
      nextDue: 'Oct 3, 2026',
      icon: '📱',
      colorBadge: 'bg-blue-50 text-blue-600',
    },
  ];

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-6 space-y-8">
      {/* Greeting & Available Limit Card */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {getGreeting()}, {firstName} 👋
            </h1>
            <p className="text-sm text-zinc-500 mt-0.5">
              Your Mutual Fund EMI Dashboard & Spending Limit
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-[#EDE9FE] text-[#4B1FD6] text-xs font-bold self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{formatINR(totalLimit * 1.4)} Investments Pledged</span>
          </div>
        </div>

        {/* Limit Card */}
        <div className="bg-gradient-to-br from-[#3B1FA8] via-[#4820BD] to-[#5B21B6] rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-[#4B1FD6]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                Available Credit Limit
              </span>
              <Link
                to="/limit"
                className="text-xs font-bold text-violet-200 hover:text-white flex items-center gap-1"
              >
                <span>Manage Limit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black tracking-tight">
                {formatINR(availableLimit)}
              </span>
              <span className="text-xs sm:text-sm text-white/70">
                free of {formatINR(totalLimit)} total limit
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${usedPercent || 5}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/80 font-medium">
                <span>Used: {formatINR(usedLimit)} ({usedPercent}%)</span>
                <span>Available: {formatINR(availableLimit)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Row */}
      <section>
        <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
          Quick Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/shop"
            className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs hover:border-[#4B1FD6] hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-[#4B1FD6] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              🛍️
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-[#4B1FD6]">Shop</div>
              <div className="text-[11px] text-zinc-400">50+ Phones</div>
            </div>
          </Link>

          <Link
            to="/emi-dues"
            className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs hover:border-[#4B1FD6] hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#EA580C] flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              📊
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-[#EA580C]">EMI Dues</div>
              <div className="text-[11px] text-zinc-400">Next: Oct 3</div>
            </div>
          </Link>

          <Link
            to="/limit"
            className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs hover:border-[#4B1FD6] hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              💰
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600">Limit</div>
              <div className="text-[11px] text-zinc-400">₹2.5L Total</div>
            </div>
          </Link>

          <Link
            to="/profile"
            className="p-4 rounded-2xl bg-white border border-[#E4E4E7] shadow-xs hover:border-[#4B1FD6] hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
              👤
            </div>
            <div>
              <div className="text-sm font-bold text-zinc-900 group-hover:text-blue-600">Profile</div>
              <div className="text-[11px] text-zinc-400">Verified KYC</div>
            </div>
          </Link>
        </div>
      </section>

      {/* Active EMI Plans */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900">Your Active EMIs</h2>
          <Link
            to="/emi-dues"
            className="text-xs font-bold text-[#4B1FD6] hover:underline flex items-center gap-1"
          >
            <span>View All Schedules</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeEMIs.map((emi) => {
            const percent = Math.round((emi.paidMonths / emi.totalMonths) * 100);
            return (
              <div
                key={emi.id}
                className="bg-white rounded-card border border-[#E4E4E7] p-5 shadow-xs space-y-4 hover:border-violet-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{emi.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">{emi.title}</h3>
                      <p className="text-xs text-zinc-400">{emi.color}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-pill border border-emerald-100">
                    Active
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-xs text-zinc-600">
                  <span className="font-bold text-zinc-900 text-sm">
                    {formatINR(emi.monthlyAmount)}
                    <span className="text-xs font-normal text-zinc-400">/mo</span>
                  </span>
                  <span>
                    {emi.paidMonths} of {emi.totalMonths} months done
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4B1FD6] rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span>Next Due: <strong className="text-zinc-700">{emi.nextDue}</strong></span>
                    <span className="font-bold text-[#4B1FD6]">{percent}% paid</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Deals (Horizontal Scroll) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Top Deals This Week</h2>
            <p className="text-xs text-zinc-500">Popular flagship smartphones with 0% interest tenure</p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#4B1FD6] hover:underline flex items-center gap-1"
          >
            <span>See All 50+</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {(featuredProducts || []).slice(0, 4).map((p) => {
            const v = p.variants?.[0] || {};
            return (
              <Link
                key={p.id}
                to={`/products/${p.slug}`}
                className="bg-white rounded-card p-4 border border-[#E4E4E7] shadow-xs hover:shadow-md hover:border-[#4B1FD6] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-28 bg-zinc-50 rounded-xl p-2 mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={v.imageUrl}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/600x600/1a1a2e/ffffff?text=${encodeURIComponent(p.name)}`;
                      }}
                    />
                  </div>
                  <div className="text-[11px] font-bold text-zinc-400 uppercase">{p.brand?.name || p.brand}</div>
                  <h3 className="font-semibold text-xs text-zinc-900 line-clamp-1 group-hover:text-[#4B1FD6]">
                    {p.name}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#4B1FD6]">from {formatINR(v.price)}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                    0% EMI
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Investment Insight Banner */}
      <section className="bg-gradient-to-r from-violet-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SIP Growth Engine Active</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Your ₹50,000 monthly SIP is funding your EMIs 💚
          </h3>
          <p className="text-xs text-white/80">
            Earning 12.4% annualized mutual fund returns while your phone is delivered home.
          </p>
        </div>
        <Link
          to="/limit"
          className="shrink-0 px-5 py-2.5 bg-white text-violet-900 hover:bg-violet-50 font-bold text-xs rounded-pill shadow-md transition-colors"
        >
          View Collateral Stats
        </Link>
      </section>

      <BottomNav />
    </main>
  );
}
