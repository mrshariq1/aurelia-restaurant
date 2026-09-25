import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#15171d] border border-[#c9a84e]/40 shadow-2xl rounded-sm py-3 px-4 flex items-center justify-between gap-3 text-xs text-[#f0ede6]">
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 className="w-4 h-4 text-[#c9a84e] shrink-0" />
          <span className="font-light truncate">{message}</span>
        </div>
        <button
          onClick={onClose}
          className="text-[#8e8b82] hover:text-[#f0ede6] p-1 shrink-0 min-w-[28px] min-h-[28px] flex items-center justify-center"
          aria-label="Dismiss Notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
