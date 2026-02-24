export default function TrendArrow({ direction }) {
  if (direction === 'up') {
    return (
      <span className="inline-flex items-center gap-1 text-emerald-accent text-xs font-medium">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
        </svg>
        Rising
      </span>
    )
  }

  if (direction === 'down') {
    return (
      <span className="inline-flex items-center gap-1 text-rose-fail text-xs font-medium">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10L2 5H10L6 10Z" fill="currentColor" />
        </svg>
        Falling
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 text-slate-text text-xs font-medium">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="2" y="5" width="8" height="2" rx="1" fill="currentColor" />
      </svg>
      Stable
    </span>
  )
}
