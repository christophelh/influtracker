import { useState, useEffect } from 'react'
import { getYoutuberBySlug } from '../services/api'

export function useYoutuber(slug) {
  const [youtuber, setYoutuber] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const data = getYoutuberBySlug(slug)
    setYoutuber(data)
    setLoading(false)
  }, [slug])

  return { youtuber, loading }
}
