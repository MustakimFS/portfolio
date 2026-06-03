import { getLeetcodeStats } from '@/lib/liveData'

export const revalidate = 3600

export async function GET() {
  const stats = await getLeetcodeStats()
  return Response.json(stats)
}
