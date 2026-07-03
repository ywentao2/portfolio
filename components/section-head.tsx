export function SectionHead({ path, title }: { path: string; title: string }) {
  return (
    <div className="mb-7 flex flex-col gap-1.5">
      <span className="font-mono text-xs text-text-faint">{path}</span>
      <h2 className="font-display text-xl font-medium">{title}</h2>
    </div>
  )
}