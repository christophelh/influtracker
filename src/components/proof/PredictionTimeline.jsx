import TimelineCard from './TimelineCard'

export default function PredictionTimeline({ calls }) {
  // Sort by date descending (most recent first)
  const sorted = [...calls].sort((a, b) =>
    (b.dateOfCall || '').localeCompare(a.dateOfCall || '')
  )

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-white-heading mb-6 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        </svg>
        Prediction Timeline
        <span className="text-sm font-normal text-slate-text">({calls.length} calls)</span>
      </h2>

      {/* Vertical line */}
      <div className="relative border-l-2 border-slate-border ml-1.5">
        {sorted.map((call) => (
          <TimelineCard key={call.id} call={call} />
        ))}
      </div>
    </div>
  )
}
