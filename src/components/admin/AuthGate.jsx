import { useState } from 'react'

const ADMIN_TOKEN_KEY = 'influtracker-admin-token'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin2024'

export default function AuthGate({ children }) {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem(ADMIN_TOKEN_KEY) === 'authenticated'
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_TOKEN_KEY, 'authenticated')
      setAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  if (authenticated) return children

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-slate-card border border-slate-border rounded-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-emerald-accent/20 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white-heading">Admin Access</h1>
          <p className="text-sm text-slate-text mt-1">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full bg-slate-bg border border-slate-border rounded-lg px-4 py-2.5 text-white-heading placeholder:text-slate-text/50 focus:outline-none focus:border-emerald-accent"
          />
          {error && <p className="text-rose-fail text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-emerald-accent hover:bg-emerald-accent-hover text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}

export function logout() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  window.location.reload()
}
