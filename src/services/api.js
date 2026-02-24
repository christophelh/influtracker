import db from '../data/db.json'

// --- Persistence Layer (localStorage) ---
const STORAGE_KEY = 'influtracker-data'

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      // Corrupted data — re-seed
    }
  }
  const seed = JSON.parse(JSON.stringify(db))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

let data = loadData()

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/** Re-seed from db.json (dev utility — clears all manual changes) */
export function resetData() {
  const seed = JSON.parse(JSON.stringify(db))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  data = seed
}

// --- Slug helper ---
function slugify(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// --- YouTuber CRUD ---

export function getAllYoutubers() {
  return data.youtubers.map((yt) => ({
    ...yt,
    accuracyScore: calculateAccuracy(yt.calls),
    trend: calculateTrend(yt.calls),
  }))
}

export function getYoutuberBySlug(slug) {
  const yt = data.youtubers.find((y) => y.id === slug)
  if (!yt) return null
  return {
    ...yt,
    accuracyScore: calculateAccuracy(yt.calls),
    trend: calculateTrend(yt.calls),
  }
}

export function addYoutuber({ name, channelId, subscribers, description }) {
  const id = slugify(name)
  if (data.youtubers.find((y) => y.id === id)) {
    return { error: 'A source with this name already exists.' }
  }
  const newYt = {
    id,
    name,
    channelId: channelId || '',
    subscribers: subscribers || '0',
    description: description || '',
    calls: [],
    votes: { trust: 0, noWay: 0 },
  }
  data.youtubers.push(newYt)
  persist()
  return { success: true, youtuber: newYt }
}

export function updateYoutuber(id, fields) {
  const yt = data.youtubers.find((y) => y.id === id)
  if (!yt) return { error: 'YouTuber not found.' }
  const allowed = ['name', 'channelId', 'subscribers', 'description']
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      yt[key] = fields[key]
    }
  }
  persist()
  return { success: true }
}

export function deleteYoutuber(id) {
  const idx = data.youtubers.findIndex((y) => y.id === id)
  if (idx === -1) return { error: 'YouTuber not found.' }
  data.youtubers.splice(idx, 1)
  persist()
  return { success: true }
}

// --- Call CRUD ---

export function addCall(youtuberId, call) {
  const yt = data.youtubers.find((y) => y.id === youtuberId)
  if (!yt) return { error: 'YouTuber not found.' }
  yt.calls.push({ ...call, id: crypto.randomUUID() })
  persist()
  return { success: true }
}

export function updateCall(youtuberId, callId, fields) {
  const yt = data.youtubers.find((y) => y.id === youtuberId)
  if (!yt) return { error: 'YouTuber not found.' }
  const call = yt.calls.find((c) => c.id === callId)
  if (!call) return { error: 'Call not found.' }
  const allowed = ['token', 'sentiment', 'dateOfCall', 'sentimentAvg', 'priceMovePct', 'status', 'transcript']
  for (const key of allowed) {
    if (fields[key] !== undefined) {
      call[key] = fields[key]
    }
  }
  persist()
  return { success: true }
}

export function deleteCall(youtuberId, callId) {
  const yt = data.youtubers.find((y) => y.id === youtuberId)
  if (!yt) return { error: 'YouTuber not found.' }
  const idx = yt.calls.findIndex((c) => c.id === callId)
  if (idx === -1) return { error: 'Call not found.' }
  yt.calls.splice(idx, 1)
  persist()
  return { success: true }
}

// --- Votes ---

export function castVote(youtuberId, type) {
  const yt = data.youtubers.find((y) => y.id === youtuberId)
  if (yt) {
    yt.votes[type]++
    persist()
  }
}

// --- Computed Stats ---

function calculateAccuracy(calls) {
  const scored = calls.filter((c) => c.status === 'success' || c.status === 'fail')
  if (scored.length === 0) return 0
  const successes = scored.filter((c) => c.status === 'success').length
  return Math.round((successes / scored.length) * 100)
}

