import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900 border-emerald-700 text-emerald-50',
    warning: 'bg-amber-900 border-amber-700 text-amber-50',
    info: 'bg-slate-900 border-slate-700 text-slate-50',
  }[toast.type];

  const icon = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  }[toast.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-3 duration-200">
      <div className={`flex items-start gap-3 p-3.5 rounded-lg border shadow-2xl ${bgStyles}`}>
        {icon}
        <div className="flex-1 pr-2">
          <p className="text-xs font-semibold">{toast.title}</p>
          {toast.description && (
            <p className="text-[11px] opacity-90 mt-0.5 leading-snug">
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-white/70 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
