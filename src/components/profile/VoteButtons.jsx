export default function VoteButtons({ votes, onVote, hasVoted }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <p className="text-sm text-slate-text">Community trust rating:</p>
      <div className="flex gap-3">
        <button
          onClick={() => onVote('trust')}
          disabled={hasVoted}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            hasVoted
              ? 'bg-slate-card text-slate-text border border-slate-border cursor-not-allowed'
              : 'bg-emerald-accent/15 text-emerald-accent border border-emerald-accent/30 hover:bg-emerald-accent/25'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L10.5 6H13.5L11 9L12 13L8 10.5L4 13L5 9L2.5 6H5.5L8 2Z" fill="currentColor" />
          </svg>
          Trust ({votes.trust.toLocaleString()})
        </button>
        <button
          onClick={() => onVote('noWay')}
          disabled={hasVoted}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            hasVoted
              ? 'bg-slate-card text-slate-text border border-slate-border cursor-not-allowed'
              : 'bg-rose-fail/15 text-rose-fail border border-rose-fail/30 hover:bg-rose-fail/25'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          No Way ({votes.noWay.toLocaleString()})
        </button>
      </div>
      {hasVoted && (
        <span className="text-xs text-slate-text/50">You already voted</span>
      )}
    </div>
  )
}
