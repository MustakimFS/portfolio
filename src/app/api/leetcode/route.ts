export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify({
        query: `query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
          recentSubmissionList(username: $username, limit: 1) {
            timestamp
          }
        }`,
        variables: { username: 'Mustakim_Shikalgar' }
      })
    })
    const data = await res.json()
    const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum
    const total = stats?.find((s: any) => s.difficulty === 'All')?.count ?? 815
    const hard = stats?.find((s: any) => s.difficulty === 'Hard')?.count ?? 126
    const recent = data?.data?.recentSubmissionList?.[0]?.timestamp
    const lastSubmission = recent ? new Date(parseInt(recent) * 1000).toISOString() : new Date().toISOString()
    return Response.json({ total, hard, lastSubmission })
  } catch (err) {
    console.error("LeetCode API Error:", err)
    return Response.json({ total: 815, hard: 126, lastSubmission: new Date().toISOString() })
  }
}
