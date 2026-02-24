const YOUTUBERS = [
  { name: 'Coin Bureau', initials: 'CB' },
  { name: 'Altcoin Daily', initials: 'AD' },
  { name: 'Benjamin Cowen', initials: 'BC' },
  { name: 'InvestAnswers', initials: 'IA' },
  { name: 'Lark Davis', initials: 'LD' },
]

export default function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center gap-10">

        {/* Headline */}
        <div className="flex flex-col gap-4">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white-heading"
            style={{ lineHeight: 1.15 }}
          >
            Tired of losing money on{' '}
            <span className="text-red-600">"Wrong YouTubers Recommendations"</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-text max-w-2xl mx-auto">
            90% of crypto influencers are paid to hype tokens. We built the first AI-auditor
            to find the 10% who actually know what they're talking about.
          </p>
        </div>

        {/* Face Pile */}
        <div className="flex flex-wrap justify-center gap-6">
          {YOUTUBERS.map((yt) => (
            <div key={yt.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#0d1117] bg-emerald-900 flex items-center justify-center">
                <span className="text-emerald-400 font-bold text-lg">{yt.initials}</span>
              </div>
              <span className="text-xs text-slate-text text-center leading-tight max-w-[72px]">
                {yt.name}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#leaderboard"
          className="inline-block bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
        >
          View Leaderboard
        </a>
      </div>
    </section>
  )
}
