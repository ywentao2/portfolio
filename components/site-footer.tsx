import { profile } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2.5 border-t border-line py-8">
      <div className="font-mono text-xs text-text-faint">
        © 2026 austin yang — build 1.0.0
      </div>
      <nav className="flex items-center gap-[18px] text-[13px]">
        <a href={`mailto:${profile.email}`} className="text-text-dim hover:text-cyan">
          contact
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-dim hover:text-cyan"
        >
          linkedin
        </a>
      </nav>
    </footer>
  )
}