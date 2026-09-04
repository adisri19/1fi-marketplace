import React, { useState } from 'react';
import { formatINR } from '../../utils/formatCurrency';
import BottomNav from '../../components/layout/BottomNav';
import Toast from '../../components/ui/Toast';
import {
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  HelpCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function LimitPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const totalLimit = 250000;
  const usedAmount = 162500;
  const availableAmount = totalLimit - usedAmount;
  const pledgedMFValue = 350000;
  const utilizationPercentage = 65;

  // SVG Circular progress gauge calculations
  const size = 220;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (utilizationPercentage / 100) * circumference;

  const handleIncreaseLimit = () => {
    setToastMessage('✓ Link Mutual Funds request initiated! Redirecting to CAMS / KFintech portal...');
    setIsToastVisible(true);
  };

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          Your EMI Credit Limit
        </h1>
        <p className="text-sm text-zinc-500 mt-0.5">
          Backed by your verified mutual fund investments via CAMS & KFintech
        </p>
      </div>

      {/* SVG Circular Progress Gauge */}
      <div className="bg-white rounded-2xl p-8 border border-[#E4E4E7] shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
            {/* Background Track Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#EDE9FE"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Active Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#4B1FD6"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Text inside gauge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs uppercase tracking-wider font-bold text-zinc-400">
              Total Limit
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight mt-0.5">
              {formatINR(totalLimit)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#4B1FD6] bg-[#EDE9FE] px-2.5 py-0.5 rounded-full mt-2">
              <span>{utilizationPercentage}% Utilized</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-500 mt-6 max-w-sm leading-relaxed">
          You currently have <strong>{formatINR(availableAmount)}</strong> ready to spend instantly on zero-interest smartphone tenures.
        </p>
      </div>

      {/* 4-Metric Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] shadow-xs">
          <span className="text-xs text-zinc-400 font-semibold block">Total Limit</span>
          <strong className="text-xl font-bold text-zinc-900 mt-1 block">
            {formatINR(totalLimit)}
          </strong>
          <span className="text-[11px] text-zinc-500 mt-1 block">Max approved</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] shadow-xs">
          <span className="text-xs text-zinc-400 font-semibold block">Used Limit</span>
          <strong className="text-xl font-bold text-[#EA580C] mt-1 block">
            {formatINR(usedAmount)}
          </strong>
          <span className="text-[11px] text-orange-600 mt-1 block">2 active loans</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] shadow-xs">
          <span className="text-xs text-zinc-400 font-semibold block">Available</span>
          <strong className="text-xl font-bold text-emerald-600 mt-1 block">
            {formatINR(availableAmount)}
          </strong>
          <span className="text-[11px] text-emerald-700 mt-1 block">Spend today</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] shadow-xs">
          <span className="text-xs text-zinc-400 font-semibold block">Mutual Fund Value</span>
          <strong className="text-xl font-bold text-[#4B1FD6] mt-1 block">
            {formatINR(pledgedMFValue)}
          </strong>
          <span className="text-[11px] text-violet-600 mt-1 block">+12.8% Returns</span>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E4E4E7] shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#4B1FD6]" />
          <h2 className="text-lg font-bold text-zinc-900">How Mutual Fund EMI Limit Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-[#4B1FD6]">
              <span className="w-5 h-5 rounded-full bg-[#4B1FD6] text-white text-xs flex items-center justify-center">
                1
              </span>
              <span>Mutual funds pledged as collateral</span>
            </div>
            <p className="text-xs text-zinc-600 pl-7 leading-relaxed">
              Your existing equity or hybrid mutual fund units stay in your demat account and continue earning market returns.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-[#4B1FD6]">
              <span className="w-5 h-5 rounded-full bg-[#4B1FD6] text-white text-xs flex items-center justify-center">
                2
              </span>
              <span>Up to 70% borrowing power</span>
            </div>
            <p className="text-xs text-zinc-600 pl-7 leading-relaxed">
              Get 70% of equity fund value and 85% of debt fund value instantly credited as your 1Fi shopping limit.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-[#4B1FD6]">
              <span className="w-5 h-5 rounded-full bg-[#4B1FD6] text-white text-xs flex items-center justify-center">
                3
              </span>
              <span>Dividends & compounding continue</span>
            </div>
            <p className="text-xs text-zinc-600 pl-7 leading-relaxed">
              Never miss market rallies. Your portfolio compounds while you pay low monthly EMIs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F5F3FF] border border-[#DDD6FE]/60 space-y-1">
            <div className="flex items-center gap-2 font-bold text-sm text-[#4B1FD6]">
              <span className="w-5 h-5 rounded-full bg-[#4B1FD6] text-white text-xs flex items-center justify-center">
                4
              </span>
              <span>Instant lien release on repayment</span>
            </div>
            <p className="text-xs text-zinc-600 pl-7 leading-relaxed">
              Once tenure finishes, mutual fund lien is unpledged automatically with zero prepayment penalties.
            </p>
          </div>
        </div>

        {/* Increase limit action */}
        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-sm text-zinc-900">Want a higher spending limit?</h3>
            <p className="text-xs text-zinc-500">
              Link additional mutual fund folios from HDFC, SBI, ICICI, or Nippon
            </p>
          </div>
          <button
            onClick={handleIncreaseLimit}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#4B1FD6] hover:bg-[#3B0764] text-white text-xs font-bold rounded-pill shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Increase My Limit</span>
          </button>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />

      <BottomNav />
    </main>
  );
}
