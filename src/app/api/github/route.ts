export const revalidate = 1800

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/users/MustakimFS/events/public')
    const events = await res.json()
    const pushEvent = events.find((e: any) => e.type === 'PushEvent')
    const repo = pushEvent?.repo?.name?.replace('MustakimFS/', '') ?? 'distributed-kv-store'
    const message = pushEvent?.payload?.commits?.[0]?.message ?? 'latest commit'
    const time = pushEvent?.created_at ?? new Date().toISOString()
    return Response.json({ repo, message: message.slice(0, 40), time })
  } catch {
    return Response.json({ repo: 'distributed-kv-store', message: 'feat: quorum reads', time: new Date().toISOString() })
  }
}
