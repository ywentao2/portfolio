"use client"

import { useEffect, useRef, useState } from "react"

export function useCountUp(target: number, duration = 1200, enabled = true) {
  const [value, setValue] = useState(0)
  const frameRef = useRef<number | null>(null)
  const decimals = Number.isInteger(target) ? 0 : (target.toString().split(".")[1]?.length ?? 0)
  const factor = 10 ** decimals

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setValue(target)
      return
    }

    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const raw = Math.round(eased * target * factor) / factor
      setValue(p < 1 ? raw : target)
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [target, duration, enabled, factor])

  return value
}
