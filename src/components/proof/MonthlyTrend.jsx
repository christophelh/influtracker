export default function MonthlyTrend({ data }) {
  if (!data || data.length === 0) return null

  const maxTotal = Math.max(...data.map((d) => d.total))

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-white-heading mb-4 uppercase tracking-wider">
        Monthly Trend
      </h3>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 h-32">
        {data.map((item) => {
          const barHeight = maxTotal > 0 ? (item.total / maxTotal) * 100 : 0
          const barColor =
            item.rate >= 50
              ? 'bg-emerald-accent'
              : item.rate >= 35
                ? 'bg-amber-mid'
                : 'bg-rose-fail'

          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-bg border border-slate-border rounded px-2 py-1 text-xs text-white-heading whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {item.rate}% ({item.wins}/{item.total})
              </div>
              {/* Rate label */}
              <span className="text-[10px] text-slate-text font-mono">{item.rate}%</span>
              {/* Bar */}
              <div
                className={`w-full rounded-t ${barColor} transition-all duration-500 min-h-[4px]`}
                style={{ height: `${barHeight}%` }}
              />
            </div>
          )
        })}
      </div>

      {/* X axis labels */}
      <div className="flex gap-1.5 mt-1.5">
        {data.map((item) => (
          <div key={item.month} className="flex-1 text-center">
            <span className="text-[9px] text-slate-text/60 font-mono">
              {item.month.slice(5)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
