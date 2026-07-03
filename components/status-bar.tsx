"use client"

import { useEffect, useState } from "react"
import { profile } from "@/lib/data"

export function StatusBar() {
  const [time, setTime] = useState<string>("--:--:--")

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
        }),
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="border-b border-line bg-panel">
      <div className="mx-auto flex max-w-[920px] flex-wrap items-center justify-between gap-1.5 px-7 py-2.5 font-mono text-xs text-text-dim">
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full bg-term-green shadow-[0_0_0_2px_rgba(111,207,151,0.15)]"
          />
          online — {profile.location}
        </span>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap text-text-dim hover:text-cyan"
        >
          {profile.githubLabel}
        </a>
        <span className="tabular-nums" aria-label="current time">
          {time}
        </span>
      </div>
    </div>
  )
}