import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center gap-3 bg-white text-zinc-900 px-5 py-3.5 rounded-xl shadow-2xl border border-zinc-100 border-l-4 border-l-[#16A34A] min-w-[320px] max-w-md">
        <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
        <span className="text-sm font-semibold flex-1 leading-snug">{message}</span>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-600 transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
