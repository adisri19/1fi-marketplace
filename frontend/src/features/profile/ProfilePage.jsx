import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { formatINR } from '../../utils/formatCurrency';
import BottomNav from '../../components/layout/BottomNav';
import Toast from '../../components/ui/Toast';
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Bell,
  Lock,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Plus,
  Edit2,
  X,
} from 'lucide-react';

export default function ProfilePage() {
  const { user, getInitials, updateUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Edit Profile modal state
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const saveProfile = (e) => {
    e.preventDefault();
    if (!editForm.name.trim()) return;
    updateUser(editForm);
    setEditing(false);
    setToastMessage('✓ Profile updated successfully!');
    setIsToastVisible(true);
  };

  const handleLogout = () => {
    if (window.confirm('Log out and clear your profile data?')) {
      clearUser();
      navigate('/onboarding');
    }
  };

  const linkedFunds = user?.mutualFunds?.length > 0
    ? user.mutualFunds
    : [
        {
          id: 'fund-1',
          name: 'HDFC Top 100 Large Cap Fund',
          invested: 150000,
          ytdReturns: '+14.2%',
          pledgedAmount: 80000,
          folio: 'Folio ***8921',
        },
        {
          id: 'fund-2',
          name: 'Axis Bluechip Growth Fund',
          invested: 200000,
          ytdReturns: '+11.8%',
          pledgedAmount: 82500,
          folio: 'Folio ***4512',
        },
      ];

  const handleAction = (msg) => {
    setToastMessage(`✓ ${msg}`);
    setIsToastVisible(true);
  };

  return (
    <main className="min-h-screen pb-24 md:pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pt-6 space-y-6">
      {/* Profile Header (Violet Gradient Banner) */}
      <div className="bg-gradient-to-r from-[#3B1FA8] via-[#4820BD] to-[#5B21B6] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-[72px] h-[72px] rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-inner">
          {getInitials()}
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {user?.name || 'Valued User'}
            </h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 self-center sm:self-auto">
              <ShieldCheck className="w-3 h-3" />
              Verified CAMS KYC
            </span>
          </div>
          <p className="text-xs text-white/80 mt-1">
            {user?.email || 'user@1fi.in'} • {user?.phone || '+91 98765 43210'}
          </p>
          <button
            onClick={() => {
              setEditForm({
                name: user?.name || '',
                email: user?.email || '',
                phone: user?.phone || '',
              });
              setEditing(true);
            }}
            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-pill bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-zinc-900">Edit Profile</h3>
              <button
                onClick={() => setEditing(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:border-[#4B1FD6] outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:border-[#4B1FD6] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-500 block mb-1">Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full border border-zinc-300 rounded-xl px-3 py-2 text-sm focus:border-[#4B1FD6] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-600 rounded-pill hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#4B1FD6] hover:bg-[#3B0764] rounded-pill shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Linked Investments */}
      <div className="bg-white rounded-2xl p-6 border border-[#E4E4E7] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900">Mutual Funds Linked</h2>
            <p className="text-xs text-zinc-500">Security collateral actively powering your 1Fi limit</p>
          </div>
          <button
            onClick={() => handleAction('Add Mutual Fund Folio')}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-pill bg-[#EDE9FE] text-[#4B1FD6] text-xs font-bold hover:bg-violet-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Link More Funds</span>
          </button>
        </div>

        <div className="space-y-3">
          {linkedFunds.map((fund) => (
            <div
              key={fund.id}
              className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">🏦</span>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">{fund.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                    <span>{fund.folio}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-semibold">{fund.ytdReturns} YTD</span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-200">
                <span className="text-xs text-zinc-400 block text-[11px]">Total / Pledged</span>
                <div className="text-xs font-bold text-zinc-800">
                  {formatINR(fund.invested)} <span className="text-zinc-400 font-normal">|</span>{' '}
                  <span className="text-[#4B1FD6]">Pledged {formatINR(fund.pledgedAmount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-xs overflow-hidden divide-y divide-zinc-100 text-sm">
        <button
          onClick={() => handleAction('KYC Verified status is active')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-zinc-800">KYC Status</span>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            ✅ Verified
          </span>
        </button>

        <button
          onClick={() => handleAction('Payment methods configured')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-800">Auto-Debit & Payment Methods</span>
          </div>
          <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            2 linked <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>

        <button
          onClick={() => handleAction('Notifications are turned On')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-800">Notifications & EMI Alerts</span>
          </div>
          <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            SMS & WhatsApp <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>

        <button
          onClick={() => handleAction('Biometric security active')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-800">Security & App Lock</span>
          </div>
          <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
            Face ID <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </button>

        <button
          onClick={() => handleAction('Help & Support center')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-800">Help & Support</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        <button
          onClick={() => handleAction('Terms & Privacy policy')}
          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-zinc-500" />
            <span className="font-semibold text-zinc-800">Terms of Service & Privacy Policy</span>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-400" />
        </button>

        <button
          onClick={handleLogout}
          className="w-full p-4 flex items-center gap-3 hover:bg-red-50 transition-colors text-left text-red-600 font-bold"
        >
          <LogOut className="w-4 h-4 text-red-500" />
          <span>Log Out</span>
        </button>
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
