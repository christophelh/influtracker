import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-white-heading mb-4">404</h1>
      <p className="text-xl text-slate-text mb-8">Page not found</p>
      <Link
        to="/"
        className="inline-block bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        Back to Leaderboard
      </Link>
    </div>
  )
}
