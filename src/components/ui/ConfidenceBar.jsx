export default function ConfidenceBar({ value }) {
  const clamped = Math.max(-1, Math.min(1, value))
  const width = Math.abs(clamped) * 50
  const isPositive = clamped >= 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-text w-6 text-right">-1</span>
      <div className="flex-1 h-2 bg-slate-border rounded-full relative overflow-hidden">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-slate-text/30" />
        {/* Fill bar */}
        <div
          className={`absolute top-0 h-full rounded-full transition-all duration-500 ${
            isPositive ? 'bg-emerald-accent' : 'bg-rose-fail'
          }`}
          style={{
            left: isPositive ? '50%' : `${50 - width}%`,
            width: `${width}%`,
          }}
        />
      </div>
      <span className="text-xs text-slate-text w-6">+1</span>
    </div>
  )
}
