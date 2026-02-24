import { useState } from 'react'

export default function CallRow({ call, youtuberName, youtuberId, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [token, setToken] = useState(call.token)
  const [sentiment, setSentiment] = useState(call.sentiment)
  const [dateOfCall, setDateOfCall] = useState(call.dateOfCall)
  const [sentimentAvg, setSentimentAvg] = useState(call.sentimentAvg ?? 0)
  const [priceMovePct, setPriceMovePct] = useState(call.priceMovePct ?? 0)
  const [status, setStatus] = useState(call.status)
  const [transcript, setTranscript] = useState(call.transcript || '')

  function handleSave() {
    onUpdate(youtuberId, call.id, {
      token: token.toUpperCase(),
      sentiment,
      dateOfCall,
      sentimentAvg: parseFloat(sentimentAvg) || 0,
      priceMovePct: parseFloat(priceMovePct) || 0,
      status,
      transcript,
    })
    setEditing(false)
  }

  function handleCancel() {
    setToken(call.token)
    setSentiment(call.sentiment)
    setDateOfCall(call.dateOfCall)
    setSentimentAvg(call.sentimentAvg ?? 0)
    setPriceMovePct(call.priceMovePct ?? 0)
    setStatus(call.status)
    setTranscript(call.transcript || '')
    setEditing(false)
  }

  const sentimentColors = {
    bullish: 'text-emerald-accent bg-emerald-accent/15',
    bearish: 'text-rose-fail bg-rose-fail/15',
    neutral: 'text-amber-mid bg-amber-mid/15',
  }

  const inputClass =
    'bg-slate-bg border border-slate-border rounded px-2 py-1 text-xs text-white-heading focus:outline-none focus:border-emerald-accent'

  const hasTranscript = !!(call.transcript || transcript)

  if (editing) {
    return (
      <>
        <tr className="border-b border-slate-border bg-slate-bg/50">
          <td className="px-3 py-2 text-xs text-slate-text">{youtuberName}</td>
          <td className="px-3 py-2">
            <input type="text" value={token} onChange={(e) => setToken(e.target.value)} className={`${inputClass} w-16`} />
          </td>
          <td className="px-3 py-2">
            <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className={`${inputClass} w-20`}>
              <option value="bullish">Bullish</option>
              <option value="neutral">Neutral</option>
              <option value="bearish">Bearish</option>
            </select>
          </td>
          <td className="px-3 py-2">
            <input type="date" value={dateOfCall} onChange={(e) => setDateOfCall(e.target.value)} className={`${inputClass} w-32`} />
          </td>
          <td className="px-3 py-2">
            <input type="number" step="any" value={priceMovePct} onChange={(e) => setPriceMovePct(e.target.value)} className={`${inputClass} w-16`} />
          </td>
          <td className="px-3 py-2">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${inputClass} w-20`}>
              <option value="pending">Pending</option>
              <option value="success">Correct</option>
              <option value="fail">Incorrect</option>
            </select>
          </td>
          <td className="px-3 py-2">
            <div className="flex gap-1">
              <button onClick={handleSave} className="text-emerald-accent hover:text-emerald-accent-hover text-xs font-medium cursor-pointer">
                Save
              </button>
              <button onClick={handleCancel} className="text-slate-text hover:text-white-heading text-xs cursor-pointer">
                Cancel
              </button>
            </div>
          </td>
        </tr>
        {/* Transcript edit row */}
        <tr className="border-b border-slate-border bg-slate-bg/50">
          <td colSpan={7} className="px-3 py-2">
            <label className="block text-[10px] text-slate-text uppercase tracking-wider mb-1">Transcript</label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={4}
              placeholder="Paste transcript here..."
              className={`${inputClass} w-full resize-y`}
            />
          </td>
        </tr>
      </>
    )
  }

  return (
    <>
      <tr className="border-b border-slate-border hover:bg-slate-card/50 transition-colors">
        <td className="px-3 py-2 text-xs text-slate-text">{youtuberName}</td>
        <td className="px-3 py-2 text-xs font-semibold text-white-heading">{call.token}</td>
        <td className="px-3 py-2">
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${sentimentColors[call.sentiment] || ''}`}>
            {call.sentiment}
          </span>
        </td>
        <td className="px-3 py-2 text-xs text-slate-text font-mono">{call.dateOfCall}</td>
        <td className="px-3 py-2 text-xs">
          <span className={call.priceMovePct >= 0 ? 'text-emerald-accent' : 'text-rose-fail'}>
            {call.priceMovePct >= 0 ? '+' : ''}{(call.priceMovePct ?? 0).toFixed(2)}%
          </span>
        </td>
        <td className="px-3 py-2">
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              call.status === 'success'
                ? 'text-emerald-accent bg-emerald-accent/15'
                : call.status === 'pending'
                  ? 'text-amber-mid bg-amber-mid/15'
                  : 'text-rose-fail bg-rose-fail/15'
            }`}
          >
            {call.status === 'success' ? 'PROFIT' : call.status === 'pending' ? 'PENDING' : 'REKT'}
          </span>
        </td>
        <td className="px-3 py-2">
          <div className="flex gap-1">
            {/* Transcript toggle */}
            <button
              onClick={() => setExpanded(!expanded)}
              className={`p-1 rounded transition-colors cursor-pointer ${
                hasTranscript
                  ? expanded
                    ? 'text-emerald-accent bg-emerald-accent/10'
                    : 'text-emerald-accent hover:bg-emerald-accent/10'
                  : 'text-slate-text/30 cursor-default'
              }`}
              title={hasTranscript ? (expanded ? 'Hide transcript' : 'View transcript') : 'No transcript'}
              disabled={!hasTranscript}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setEditing(true)}
              className="p-1 rounded text-slate-text hover:text-emerald-accent transition-colors cursor-pointer"
              title="Edit"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(youtuberId, call.id)}
              className="p-1 rounded text-slate-text hover:text-rose-fail transition-colors cursor-pointer"
              title="Delete"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {/* Expanded transcript row */}
      {expanded && hasTranscript && (
        <tr className="border-b border-slate-border bg-slate-card/30">
          <td colSpan={7} className="px-4 py-3">
            <div className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-accent mt-0.5 shrink-0">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xs text-slate-text leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                {call.transcript}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
