import { experience } from "@/lib/data"
import { SectionHead } from "@/components/section-head"

function StatusTag({ status }: { status: "running" | "complete" }) {
  if (status === "running") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-term-green/10 px-2 py-0.5 text-[11px] text-term-green">
        <span
          aria-hidden="true"
          className="inline-block size-1.5 rounded-full bg-term-green"
        />
        running
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-sm bg-cyan/10 px-2 py-0.5 text-[11px] text-cyan">
      complete
    </span>
  )
}

export function Experience() {
  return (
    <section className="border-b border-line py-14">
      <SectionHead path="$ ps aux --experience" title="Experience" />
      <div className="flex flex-col gap-5">
        {experience.map((item) => (
          <div
            key={item.pid}
            className="flex flex-col gap-1 border-b border-line pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:gap-4"
          >
            <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] text-text-faint sm:w-[150px]">
              <span>{item.pid}</span>
              <StatusTag status={item.status} />
            </div>
            <div>
              <div className="font-sans text-sm font-medium text-foreground">
                {item.name}
              </div>
              <div className="mt-1 font-sans text-[13px] leading-normal text-text-dim">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}