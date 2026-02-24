import { useParams, Link } from 'react-router-dom'
import { useYoutuber } from '../hooks/useYoutuber'
import { useVote } from '../hooks/useVote'
import {
  computeAvgPriceImpact,
  computeRiskProfile,
  computeWinRateByToken,
  computeSentimentAccuracy,
  computeConfidenceCalibration,
  computeMonthlyTrend,
} from '../services/api'
import VoteButtons from '../components/profile/VoteButtons'
import LockedOverlay from '../components/profile/LockedOverlay'
import AuditorHeader from '../components/proof/AuditorHeader'
import StatsGrid from '../components/proof/StatsGrid'
import PredictionTimeline from '../components/proof/PredictionTimeline'

export default function ProfilePage() {
  const { slug } = useParams()
  const { youtuber, loading } = useYoutuber(slug)
  const { hasVoted, vote } = useVote(slug)

  if (loading) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-slate-text">Loading...</p>
      </div>
    )
  }

  if (!youtuber) {
    return (
      <div className="px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white-heading mb-4">YouTuber not found</h2>
        <Link to="/" className="text-emerald-accent hover:underline">
          Back to Leaderboard
        </Link>
      </div>
    )
  }

  const isLocked = youtuber.accuracyScore >= 80
  const calls = youtuber.calls || []

  // Compute all analytics from calls
  const avgImpact = computeAvgPriceImpact(calls)
  const riskProfile = computeRiskProfile(calls)
  const winRateByToken = computeWinRateByToken(calls)
  const sentimentAccuracy = computeSentimentAccuracy(calls)
  const confidenceCalibration = computeConfidenceCalibration(calls)
  const monthlyTrend = computeMonthlyTrend(calls)

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-5xl mx-auto">
      {/* Back nav */}
      <Link to="/" className="text-emerald-accent hover:underline text-sm mb-6 inline-flex items-center gap-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to Leaderboard
      </Link>

      {/* Auditor Header */}
      <AuditorHeader
        youtuber={youtuber}
        avgImpact={avgImpact}
        riskProfile={riskProfile}
      />

      {/* Community Voting */}
      <div className="mt-6">
        <VoteButtons votes={youtuber.votes} onVote={vote} hasVoted={hasVoted} />
      </div>

      {/* Analytics + Timeline (lockable section) */}
      <div className="relative">
        <StatsGrid
          winRateByToken={winRateByToken}
          sentimentAccuracy={sentimentAccuracy}
          confidenceCalibration={confidenceCalibration}
          monthlyTrend={monthlyTrend}
        />

        <PredictionTimeline calls={calls} />

        {isLocked && <LockedOverlay score={youtuber.accuracyScore} />}
      </div>
    </div>
  )
}
