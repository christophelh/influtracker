const config = {
  bullish: {
    bg: 'bg-emerald-accent/15',
    text: 'text-emerald-accent',
    label: 'Bullish',
    arrow: 'M6 2L10 7H2L6 2Z',
  },
  bearish: {
    bg: 'bg-rose-fail/15',
    text: 'text-rose-fail',
    label: 'Bearish',
    arrow: 'M6 10L2 5H10L6 10Z',
  },
  neutral: {
    bg: 'bg-amber-mid/15',
    text: 'text-amber-mid',
    label: 'Neutral',
    arrow: 'M2 5H10',
  },
}

export default function SentimentBadge({ sentiment }) {
  const c = config[sentiment] || config.neutral

  return (
    <span className={`inline-flex items-center gap-1 ${c.bg} ${c.text} text-xs font-medium px-2.5 py-1 rounded-full`}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        {sentiment === 'neutral' ? (
          <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <path d={c.arrow} fill="currentColor" />
        )}
      </svg>
      {c.label}
    </span>
  )
}
