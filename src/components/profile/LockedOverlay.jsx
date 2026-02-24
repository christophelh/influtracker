export default function LockedOverlay({ score }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-bg/80 backdrop-blur-md rounded-xl z-10">
      <div className="text-center px-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-accent/20 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-white-heading font-semibold text-lg mb-2">Premium Creator</p>
        <p className="text-slate-text text-sm mb-6 max-w-xs">
          This creator has a verified {score}%+ accuracy score. Unlock full analysis to see all predictions.
        </p>
        <button
          onClick={() => alert('Coming soon! Payment integration in progress.')}
          className="bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors cursor-pointer"
        >
          Unlock for $1.99
        </button>
      </div>
    </div>
  )
}
