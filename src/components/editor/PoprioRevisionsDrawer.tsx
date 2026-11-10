import React from 'react';
import { usePoprioEditor } from '../../context/PoprioEditorContext';
import { History, X, RotateCcw, Clock, User } from 'lucide-react';

export const PoprioRevisionsDrawer: React.FC = () => {
  const { isRevisionsOpen, closeRevisions, revisions, restoreRevision } = usePoprioEditor();

  if (!isRevisionsOpen) return null;

  return (
    <aside
      aria-label="Revision history"
      className="fixed top-16 right-0 bottom-0 w-full sm:w-[400px] bg-[#FFF3E0] text-[#4B1F0F] z-[99997] border-l-4 border-[#4B1F0F] shadow-[-6px_0px_0px_#4B1F0F] flex flex-col font-sans animate-in slide-in-from-right duration-200 select-none"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b-3 border-[#4B1F0F] bg-[#FFC72C]">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-[#4B1F0F]" />
          <h2 className="font-heading text-base font-black uppercase tracking-wider text-[#4B1F0F]">
            Revision History
          </h2>
        </div>
        <button
          onClick={closeRevisions}
          aria-label="Close revision history"
          className="p-1 rounded-lg hover:bg-black/10 transition-colors"
        >
          <X className="w-5 h-5 text-[#4B1F0F]" />
        </button>
      </div>

      {/* Revisions Description */}
      <div className="p-4 bg-amber-100/60 border-b-2 border-[#4B1F0F]/15 text-xs font-medium text-[#4B1F0F]/80">
        WordPress keeps a rolling history of the last 10 published snapshots. Restoring any snapshot creates a new draft for preview.
      </div>

      {/* Revision List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {revisions.length === 0 ? (
          <div className="text-center py-12 text-[#4B1F0F]/60 text-sm font-bold">
            <History className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No saved revisions yet.
            <p className="text-xs font-normal mt-1">
              Revisions are created automatically whenever you publish changes.
            </p>
          </div>
        ) : (
          revisions.map((rev, index) => {
            const date = new Date(rev.timestamp);
            const dateStr = !isNaN(date.getTime())
              ? `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
              : rev.timestamp;

            return (
              <div
                key={rev.id || index}
                className="p-3.5 bg-white rounded-xl border-2 border-[#4B1F0F] shadow-[3px_3px_0px_#4B1F0F] flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase px-2 py-0.5 bg-[#FFC72C] text-[#4B1F0F] rounded border border-[#4B1F0F]">
                    {index === 0 ? 'Current Live' : `Snapshot #${revisions.length - index}`}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#4B1F0F]/70 font-bold">
                    <Clock className="w-3 h-3" />
                    <span>{dateStr}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#4B1F0F]/80">
                  <User className="w-3.5 h-3.5 opacity-60" />
                  <span className="font-semibold">{rev.author_name || 'Administrator'}</span>
                </div>

                {rev.summary && (
                  <p className="text-xs text-[#4B1F0F] bg-amber-50 p-2 rounded border border-amber-200">
                    "{rev.summary}"
                  </p>
                )}

                <button
                  onClick={() => {
                    if (confirm(`Restore to snapshot from ${dateStr}?`)) {
                      restoreRevision(rev.id);
                    }
                  }}
                  className="mt-1 flex items-center justify-center gap-1.5 w-full py-1.5 bg-[#FFF3E0] hover:bg-[#FFC72C] text-[#4B1F0F] font-heading text-xs font-black uppercase tracking-wider rounded-lg border-2 border-[#4B1F0F] shadow-[2px_2px_0px_#4B1F0F] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Snapshot</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

