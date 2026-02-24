import { Link } from 'react-router-dom'
import ScoreRing from '../ui/ScoreRing'
import TrendArrow from '../ui/TrendArrow'

const RANK_BADGES = {
  1: { label: '🥇', bg: 'bg-yellow-500/20', text: 'text-yellow-400', ring: 'ring-yellow-500' },
  2: { label: '🥈', bg: 'bg-slate-400/20', text: 'text-slate-300', ring: 'ring-slate-400' },
  3: { label: '🥉', bg: 'bg-orange-700/20', text: 'text-orange-400', ring: 'ring-orange-600' },
}

export default function YoutuberCard({ youtuber, rank }) {
  const initials = youtuber.name
    .split(' ')
    .map((w) => w[0])
    .join('')

  const badge = RANK_BADGES[rank]
  const ringClass = badge ? badge.ring : 'ring-slate-border'

  return (
    <Link
      to={`/youtuber/${youtuber.id}`}
      className="relative block bg-slate-card border border-slate-border rounded-xl p-6 hover:border-emerald-accent/50 transition-all duration-200 group hover:[&~*]:opacity-50"
    >
      {/* Rank Badge */}
      {badge ? (
        <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full ${badge.bg} ${badge.text} flex items-center justify-center text-base font-black border border-slate-border shadow-lg`}>
          {badge.label}
        </div>
      ) : (
        <span className="absolute -top-2 -left-2 text-xs font-mono text-slate-text/40">#{rank}</span>
      )}

      {rank === 1 && (
        <div className="absolute -top-3 right-4 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold border border-yellow-500/30">
          👑 King of Accuracy
        </div>
      )}

      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full bg-slate-border ring-2 ${ringClass} flex items-center justify-center text-sm font-bold text-white-heading group-hover:bg-emerald-accent/20 transition-colors`}>
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-white-heading group-hover:text-emerald-accent transition-colors">
              {youtuber.name}
            </h3>
            <p className="text-xs text-slate-text">{youtuber.subscribers} subs</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ScoreRing score={youtuber.accuracyScore} size={52} />
          <div>
            <p className="text-xs text-slate-text">{youtuber.calls.length} calls tracked</p>
            <TrendArrow direction={youtuber.trend} />
            {youtuber.rankChange !== undefined && youtuber.rankChange !== 0 && (
              <p className={`text-xs font-semibold mt-0.5 ${youtuber.rankChange > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {youtuber.rankChange > 0 ? `▲ +${youtuber.rankChange}` : `▼ ${youtuber.rankChange}`} this week
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
