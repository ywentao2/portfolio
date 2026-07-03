import { achievements } from "@/lib/data"
import { SectionHead } from "@/components/section-head"

export function Achievements() {
  return (
    <section className="py-14">
      <SectionHead path="$ cat achievements.txt" title="Achievements" />
      <div className="flex flex-col gap-2.5">
        {achievements.map((item) => (
          <div key={item.text} className="flex items-baseline gap-3 text-sm">
            <span className="flex-shrink-0 rounded-sm border border-term-green/25 bg-term-green/[0.06] px-2 py-0.5 font-mono text-[11px] text-term-green">
              {item.year}
            </span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
