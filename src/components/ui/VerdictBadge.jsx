export default function VerdictBadge({ status }) {
  if (status === 'success') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-emerald-accent/20 text-emerald-accent text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Profit
      </span>
    )
  }

  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1.5 bg-amber-mid/20 text-amber-mid text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
        Pending
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1.5 bg-rose-fail/20 text-rose-fail text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      Rekt
    </span>
  )
}
