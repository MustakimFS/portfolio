'use client'

import { useEffect, useState } from 'react'
import { timeAgo } from '@/lib/liveData'

interface ClientTimeAgoProps {
  iso: string
  serverFallback: string
}

/**
 * Renders a relative time string. Avoids hydration mismatch errors by
 * rendering the server-calculated fallback initially and updating to client-side
 * relative time upon mounting.
 */
export default function ClientTimeAgo({ iso, serverFallback }: ClientTimeAgoProps) {
  const [text, setText] = useState(serverFallback)

  useEffect(() => {
    setText(timeAgo(iso))
  }, [iso])

  return <>{text}</>
}
