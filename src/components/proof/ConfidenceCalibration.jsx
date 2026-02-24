import StatBar from '../ui/StatBar'

export default function ConfidenceCalibration({ data }) {
  if (!data) return null

  const { highConf, lowConf } = data

  return (
    <div className="bg-slate-card border border-slate-border rounded-xl p-5">
      <h3 className="text-sm font-bold text-white-heading mb-4 uppercase tracking-wider">
        Confidence Calibration
      </h3>
      <div className="space-y-4">
        {/* High conviction */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white-heading flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-accent" />
              High Conviction
            </span>
            <span className="text-xs text-slate-text">
              {highConf.wins}/{highConf.total} · {highConf.rate}%
            </span>
          </div>
          <StatBar value={highConf.rate} color="bg-emerald-accent" />
        </div>

        {/* Low conviction */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white-heading flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-mid" />
              Low Conviction
            </span>
            <span className="text-xs text-slate-text">
              {lowConf.wins}/{lowConf.total} · {lowConf.rate}%
            </span>
          </div>
          <StatBar value={lowConf.rate} color="bg-amber-mid" />
        </div>

        {/* Comparison insight */}
        <p className="text-xs text-slate-text/70 italic pt-1 border-t border-slate-border">
          {highConf.rate > lowConf.rate
            ? `High conviction calls outperform by ${highConf.rate - lowConf.rate}pp — stronger signals are more reliable.`
            : highConf.rate < lowConf.rate
              ? `Low conviction calls outperform by ${lowConf.rate - highConf.rate}pp — confidence doesn't correlate with accuracy.`
              : 'Both conviction levels perform equally — signal strength has no impact.'}
        </p>
      </div>
    </div>
  )
}
