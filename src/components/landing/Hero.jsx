export default function Hero() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white-heading leading-tight">
        Tired of losing money on{' '}
        <span className="text-emerald-accent">"The Next 100x Gem"?</span>
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-slate-text max-w-2xl mx-auto">
        90% of crypto influencers are paid to hype tokens. We built the first AI-auditor to find the 10% who actually know what they're talking about.
      </p>
      <a
        href="#leaderboard"
        className="inline-block mt-10 bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-colors text-lg"
      >
        View Leaderboard
      </a>
    </section>
  )
}
