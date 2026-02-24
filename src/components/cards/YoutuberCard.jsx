import { Link } from 'react-router-dom'
import ScoreRing from '../ui/ScoreRing'
import TrendArrow from '../ui/TrendArrow'

export default function YoutuberCard({ youtuber, rank }) {
  const initials = youtuber.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <Link
      to={`/youtuber/${youtuber.id}`}
      className="block bg-slate-card border border-slate-border rounded-xl p-6 hover:border-emerald-accent/50 transition-all duration-200 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-border flex items-center justify-center text-sm font-bold text-white-heading group-hover:bg-emerald-accent/20 transition-colors">
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-white-heading group-hover:text-emerald-accent transition-colors">
              {youtuber.name}
            </h3>
            <p className="text-xs text-slate-text">{youtuber.subscribers} subs</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-text/50">#{rank}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ScoreRing score={youtuber.accuracyScore} size={52} />
          <div>
            <p className="text-xs text-slate-text">{youtuber.calls.length} calls tracked</p>
            <TrendArrow direction={youtuber.trend} />
          </div>
        </div>
      </div>
    </Link>
  )
}
