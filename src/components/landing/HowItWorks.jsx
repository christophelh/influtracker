const steps = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
        <path d="M12 2a3 3 0 00-3 3v4a3 3 0 006 0V5a3 3 0 00-3-3z" stroke="currentColor" strokeWidth="2" />
        <path d="M19 10v1a7 7 0 01-14 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 18v4M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI Transcription',
    description:
      'Our engine listens to every second of top YouTube videos to extract specific price predictions.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time Audit',
    description:
      'We compare every "Buy" or "Sell" call against live market data from the exact moment of the video.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
        <path d="M12 15l-2 5l9-11h-5l2-5l-9 11h5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Reputation Scoring',
    description:
      'Creators are ranked on a 90-day rolling accuracy score. Numbers don\'t lie, influencers do.',
  },
]

export default function HowItWorks() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-emerald-accent text-sm font-semibold uppercase tracking-widest mb-2">
          Methodology
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white-heading">
          How It Works
        </h2>
        <p className="text-slate-text mt-3 max-w-lg mx-auto text-sm leading-relaxed">
          Three-stage pipeline turning raw YouTube content into auditable accuracy scores.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="bg-slate-card border border-slate-border rounded-xl p-6 hover:border-emerald-accent/40 transition-colors group"
          >
            {/* Step number + icon */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-slate-text/50 uppercase tracking-wider">
                0{i + 1}
              </span>
              <div className="w-10 h-10 rounded-lg bg-emerald-accent/10 flex items-center justify-center group-hover:bg-emerald-accent/20 transition-colors">
                {step.icon}
              </div>
            </div>

            <h3 className="text-base font-bold text-white-heading mb-2">{step.title}</h3>
            <p className="text-sm text-slate-text leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
