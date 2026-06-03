import { getGithubActivity } from '@/lib/liveData'

export const revalidate = 1800

export async function GET() {
  const activity = await getGithubActivity()
  const head = activity.commits[0]
  return Response.json({
    repo: head.repo,
    message: head.message.slice(0, 40),
    time: head.time,
    commits: activity.commits,
    live: activity.live,
  })
}
