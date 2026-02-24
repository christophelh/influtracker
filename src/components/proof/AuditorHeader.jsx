import ScoreRing from '../ui/ScoreRing'
import TrendArrow from '../ui/TrendArrow'

export default function AuditorHeader({ youtuber, avgImpact, riskProfile }) {
  const impactColor = avgImpact >= 0 ? 'text-emerald-accent' : 'text-rose-fail'
  const impactSign = avgImpact >= 0 ? '+' : ''

  const riskColors = {
    conservative: 'text-emerald-accent bg-emerald-accent/15',
    moderate: 'text-amber-mid bg-amber-mid/15',
    aggressive: 'text-rose-fail bg-rose-fail/15',
  }
  const riskClass = riskColors[riskProfile.level] || riskColors.moderate

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-6">
      {/* Top section: avatar + info + score ring */}
      <div className="flex items-start gap-4 mb-6">
        <img
          src={youtuber.avatar}
          alt={youtuber.name}
          className="w-16 h-16 rounded-full ring-2 ring-slate-border object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-bold text-white-heading">{youtuber.name}</h1>
            <TrendArrow direction={youtuber.trend} />
          </div>
          <p className="text-sm text-slate-text mt-0.5">
            {youtuber.subscribers?.toLocaleString() || '—'} subscribers
          </p>
          {youtuber.description && (
            <p className="text-xs text-slate-text/70 mt-1 line-clamp-2">{youtuber.description}</p>
          )}
        </div>
        <ScoreRing score={youtuber.accuracyScore} size={72} />
      </div>

      {/* Three metric cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-bg rounded-lg p-3 text-center">
          <p className="text-xs text-slate-text uppercase tracking-wider mb-1">Win Rate</p>
          <p className="text-lg font-bold text-white-heading">{youtuber.accuracyScore}%</p>
          <p className="text-xs text-slate-text">{youtuber.calls.length} calls</p>
        </div>
        <div className="bg-slate-bg rounded-lg p-3 text-center">
          <p className="text-xs text-slate-text uppercase tracking-wider mb-1">Avg Impact</p>
          <p className={`text-lg font-bold ${impactColor}`}>
            {impactSign}{avgImpact.toFixed(2)}%
          </p>
          <p className="text-xs text-slate-text">price move</p>
        </div>
        <div className="bg-slate-bg rounded-lg p-3 text-center">
          <p className="text-xs text-slate-text uppercase tracking-wider mb-1">Risk Profile</p>
          <p className={`text-sm font-bold px-2 py-0.5 rounded-full inline-block ${riskClass}`}>
            {riskProfile.label}
          </p>
        </div>
      </div>
    </div>
  )
}
