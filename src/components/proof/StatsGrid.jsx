import WinRateByToken from './WinRateByToken'
import SentimentAccuracy from './SentimentAccuracy'
import ConfidenceCalibration from './ConfidenceCalibration'
import MonthlyTrend from './MonthlyTrend'

export default function StatsGrid({ winRateByToken, sentimentAccuracy, confidenceCalibration, monthlyTrend }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-white-heading mb-6 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-accent">
          <path d="M3 3V21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 16L11 10L15 13L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Analytics Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WinRateByToken data={winRateByToken} />
        <SentimentAccuracy data={sentimentAccuracy} />
        <ConfidenceCalibration data={confidenceCalibration} />
        <MonthlyTrend data={monthlyTrend} />
      </div>
    </div>
  )
}
