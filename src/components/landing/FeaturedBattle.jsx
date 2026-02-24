export default function FeaturedBattle({ youtubers }) {
  if (!youtubers || youtubers.length < 2) return null

  const [fighter1, fighter2] = youtubers

  const initials = (name) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
      <p className="text-center text-xs font-semibold tracking-widest text-emerald-accent uppercase mb-6">
        Top Battle of the Week
      </p>

      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {/* Fighter 1 */}
        <div className="flex-1 bg-slate-card border border-slate-border rounded-xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-900 ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#0d1117] flex items-center justify-center mx-auto mb-3">
            <span className="text-emerald-400 font-bold text-lg">{initials(fighter1.name)}</span>
          </div>
          <h3 className="font-semibold text-white-heading text-sm mb-1">{fighter1.name}</h3>
          <p className="text-2xl font-extrabold text-emerald-accent">{fighter1.accuracyScore}%</p>
          <p className="text-xs text-slate-text mt-1">Accuracy</p>
          {fighter1.rank === 1 && (
            <span className="inline-block mt-2 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full font-semibold">
              👑 Current King
            </span>
          )}
        </div>

        {/* VS Badge */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-900/50">
            <span className="text-white font-black text-sm">VS</span>
          </div>
        </div>

        {/* Fighter 2 */}
        <div className="flex-1 bg-slate-card border border-slate-border rounded-xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-900 ring-2 ring-emerald-500 ring-offset-2 ring-offset-[#0d1117] flex items-center justify-center mx-auto mb-3">
            <span className="text-emerald-400 font-bold text-lg">{initials(fighter2.name)}</span>
          </div>
          <h3 className="font-semibold text-white-heading text-sm mb-1">{fighter2.name}</h3>
          <p className="text-2xl font-extrabold text-emerald-accent">{fighter2.accuracyScore}%</p>
          <p className="text-xs text-slate-text mt-1">Accuracy</p>
        </div>
      </div>
    </section>
  )
}
