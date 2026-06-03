/**
 * Live-data fetchers for LeetCode + GitHub.
 *
 * Both `getLeetcodeStats` and `getGithubActivity` are safe to call from
 * Server Components (they use `fetch` with `next: { revalidate }`, which
 * piggy-backs on Next.js's Data Cache). They never throw — on failure they
 * return cached defaults so the UI always has something to show.
 */

/* ─── LeetCode ────────────────────────────────────────────────────────── */

export interface LeetcodeStats {
  total: number
  easy: number
  medium: number
  hard: number
  ranking: number
  rating: number
  topPercentage: number
  /** ISO timestamp of the most recent accepted submission, or now() if unknown. */
  lastSubmission: string
  /** Whether the response came from the live API (false = cached defaults). */
  live: boolean
}

const LEETCODE_DEFAULTS: LeetcodeStats = {
  total: 815,
  easy: 550,
  medium: 139,
  hard: 126,
  ranking: 47287,
  rating: 1841,
  topPercentage: 6.44,
  lastSubmission: new Date().toISOString(),
  live: false,
}

export async function getLeetcodeStats(): Promise<LeetcodeStats> {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0',
      },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            profile { ranking }
            submitStats { acSubmissionNum { difficulty count } }
          }
          userContestRanking(username: $username) {
            rating
            globalRanking
            topPercentage
          }
          recentSubmissionList(username: $username, limit: 1) { timestamp }
        }`,
        variables: { username: 'Mustakim_Shikalgar' },
      }),
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`leetcode: ${res.status}`)
    const data = await res.json()
    const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum
    if (!stats) throw new Error('leetcode: empty')
    const find = (d: string) =>
      stats.find((s: { difficulty: string; count: number }) => s.difficulty === d)?.count ?? 0
    const recent = data?.data?.recentSubmissionList?.[0]?.timestamp
    const lastSubmission = recent
      ? new Date(parseInt(recent, 10) * 1000).toISOString()
      : new Date().toISOString()
    return {
      total: find('All') || LEETCODE_DEFAULTS.total,
      easy: find('Easy') || LEETCODE_DEFAULTS.easy,
      medium: find('Medium') || LEETCODE_DEFAULTS.medium,
      hard: find('Hard') || LEETCODE_DEFAULTS.hard,
      ranking: data?.data?.matchedUser?.profile?.ranking ?? LEETCODE_DEFAULTS.ranking,
      rating: data?.data?.userContestRanking?.rating ? Math.round(data.data.userContestRanking.rating) : LEETCODE_DEFAULTS.rating,
      topPercentage: data?.data?.userContestRanking?.topPercentage ?? LEETCODE_DEFAULTS.topPercentage,
      lastSubmission,
      live: true,
    }
  } catch {
    return LEETCODE_DEFAULTS
  }
}

/* ─── GitHub ─────────────────────────────────────────────────────────── */

export interface GithubCommit {
  repo: string
  message: string
  time: string
  sha: string
}

export interface GithubActivity {
  commits: GithubCommit[]
  live: boolean
}

const GITHUB_DEFAULTS: GithubActivity = {
  commits: [
    {
      repo: 'portfolio',
      message: 'feat: window-portfolio redesign',
      time: new Date().toISOString(),
      sha: '0000000',
    },
  ],
  live: false,
}

export async function getGithubActivity(limit = 6): Promise<GithubActivity> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(
      'https://api.github.com/users/MustakimFS/events/public?per_page=30',
      { headers, next: { revalidate: 1800 } },
    )
    if (!res.ok) throw new Error(`gh: ${res.status}`)
    const events: Array<{
      type: string
      repo?: { name?: string }
      created_at?: string
      payload?: { commits?: Array<{ message?: string; sha?: string }> }
    }> = await res.json()

    const commits: GithubCommit[] = []
    for (const ev of events) {
      if (ev.type !== 'PushEvent') continue
      const repo = ev.repo?.name?.replace('MustakimFS/', '') ?? 'unknown'
      const time = ev.created_at ?? new Date().toISOString()
      for (const c of ev.payload?.commits ?? []) {
        const firstLine = (c.message ?? '').split('\n')[0]
        commits.push({
          repo,
          message: firstLine.slice(0, 64),
          time,
          sha: (c.sha ?? '').slice(0, 7),
        })
        if (commits.length >= limit) break
      }
      if (commits.length >= limit) break
    }
    if (commits.length === 0) throw new Error('no commits')
    return { commits, live: true }
  } catch {
    return GITHUB_DEFAULTS
  }
}

/* ─── Formatting helpers (server- + client-safe) ─────────────────────── */

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const seconds = Math.max(1, Math.floor((now - then) / 1000))
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(days / 365)
  return `${years}y ago`
}
