import { useState } from 'react'

export default function CallForm({ youtubers, onSubmit }) {
  const [selectedYoutuber, setSelectedYoutuber] = useState(youtubers[0]?.id || '')
  const [transcript, setTranscript] = useState('')
  const [dateOfCall, setDateOfCall] = useState(() => new Date().toISOString().slice(0, 10))
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [token, setToken] = useState('')
  const [sentiment, setSentiment] = useState('neutral')
  const [sentimentAvg, setSentimentAvg] = useState('')
  const [priceMovePct, setPriceMovePct] = useState('')
  const [status, setStatus] = useState('pending')
  const [message, setMessage] = useState({ text: '', type: '' })

  function handleSubmit(e) {
    e.preventDefault()
    if (!transcript.trim()) {
      setMessage({ text: 'Transcript is required.', type: 'error' })
      return
    }

    const callData = {
      transcript: transcript.trim(),
      dateOfCall,
      token: token ? token.toUpperCase() : 'TBD',
      sentiment,
      sentimentAvg: sentimentAvg ? parseFloat(sentimentAvg) : 0,
      priceMovePct: priceMovePct ? parseFloat(priceMovePct) : 0,
      status: status === 'pending' ? 'pending' : status,
    }

    const result = onSubmit(selectedYoutuber, callData)

    if (result?.error) {
      setMessage({ text: result.error, type: 'error' })
    } else {
      const label = token ? token.toUpperCase() : 'transcript'
      setMessage({ text: `${label} saved for ${youtubers.find((y) => y.id === selectedYoutuber)?.name}!`, type: 'success' })
      setTranscript('')
      setToken('')
      setSentimentAvg('')
      setPriceMovePct('')
      setStatus('pending')
      setShowAnalysis(false)
      setDateOfCall(new Date().toISOString().slice(0, 10))
    }

    setTimeout(() => setMessage({ text: '', type: '' }), 3000)
  }

  const inputClass =
    'w-full bg-slate-bg border border-slate-border rounded-lg px-3 py-2 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Source + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-white-heading mb-1">Source</label>
          <select
            value={selectedYoutuber}
            onChange={(e) => setSelectedYoutuber(e.target.value)}
            className={inputClass}
          >
            {youtubers.map((yt) => (
              <option key={yt.id} value={yt.id}>
                {yt.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-white-heading mb-1">Date</label>
          <input
            type="date"
            value={dateOfCall}
            onChange={(e) => setDateOfCall(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Transcript — primary input */}
      <div>
        <label className="block text-xs font-medium text-white-heading mb-1">
          Transcript <span className="text-rose-fail">*</span>
        </label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={8}
          placeholder="Paste the video transcript here... The AI will analyze it later to extract tokens, sentiment, and predictions."
          className={`${inputClass} resize-y`}
        />
        <p className="text-[10px] text-slate-text/50 mt-1">
          {transcript.length > 0
            ? `${transcript.length.toLocaleString()} characters · ~${Math.ceil(transcript.split(/\s+/).filter(Boolean).length / 150)} min read`
            : 'Paste the full transcript — analysis fields below are optional'}
        </p>
      </div>

      {/* Analysis toggle */}
      <button
        type="button"
        onClick={() => setShowAnalysis(!showAnalysis)}
        className="flex items-center gap-2 text-xs text-slate-text hover:text-emerald-accent transition-colors cursor-pointer"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          className={`transition-transform ${showAnalysis ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {showAnalysis ? 'Hide analysis fields' : 'Add manual analysis (optional)'}
        {!showAnalysis && token && (
          <span className="text-emerald-accent font-medium">· {token.toUpperCase()}</span>
        )}
      </button>

      {/* Optional analysis fields */}
      {showAnalysis && (
        <div className="bg-slate-bg/50 border border-slate-border rounded-xl p-4 space-y-4">
          <p className="text-[10px] text-slate-text/60 uppercase tracking-wider font-semibold">
            Manual Analysis — Fill in now or edit later
          </p>

          {/* Token + Sentiment + Status */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-white-heading mb-1">Token</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="BTC"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-heading mb-1">Sentiment</label>
              <select value={sentiment} onChange={(e) => setSentiment(e.target.value)} className={inputClass}>
                <option value="neutral">Neutral</option>
                <option value="bullish">Bullish</option>
                <option value="bearish">Bearish</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white-heading mb-1">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                <option value="pending">Pending</option>
                <option value="success">Correct</option>
                <option value="fail">Incorrect</option>
              </select>
            </div>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white-heading mb-1">Sentiment Avg</label>
              <input
                type="number"
                step="any"
                min="-1"
                max="1"
                value={sentimentAvg}
                onChange={(e) => setSentimentAvg(e.target.value)}
                placeholder="-1 to 1"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white-heading mb-1">Price Move %</label>
              <input
                type="number"
                step="any"
                value={priceMovePct}
                onChange={(e) => setPriceMovePct(e.target.value)}
                placeholder="-2.34"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer text-sm"
      >
        {token ? `Save Call (${token.toUpperCase()})` : 'Save Transcript'}
      </button>

      {message.text && (
        <p
          className={`text-center text-sm font-medium ${
            message.type === 'error' ? 'text-rose-fail' : 'text-emerald-accent'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}
