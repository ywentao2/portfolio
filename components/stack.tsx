import { SectionHead } from "@/components/section-head"
import { getLanguageStack, type LanguageStat } from "@/lib/github-stack"

const BAR_WIDTH = 24 // characters

function bar(pct: number) {
  const filled = Math.max(1, Math.round((pct / 100) * BAR_WIDTH))
  return "█".repeat(filled) + "░".repeat(BAR_WIDTH - filled)
}

export async function Stack() {
  let langs: LanguageStat[] = []
  let failed = false

  try {
    langs = await getLanguageStack()
  } catch {
    failed = true
  }

  const top = langs.slice(0, 6)

  return (
    <section className="border-b border-line py-14">
      <SectionHead path="$ cloc --vcs=git ." title="Stack" />

      <div className="rounded-md border border-line bg-panel px-5 py-4 font-mono text-[12.5px] leading-[1.9]">
        {failed || top.length === 0 ? (
          <div className="text-text-faint">
            [ERROR] could not reach api.github.com — showing cached snapshot unavailable
          </div>
        ) : (
          top.map((lang, i) => (
            <div key={lang.label} className="flex items-center gap-4">
              <span
                className={`w-[130px] shrink-0 truncate ${
                  i % 2 === 0 ? "text-amber" : "text-cyan"
                }`}
              >
                {lang.label}
              </span>
              <span
                className={`tabular-nums ${
                  i % 2 === 0 ? "text-amber" : "text-cyan"
                }`}
              >
                {bar(lang.pct)}
              </span>
              <span className="w-[52px] shrink-0 text-right text-text-dim">
                {lang.pct.toFixed(0)}%
              </span>
            </div>
          ))
        )}
      </div>

      <p className="mt-3 font-mono text-[11px] text-text-faint">
        live from github.com/ywentao2 · aggregated by bytes of code, refreshed hourly
      </p>
    </section>
  )
}