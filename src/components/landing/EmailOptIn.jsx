import { useState } from 'react'

export default function EmailOptIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: integrate with email service (Mailchimp, ConvertKit, Supabase, etc.)
    setSubmitted(true)
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-slate-card border border-slate-border rounded-2xl px-6 sm:px-12 py-12 sm:py-14">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-xl mx-auto text-center">
          <p className="text-emerald-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Free Weekly Report
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white-heading leading-tight">
            Get the "Alpha Weekly" Report
          </h2>
          <p className="text-slate-text mt-3 text-sm leading-relaxed max-w-md mx-auto">
            Every Sunday, we send you the Top 3 most accurate calls and the Top 3 "Red Flags" detected by our AI. Skip the 50 hours of video watching.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-emerald-accent font-semibold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              You're in. First report drops Sunday.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your pro email..."
                required
                className="flex-1 bg-slate-bg border border-slate-border rounded-lg px-4 py-3 text-sm text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent transition-colors"
              />
              <button
                type="submit"
                className="bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors cursor-pointer text-sm whitespace-nowrap"
              >
                Join the Inner Circle
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-text/40 mt-4">
            No credit card. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
