export const revalidate = 3600

export async function GET() {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        }`,
        variables: { username: 'Mustakim_Shikalgar' }
      })
    })
    const data = await res.json()
    const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum
    const total = stats?.find((s: any) => s.difficulty === 'All')?.count ?? 815
    const hard = stats?.find((s: any) => s.difficulty === 'Hard')?.count ?? 126
    return Response.json({ total, hard })
  } catch {
    return Response.json({ total: 815, hard: 126 })
  }
}
