import StatBar from '../ui/StatBar'

export default function WinRateByToken({ data }) {
  if (!data || data.length === 0) return null

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-white-heading mb-4 uppercase tracking-wider">
        Win Rate by Token
      </h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.token}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-white-heading">{item.token}</span>
              <span className="text-xs text-slate-text">
                {item.wins}/{item.total} · {item.rate}%
              </span>
            </div>
            <StatBar
              value={item.rate}
              color={item.rate >= 50 ? 'bg-emerald-accent' : item.rate >= 35 ? 'bg-amber-mid' : 'bg-rose-fail'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
