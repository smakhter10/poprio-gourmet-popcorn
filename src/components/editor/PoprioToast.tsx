import React from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const PoprioToast: React.FC = () => {
  const { toast, hideToast } = usePoprioEditor();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[99999] flex items-center gap-3 px-5 py-3.5 rounded-xl border-3 border-[#4B1F0F] shadow-[5px_5px_0px_#4B1F0F] transition-all duration-200 animate-in fade-in slide-in-from-bottom-4 font-sans text-sm font-bold bg-[#FFF3E0] text-[#4B1F0F]"
    >
      {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
      {isError && <AlertCircle className="w-5 h-5 text-[#E0351B] flex-shrink-0" />}
      {!isSuccess && !isError && <Info className="w-5 h-5 text-[#7A3DA6] flex-shrink-0" />}

      <span>{toast.message}</span>

      <button
        onClick={hideToast}
        aria-label="Dismiss notification"
        className="ml-2 p-1 rounded hover:bg-black/10 transition-colors"
      >
        <X className="w-4 h-4 text-[#4B1F0F]" />
      </button>
    </div>
  );
};

