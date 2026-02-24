import { useState, useCallback } from 'react'
import { castVote } from '../services/api'

export function useVote(youtuberId) {
  const storageKey = `vote-${youtuberId}`
  const [hasVoted, setHasVoted] = useState(
    () => localStorage.getItem(storageKey) !== null
  )

  const vote = useCallback(
    (type) => {
      if (hasVoted) return
      castVote(youtuberId, type)
      localStorage.setItem(storageKey, type)
      setHasVoted(true)
    },
    [hasVoted, youtuberId, storageKey]
  )

  return { hasVoted, vote }
}
