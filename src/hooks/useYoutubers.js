import { useState, useEffect } from 'react'
import { getAllYoutubers } from '../services/api'

export function useYoutubers() {
  const [youtubers, setYoutubers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getAllYoutubers()
    setYoutubers(data.sort((a, b) => b.accuracyScore - a.accuracyScore))
    setLoading(false)
  }, [])

  return { youtubers, loading }
}
