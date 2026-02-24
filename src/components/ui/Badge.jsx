export default function Badge({ status }) {
  if (status === 'success') {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-accent/15 text-emerald-accent text-xs font-medium px-2.5 py-1 rounded-full">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Hit
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 bg-rose-fail/15 text-rose-fail text-xs font-medium px-2.5 py-1 rounded-full">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Miss
    </span>
  )
}