function calculateTrend(calls) {
  const scored = calls.filter((c) => c.status === 'success' || c.status === 'fail')
  if (scored.length < 2) return 'flat'
  const recent = scored.slice(-3)
  const recentRate = recent.filter((c) => c.status === 'success').length / recent.length
  const overallRate = scored.filter((c) => c.status === 'success').length / scored.length
  if (recentRate > overallRate + 0.1) return 'up'
  if (recentRate < overallRate - 0.1) return 'down'
  return 'flat'
}

// --- Proof Page stat computations ---

export function computeAvgPriceImpact(calls) {
  if (calls.length === 0) return 0
  const sum = calls.reduce((acc, c) => acc + (c.priceMovePct || 0), 0)
  return Math.round((sum / calls.length) * 100) / 100
}

export function computeRiskProfile(calls) {
  if (calls.length === 0) return { label: 'Unknown', level: 'moderate' }
  const tokens = [...new Set(calls.map((c) => c.token))]
  const blueChips = calls.filter((c) => c.token === 'BTC' || c.token === 'ETH').length
  const blueChipPct = (blueChips / calls.length) * 100
  if (tokens.length <= 2 && blueChipPct >= 80) return { label: 'Conservative', level: 'conservative' }
  if (tokens.length <= 4 && blueChipPct >= 50) return { label: 'Moderate', level: 'moderate' }
  return { label: 'Aggressive', level: 'aggressive' }
}

export function computeWinRateByToken(calls) {
  const groups = {}
  for (const c of calls) {
    if (!groups[c.token]) groups[c.token] = { token: c.token, wins: 0, total: 0 }
    groups[c.token].total++
    if (c.status === 'success') groups[c.token].wins++
  }
  return Object.values(groups)
    .map((g) => ({ ...g, rate: Math.round((g.wins / g.total) * 100) }))
    .sort((a, b) => b.total - a.total)
}

export function computeSentimentAccuracy(calls) {
  const groups = {}
  for (const c of calls) {
    const s = c.sentiment || 'neutral'
    if (!groups[s]) groups[s] = { sentiment: s, wins: 0, total: 0 }
    groups[s].total++
    if (c.status === 'success') groups[s].wins++
  }
  return Object.values(groups)
    .map((g) => ({ ...g, rate: Math.round((g.wins / g.total) * 100) }))
    .sort((a, b) => b.total - a.total)
}

export function computeConfidenceCalibration(calls) {
  const high = { wins: 0, total: 0 }
  const low = { wins: 0, total: 0 }
  for (const c of calls) {
    const bucket = Math.abs(c.sentimentAvg || 0) > 0.5 ? high : low
    bucket.total++
    if (c.status === 'success') bucket.wins++
  }
  return {
    highConf: { ...high, rate: high.total > 0 ? Math.round((high.wins / high.total) * 100) : 0 },
    lowConf: { ...low, rate: low.total > 0 ? Math.round((low.wins / low.total) * 100) : 0 },
  }
}

export function computeMonthlyTrend(calls) {
  const groups = {}
  for (const c of calls) {
    const month = (c.dateOfCall || '').slice(0, 7)
    if (!month) continue
    if (!groups[month]) groups[month] = { month, wins: 0, total: 0 }
    groups[month].total++
    if (c.status === 'success') groups[month].wins++
  }
  return Object.values(groups)
    .map((g) => ({ ...g, rate: Math.round((g.wins / g.total) * 100) }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

export function generateInsight(call) {
  const abs = Math.abs(call.sentimentAvg || 0)
  const strength = abs > 0.7 ? 'Strong' : abs > 0.3 ? 'Moderate' : 'Weak'
  const sentiment = call.sentiment === 'bullish' ? 'bullish' : call.sentiment === 'bearish' ? 'bearish' : 'neutral'
  const move = call.priceMovePct >= 0 ? `+${call.priceMovePct.toFixed(2)}%` : `${call.priceMovePct.toFixed(2)}%`
  const outcome = call.status === 'success' ? 'Prediction confirmed' : 'Prediction missed'
  return `${strength} ${sentiment} signal detected on ${call.token}. ${outcome} with ${move} price move.`
}
