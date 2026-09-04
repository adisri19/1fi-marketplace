import React, { useState } from 'react';
import { formatINR } from '../../utils/formatCurrency';
import BottomNav from '../../components/layout/BottomNav';
import Toast from '../../components/ui/Toast';
import {
  CalendarClock,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

const BRAND_COLORS = {
  Apple:    { bg: '1d1d1f', fg: 'ffffff' },
  Samsung:  { bg: '1428a0', fg: 'ffffff' },
  OnePlus:  { bg: 'eb0029', fg: 'ffffff' },
  Google:   { bg: '4285f4', fg: 'ffffff' },
  Xiaomi:   { bg: 'ff6900', fg: 'ffffff' },
  vivo:     { bg: '415fff', fg: 'ffffff' },
  iQOO:     { bg: '000000', fg: 'ffffff' },
  OPPO:     { bg: '1d4ed8', fg: 'ffffff' },
  Realme:   { bg: 'ffd700', fg: '000000' },
  Motorola: { bg: '5c2d91', fg: 'ffffff' },
  Nothing:  { bg: '000000', fg: 'ffffff' },
  ASUS:     { bg: '00539c', fg: 'ffffff' },
};

export default function EMIDuesPage() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const activeDues = [
    {
      id: 'due-1',
      brand: 'Apple',
      productName: 'Apple iPhone 17 Pro',
      variantLabel: '256GB – Natural Titanium',
      imageUrl: 'https://www.apple.com/newsroom/images/2025/09/apple-introduces-iphone-17-pro/article/Apple-iPhone-17-Pro-hero-250909.jpg.og.jpg',
      monthlyAmount: 11242,
      tenureMonths: 12,
      paidMonths: 4,
      remainingMonths: 8,
      nextDueDate: 'Oct 3, 2026',
    },
    {
      id: 'due-2',
      brand: 'Samsung',
      productName: 'Samsung Galaxy S25 Ultra',
      variantLabel: '256GB – Titanium Black',
      imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/in/2501/gallery/in-galaxy-s25-ultra-sm-s938-sm-s938bzkgins-thumb-542032229',
      monthlyAmount: 9999,
      tenureMonths: 6,
      paidMonths: 3,
      remainingMonths: 3,
      nextDueDate: 'Oct 3, 2026',
    },
  ];

  const completedDues = [
    {
      id: 'comp-1',
      brand: 'OnePlus',
      productName: 'OnePlus 12',
      variantLabel: '256GB – Flowy Emerald',
      imageUrl: 'https://image01.oneplus.net/ebp/202401/11/1-m00-4b-0e-rb8bwWWfbryAAlSRAAFgq4xt0pA423.png',
      totalPaid: 54999,
      tenureMonths: 12,
      closedDate: 'Aug 15, 2026',
    },
    {
      id: 'comp-2',
      brand: 'Google',
      productName: 'Google Pixel 8a',
      variantLabel: '128GB – Bay Blue',
      imageUrl: 'https://lh3.googleusercontent.com/XN7d6ioFLMCQ3fBjpYbnGFPFpNJX9fIhchOsJF3k4kO7V84ixdH5mcGb01gzn9N6bMuH_B5Sm-fzm9FPAY09bVjBV8mq=rw-e365-w1440',
      totalPaid: 52999,
      tenureMonths: 6,
      closedDate: 'May 10, 2026',
    },
  ];

  const handlePayNow = (amount, title) => {
    setToastMessage(`✓ Payment of ${formatINR(amount)} processed successfully for ${title}!`);
    setIsToastVisible(true);
  };

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            EMI Dues
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Auto-debit from mutual fund dividends or pay upfront
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-white border border-[#E4E4E7] text-xs font-semibold text-zinc-600 shadow-xs">
          <span>All Accounts</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Summary Banner (Violet Card) */}
      <div className="bg-gradient-to-r from-[#3B1FA8] via-[#4820BD] to-[#4B1FD6] rounded-2xl p-6 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="text-xs uppercase tracking-wider font-semibold text-white/80">
            Total Outstanding Loan Balance
          </div>
          <div className="text-3xl font-extrabold tracking-tight">₹2,47,416</div>
          <div className="text-xs text-violet-200">
            Next combined installment: <strong>₹21,241</strong> due on{' '}
            <strong className="text-white">Oct 3, 2026</strong>
          </div>
        </div>

        <button
          onClick={() => handlePayNow(21241, 'all active dues')}
          className="self-start sm:self-auto px-6 py-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm rounded-pill shadow-md transition-all active:scale-95 flex items-center gap-2"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Next EMI (₹21,241)</span>
        </button>
      </div>

      {/* Active EMIs Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-900">Active Smartphone Loans</h2>

        <div className="space-y-4">
          {activeDues.map((due) => {
            const percent = Math.round((due.paidMonths / due.tenureMonths) * 100);
            return (
              <div
                key={due.id}
                className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-xs hover:border-[#DDD6FE] transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                      <img
                        src={due.imageUrl}
                        alt={due.productName}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          const colors = BRAND_COLORS[due.brand] || { bg: '6b21a8', fg: 'ffffff' };
                          e.target.src = `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent(due.productName.split(' ').slice(0, 3).join('+'))}`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-zinc-900 leading-tight">
                        {due.productName}
                      </h3>
                      <p className="text-xs text-zinc-500">{due.variantLabel}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-pill border border-emerald-100 shrink-0">
                    On Track
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-zinc-50/80 p-3 rounded-xl border border-zinc-100">
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Monthly Amount</span>
                    <strong className="text-sm font-bold text-[#4B1FD6]">
                      {formatINR(due.monthlyAmount)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Tenure</span>
                    <strong className="text-sm font-bold text-zinc-800">
                      {due.tenureMonths} Months
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Progress</span>
                    <strong className="text-sm font-bold text-zinc-800">
                      {due.paidMonths} of {due.tenureMonths} paid
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[11px]">Next Due Date</span>
                    <strong className="text-sm font-bold text-[#EA580C]">
                      {due.nextDueDate}
                    </strong>
                  </div>
                </div>

                {/* Progress bar and pay button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="flex-1 space-y-1">
                    <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4B1FD6] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-400 font-medium">
                      <span>{due.remainingMonths} EMIs remaining</span>
                      <span className="font-bold text-[#4B1FD6]">{percent}% complete</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePayNow(due.monthlyAmount, due.productName)}
                    className="px-4 py-2 bg-zinc-100 hover:bg-[#4B1FD6] hover:text-white text-zinc-800 font-bold text-xs rounded-pill transition-all self-end sm:self-auto flex items-center gap-1.5"
                  >
                    <span>Pay EMI ({formatINR(due.monthlyAmount)})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completed EMIs Section (Collapsible) */}
      <div className="border-t border-zinc-200 pt-4">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white text-zinc-700 font-bold text-sm transition-colors"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Completed Loans ({completedDues.length})</span>
          </div>
          {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showCompleted && (
          <div className="space-y-3 mt-3">
            {completedDues.map((comp) => (
              <div
                key={comp.id}
                className="bg-white rounded-xl p-4 border border-[#E4E4E7] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-50 border p-1 flex items-center justify-center">
                    <img
                      src={comp.imageUrl}
                      alt={comp.productName}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        const colors = BRAND_COLORS[comp.brand] || { bg: '6b21a8', fg: 'ffffff' };
                        e.target.src = `https://placehold.co/600x600/${colors.bg}/${colors.fg}?text=${encodeURIComponent(comp.productName.split(' ').slice(0, 3).join('+'))}`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-zinc-900">{comp.productName}</h4>
                    <p className="text-zinc-500">{comp.variantLabel}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">
                    Fully Paid
                  </span>
                  <div className="text-zinc-400 mt-1">Closed {comp.closedDate}</div>
                </div>
              </div>
            ))}
          </div>
        )}
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
