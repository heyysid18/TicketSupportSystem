import { useState, useCallback } from 'react';

let _id = 0;

/* ── useToast hook ──────────────────────────────────── */
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((p) => p.map((t) => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 250);
  }, []);

  const toast = useCallback((message, type = 'success') => {
    const id = ++_id;
    setToasts((p) => [...p, { id, message, type, exiting: false }]);
    setTimeout(() => dismiss(id), 4500);
    return id;
  }, [dismiss]);

  return { toasts, toast, dismiss };
};

/* ── ToastRegion component ──────────────────────────── */
export const ToastRegion = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;
  return (
    <div
      aria-live="polite"
      aria-label="Notifications"
      className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="alert"
          className={`
            pointer-events-auto flex items-start gap-3 min-w-[280px] max-w-sm
            glass rounded-xl px-4 py-3 shadow-soft-lg
            ${t.exiting ? 'animate-toast-out' : 'animate-toast-in'}
            ${t.type === 'success' ? 'border-l-2 border-l-emerald-500' : 'border-l-2 border-l-red-500'}
          `}
        >
          {/* Icon */}
          <span className={`mt-0.5 flex-shrink-0 text-sm ${t.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {t.type === 'success' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            )}
          </span>
          <p className="flex-1 text-sm text-zinc-200 leading-snug">{t.message}</p>
          <button
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
            className="flex-shrink-0 text-zinc-600 hover:text-zinc-300 transition-colors mt-0.5"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      ))}
    </div>
  );
};
