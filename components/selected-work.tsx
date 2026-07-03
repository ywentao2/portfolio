import { projects, type TerminalLine } from "@/lib/data"
import { SectionHead } from "@/components/section-head"

function terminalColor(type: TerminalLine["type"]) {
  switch (type) {
    case "prompt":
      return "text-amber"
    case "result":
      return "text-cyan"
    default:
      return "text-text-faint"
  }
}

export function SelectedWork() {
  return (
    <section className="border-b border-line py-14">
      <SectionHead path="$ cat projects/*.log" title="Selected work" />
      <div className="flex flex-col gap-[18px]">
        {projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden rounded-md border border-line bg-panel"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4">
              <h3 className="font-display text-base font-medium">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] text-text-dim"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.terminal && (
              <div className="bg-background px-5 py-4 font-mono text-[12.5px] leading-[1.9] text-text-dim">
                {project.terminal.map((line, i) => {
                  const prev = project.terminal![i - 1]
                  const isNewSubsection =
                    i > 0 && prev.type !== "prompt" && line.type !== prev.type
                  return (
                    <div
                      key={i}
                      className={`${terminalColor(line.type)} ${isNewSubsection ? "mt-[1.9em]" : ""}`}
                    >
                      {line.text}
                    </div>
                  )
                })}
              </div>
            )}

            <p className="px-5 pb-[18px] pt-3.5 text-[13.5px] text-text-dim">
              {project.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
