export default function Footer() {
  return (
    <footer className="border-t border-slate-border py-8 mt-auto">
      <p className="text-center text-sm text-slate-text/60">
        InfluTracker {new Date().getFullYear()}. Not financial advice.
      </p>
    </footer>
  )
}
