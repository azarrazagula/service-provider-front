import React from 'react';
import { CheckCircle2, X } from '../home/UI/Icons';

const NotificationToast = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-24 right-4 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-teal-500/30 flex items-start space-x-3 animate-slideIn">
      <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs sm:text-sm font-medium">
        {notification}
      </div>
      <button
        type="button"
        onClick={onClose}
        className="text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationToast;
