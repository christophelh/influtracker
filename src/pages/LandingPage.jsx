import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import EmailOptIn from '../components/landing/EmailOptIn'
import SocialProof from '../components/landing/SocialProof'
import LeaderboardGrid from '../components/landing/LeaderboardGrid'
import FeaturedBattle from '../components/landing/FeaturedBattle'
import { useYoutubers } from '../hooks/useYoutubers'

export default function LandingPage() {
  const { youtubers, loading } = useYoutubers()

  return (
    <>
      <Hero />
      <HowItWorks />
      <EmailOptIn />
      <SocialProof />
      {!loading && <FeaturedBattle youtubers={youtubers} />}
      <section id="leaderboard" className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white-heading mb-8 text-center">
          Top-Performing Youtuber Analysts
        </h2>
        {loading ? (
          <p className="text-center text-slate-text">Loading...</p>
        ) : (
          <LeaderboardGrid youtubers={youtubers} />
        )}
      </section>
    </>
  )
}
