export default function SourceCard({ youtuber, onEdit, onDelete }) {
  const initials = youtuber.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-4 hover:border-slate-text/30 transition-colors">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-slate-border flex items-center justify-center text-sm font-bold text-white-heading shrink-0">
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-white-heading truncate">{youtuber.name}</h3>
          <p className="text-xs text-slate-text">{youtuber.subscribers} subs</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-emerald-accent font-semibold">
              {youtuber.accuracyScore}%
            </span>
            <span className="text-xs text-slate-text">
              {youtuber.calls.length} calls
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(youtuber)}
            className="p-1.5 rounded-lg text-slate-text hover:text-emerald-accent hover:bg-emerald-accent/10 transition-colors cursor-pointer"
            title="Edit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(youtuber)}
            className="p-1.5 rounded-lg text-slate-text hover:text-rose-fail hover:bg-rose-fail/10 transition-colors cursor-pointer"
            title="Delete"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {youtuber.description && (
        <p className="text-xs text-slate-text/70 mt-2 line-clamp-2">{youtuber.description}</p>
      )}
    </div>
  )
}
