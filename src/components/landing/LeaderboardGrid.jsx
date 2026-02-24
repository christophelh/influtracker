import YoutuberCard from '../cards/YoutuberCard'

export default function LeaderboardGrid({ youtubers }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {youtubers.map((yt, index) => (
        <YoutuberCard key={yt.id} youtuber={yt} rank={index + 1} />
      ))}
    </div>
  )
}
