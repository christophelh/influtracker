export default function StatBar({ value, label, color = 'bg-emerald-accent' }) {
  const clampedValue = Math.max(0, Math.min(100, value))

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-slate-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {label && <span className="text-xs text-slate-text whitespace-nowrap">{label}</span>}
    </div>
  )
}
