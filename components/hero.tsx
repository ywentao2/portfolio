import { profile } from "@/lib/data"

export function Hero() {
  return (
    <header className="pt-16">
      <p className="mb-4 font-mono text-xs tracking-wide text-amber">
        {profile.handle}
      </p>
      <h1 className="mb-2.5 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mb-7 max-w-[520px] text-pretty text-[17px] text-text-dim">
        {profile.role}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] text-text-faint">
        <span>{profile.school}</span>
        <a
          href={`mailto:${profile.email}`}
          className="text-cyan hover:underline"
        >
          {profile.email}
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan hover:underline"
        >
          {profile.linkedinLabel}
        </a>
      </div>
    </header>
  )
}
