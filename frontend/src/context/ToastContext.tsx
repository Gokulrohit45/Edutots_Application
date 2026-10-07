import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 3200);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-20 sm:bottom-6 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 flex flex-col gap-2 w-auto sm:max-w-[90vw] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-[#17324D] text-white text-xs sm:text-sm font-medium rounded-xl shadow-xl shadow-black/15 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] shrink-0" />
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 text-stone-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
