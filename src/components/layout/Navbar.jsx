import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-bg/95 backdrop-blur-sm border-b border-slate-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-emerald-accent tracking-tight">
          InfluTracker
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-slate-text hover:text-white-heading transition-colors">
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  )
}
