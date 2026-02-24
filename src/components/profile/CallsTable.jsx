import Badge from '../ui/Badge'

export default function CallsTable({ calls }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-border bg-slate-card">
            <th className="text-left px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Token</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Sentiment</th>
            <th className="text-left px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Date</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Confidence</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Price Move</th>
            <th className="text-center px-4 py-3 text-xs font-medium text-slate-text uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-border">
          {calls.map((call) => {
            const sentimentColor =
              call.sentiment === 'bullish'
                ? 'text-emerald-accent'
                : call.sentiment === 'bearish'
                  ? 'text-rose-fail'
                  : 'text-amber-mid'

            const sentimentLabel =
              call.sentiment === 'bullish'
                ? 'Bullish'
                : call.sentiment === 'bearish'
                  ? 'Bearish'
                  : 'Neutral'

            const moveColor = call.priceMovePct >= 0 ? 'text-emerald-accent' : 'text-rose-fail'

            return (
              <tr key={call.id} className="bg-slate-bg hover:bg-slate-card/50 transition-colors">
                <td className="px-4 py-3 font-semibold text-white-heading">{call.token}</td>
                <td className="px-4 py-3">
                  <span className={sentimentColor}>{sentimentLabel}</span>
                </td>
                <td className="px-4 py-3 text-slate-text">{call.dateOfCall}</td>
                <td className="px-4 py-3 text-right text-white-heading font-mono">
                  {call.sentimentAvg > 0 ? '+' : ''}{call.sentimentAvg.toFixed(2)}
                </td>
                <td className={`px-4 py-3 text-right font-mono font-medium ${moveColor}`}>
                  {call.priceMovePct >= 0 ? '+' : ''}{call.priceMovePct.toFixed(2)}%
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge status={call.status} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
