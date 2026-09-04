import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

const STEPS = ['welcome', 'name', 'contact', 'limit', 'done'];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    limitChoice: 250000,
  });
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const finish = () => {
    setUser({
      name: form.name.trim() || 'Valued User',
      email: form.email.trim() || 'user@1fi.in',
      phone: form.phone.trim() || '+91 98765 43210',
      limit: form.limitChoice,
      usedLimit: 0,
      avatar: null,
      kycVerified: true,
      joinedAt: new Date().toISOString(),
      mutualFunds: [
        {
          id: 'mf-1',
          name: 'HDFC Top 100 Large Cap Fund',
          invested: Math.round(form.limitChoice * 0.8),
          ytdReturns: '+14.2%',
          pledgedAmount: Math.round(form.limitChoice * 0.5),
          folio: 'Folio ***8921',
        },
        {
          id: 'mf-2',
          name: 'Axis Bluechip Growth Fund',
          invested: Math.round(form.limitChoice * 0.7),
          ytdReturns: '+11.8%',
          pledgedAmount: Math.round(form.limitChoice * 0.5),
          folio: 'Folio ***4512',
        },
      ],
      activeEMIs: [],
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#F5F3FF] flex flex-col items-center justify-center px-4 py-8">
      {/* Progress indicators */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i <= step ? 'w-8 bg-[#4B1FD6]' : 'w-2 bg-zinc-300'
            }`}
          />
        ))}
      </div>

      {/* STEP 0 — Welcome */}
      {step === 0 && (
        <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-[#E4E4E7] shadow-lg animate-in fade-in">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#3B1FA8] to-[#5B21B6] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md shadow-[#4B1FD6]/30">
            <span className="text-white text-3xl font-extrabold">1Fi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 mb-3 leading-tight">
            Shop today, pay later<br />using Mutual Funds
          </h1>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            No credit score needed. Your existing mutual fund investments
            become your zero-interest shopping limit.
          </p>
          <button
            onClick={next}
            className="w-full bg-[#4B1FD6] hover:bg-[#3B0764] text-white py-4 rounded-2xl font-bold text-base shadow-md shadow-[#4B1FD6]/25 transition-all active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      )}

      {/* STEP 1 — Name */}
      {step === 1 && (
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-[#E4E4E7] shadow-lg animate-in fade-in">
          <div className="w-10 h-10 rounded-full bg-violet-100 text-[#4B1FD6] flex items-center justify-center text-lg font-bold mb-4">
            👤
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-1">What's your name?</h2>
          <p className="text-zinc-500 text-xs mb-6">We'll use this to personalize your 1Fi experience.</p>
          <input
            type="text"
            placeholder="Full name (e.g. Aditya Srivastava)"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && form.name.trim() && next()}
            className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 text-base focus:border-[#4B1FD6] outline-none mb-4 transition-colors"
            autoFocus
          />
          <button
            onClick={next}
            disabled={!form.name.trim()}
            className="w-full bg-[#4B1FD6] hover:bg-[#3B0764] text-white py-3.5 rounded-2xl font-bold text-sm disabled:opacity-40 transition-all active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 2 — Contact */}
      {step === 2 && (
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-[#E4E4E7] shadow-lg animate-in fade-in">
          <div className="w-10 h-10 rounded-full bg-violet-100 text-[#4B1FD6] flex items-center justify-center text-lg font-bold mb-4">
            📱
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-1">Contact details</h2>
          <p className="text-zinc-500 text-xs mb-6">For instant EMI notifications and account security.</p>
          <div className="space-y-3 mb-4">
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#4B1FD6] outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full border-2 border-zinc-200 rounded-xl px-4 py-3 text-sm focus:border-[#4B1FD6] outline-none transition-colors"
            />
          </div>
          <button
            onClick={next}
            className="w-full bg-[#4B1FD6] hover:bg-[#3B0764] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Continue
          </button>
          <button
            onClick={() => {
              update('email', 'aditya.demo@1fi.in');
              update('phone', '+91 98765 43210');
              next();
            }}
            className="w-full mt-2 text-zinc-400 hover:text-zinc-600 text-xs py-2 transition-colors"
          >
            Skip for now
          </button>
        </div>
      )}

      {/* STEP 3 — Limit */}
      {step === 3 && (
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-[#E4E4E7] shadow-lg animate-in fade-in">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold mb-4">
            💰
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-1">Choose starting limit</h2>
          <p className="text-zinc-500 text-xs mb-6">
            Based on your mutual fund value. You can increase this anytime.
          </p>
          <div className="space-y-2.5 mb-5">
            {[100000, 250000, 500000, 1000000].map((amt) => {
              const isSelected = form.limitChoice === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => update('limitChoice', amt)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-[#4B1FD6] bg-[#EDE9FE]'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <span className="font-bold text-sm text-zinc-900">
                    ₹{(amt / 100000).toFixed(amt < 100000 ? 1 : 0)} Lakh
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white text-[#4B1FD6]' : 'text-zinc-500'
                  }`}>
                    {amt === 100000 && 'Starter'}
                    {amt === 250000 && 'Popular ⭐'}
                    {amt === 500000 && 'Premium'}
                    {amt === 1000000 && 'Elite'}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={next}
            className="w-full bg-[#4B1FD6] hover:bg-[#3B0764] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-[0.98]"
          >
            Continue
          </button>
        </div>
      )}

      {/* STEP 4 — Done */}
      {step === 4 && (
        <div className="text-center max-w-sm bg-white p-8 rounded-3xl border border-[#E4E4E7] shadow-lg animate-in fade-in">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-zinc-900 mb-2">
            Welcome, {form.name.split(' ')[0] || 'Friend'}!
          </h2>
          <p className="text-zinc-500 text-xs mb-5 leading-relaxed">
            Your 1Fi Marketplace account is activated with a shopping credit limit of{' '}
            <strong className="text-zinc-900">
              ₹{(form.limitChoice / 100000).toFixed(form.limitChoice < 100000 ? 1 : 0)} Lakh
            </strong>.
          </p>
          <div className="bg-[#EDE9FE] border border-[#DDD6FE] rounded-2xl p-4 mb-6 text-left space-y-1.5">
            <p className="text-xs text-[#4B1FD6] font-bold">What's next?</p>
            <ul className="text-xs text-zinc-600 space-y-1">
              <li className="flex items-center gap-1.5">
                <span className="text-[#4B1FD6] font-bold">✓</span> Browse 50+ smartphones on 0% EMI
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#4B1FD6] font-bold">✓</span> Mutual funds pledged securely
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-[#4B1FD6] font-bold">✓</span> Find nearby partner stores
              </li>
            </ul>
          </div>
          <button
            onClick={finish}
            className="w-full bg-[#4B1FD6] hover:bg-[#3B0764] text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-[#4B1FD6]/30 transition-all active:scale-[0.98]"
          >
            Start Shopping 🛍️
          </button>
        </div>
      )}
    </div>
  );
}
