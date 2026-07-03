"use client"

import { useEffect, useState } from "react"
import { SectionHead } from "@/components/section-head"

export function ResumeSection() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <section className="border-b border-line py-14">
      <SectionHead path="$ cat Austin_Yang_Resume.pdf" title="Resume" />

      <div className="overflow-hidden rounded-md border border-line bg-panel">
        <div className="border-b border-line bg-background px-5 py-4 font-mono text-[12.5px] leading-[1.9]">
          <div className="text-text-faint">[INFO] one page · updated jul 2026</div>
          <div className="text-text-faint">...</div>
          <div className="mt-[0.2em] text-cyan">ready to view</div>
        </div>
        <div className="flex flex-wrap gap-3 px-5 py-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-sm border border-line px-4 py-2 font-mono text-xs text-text-dim transition-colors hover:border-cyan hover:text-cyan"
          >
            preview ↗
          </button>
          <a
            href="/Austin_Yang_Resume.pdf"
            download="Austin_Yang_Resume.pdf"
            className="rounded-sm border border-line px-4 py-2 font-mono text-xs text-text-dim transition-colors hover:border-amber hover:text-amber"
          >
            download ↓
          </a>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-md border border-line bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-mono text-xs text-text-dim">
                Austin_Yang_Resume.pdf
              </span>
              <div className="flex items-center gap-4 font-mono text-xs">
                <a
                  href="/Austin_Yang_Resume.pdf"
                  download="Austin_Yang_Resume.pdf"
                  className="text-text-dim hover:text-cyan"
                >
                  download
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close preview"
                  className="text-text-dim hover:text-amber"
                >
                  close ✕
                </button>
              </div>
            </div>
            <iframe
              src="/Austin_Yang_Resume.pdf"
              title="Austin Yang Resume"
              className="min-h-0 flex-1 bg-background"
            />
          </div>
        </div>
      )}
    </section>
  )
}