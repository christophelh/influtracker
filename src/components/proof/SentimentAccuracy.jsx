import StatBar from '../ui/StatBar'
import SentimentBadge from '../ui/SentimentBadge'

export default function SentimentAccuracy({ data }) {
  if (!data || data.length === 0) return null

  const colorMap = {
    bullish: 'bg-emerald-accent',
    bearish: 'bg-rose-fail',
    neutral: 'bg-amber-mid',
  }

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-white-heading mb-4 uppercase tracking-wider">
        Sentiment Accuracy
      </h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.sentiment}>
            <div className="flex items-center justify-between mb-1">
              <SentimentBadge sentiment={item.sentiment} />
              <span className="text-xs text-slate-text">
                {item.wins}/{item.total} · {item.rate}%
              </span>
            </div>
            <StatBar
              value={item.rate}
              color={colorMap[item.sentiment] || 'bg-slate-text'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
