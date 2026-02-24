const stats = [
  { value: '1,245', label: 'Videos Tracked' },
  { value: '4,890', label: 'Predictions Audited' },
  { value: '24/7', label: 'Market Monitoring' },
]

export default function SocialProof() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
      <p className="text-center text-emerald-accent text-xs font-semibold uppercase tracking-widest mb-6">
        Verified Accuracy
      </p>
      <div className="grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-white-heading">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-slate-text mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
