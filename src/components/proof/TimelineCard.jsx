import { useState } from 'react'
import SentimentBadge from '../ui/SentimentBadge'
import ConfidenceBar from '../ui/ConfidenceBar'
import VerdictBadge from '../ui/VerdictBadge'
import { generateInsight } from '../../services/api'

export default function TimelineCard({ call }) {
  const [showTranscript, setShowTranscript] = useState(false)
  const date = call.dateOfCall || 'Unknown'
  const move =
    call.priceMovePct >= 0
      ? `+${call.priceMovePct.toFixed(2)}%`
      : `${call.priceMovePct.toFixed(2)}%`
  const moveColor = call.priceMovePct >= 0 ? 'text-emerald-accent' : 'text-rose-fail'
  const hasTranscript = !!call.transcript

  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-slate-border group-hover:bg-emerald-accent transition-colors ring-4 ring-slate-bg" />

      <div className="bg-slate-card border border-slate-border rounded-xl p-4 hover:border-slate-text/30 transition-colors">
        {/* Top row: date + token + sentiment + verdict */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-slate-text font-mono">{date}</span>
          <span className="text-sm font-bold text-white-heading">{call.token}</span>
          <SentimentBadge sentiment={call.sentiment} />
          <span className="ml-auto flex items-center gap-2">
            <span className={`text-sm font-semibold ${moveColor}`}>{move}</span>
            <VerdictBadge status={call.status} />
          </span>
        </div>

        {/* Confidence bar */}
        <div className="mb-3">
          <p className="text-xs text-slate-text mb-1">Confidence</p>
          <ConfidenceBar value={call.sentimentAvg || 0} />
        </div>

        {/* AI Insight */}
        <p className="text-xs text-slate-text/80 italic leading-relaxed">
          <span className="text-amber-mid font-medium not-italic">AI ·</span>{' '}
          {generateInsight(call)}
        </p>

        {/* Transcript toggle */}
        {hasTranscript && (
          <div className="mt-3 pt-3 border-t border-slate-border/50">
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-1.5 text-xs text-slate-text hover:text-emerald-accent transition-colors cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {showTranscript ? 'Hide transcript' : 'View transcript'}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                className={`transition-transform ${showTranscript ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {showTranscript && (
              <div className="mt-2 bg-slate-bg/50 rounded-lg p-3 max-h-48 overflow-y-auto">
                <p className="text-xs text-slate-text/70 leading-relaxed whitespace-pre-wrap">
                  {call.transcript}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
