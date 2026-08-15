export const profile = {
  handle: "~/austin-yang",
  name: "Austin Yang",
  role: "Systems programmer working close to the kernel — runtimes, allocators, debuggers, build systems. CS @ Columbia.",
  location: "new york, ny",
  school: "Columbia University",
  email: "awtyang21@gmail.com",
  linkedin: "https://www.linkedin.com/in/ayang21/",
  linkedinLabel: "linkedin.com/in/ayang21",
  github: "https://github.com/ywentao2",
  githubLabel: "github.com/ywentao2",
}

export const metrics = [
  {
    label: "content views tracked",
    value: 1000000,
    suffix: "+",
    sub: "50+ creators · omen trade",
    accent: "amber" as const,
  },
  {
    label: "bot winrate",
    value: 47,
    suffix: "%",
    sub: "on par with pro players",
    accent: "cyan" as const,
  },
  {
    label: "throughput monitored",
    value: 5000,
    suffix: "",
    sub: "req/s · k8s cluster",
    accent: "amber" as const,
  },
  {
    label: "systems projects",
    value: 4,
    suffix: "",
    sub: "runtime · allocator · debugger · build",
    accent: "cyan" as const,
  },
]

export type ExperienceItem = {
  pid: string
  status: "running" | "complete"
  name: string
  desc: string
}

export const experience: ExperienceItem[] = [
  {
    pid: "4471",
    status: "running",
    name: "Software Developer Intern — Omen Trade",
    desc: "Designed and built a C++20 engine scoring traders' real trade histories against an idealized optimal-policy benchmark for Omen Funded's account rules, using exact linear-system solvers, dynamic programming, and Monte Carlo simulation parallelized across std::jthread worker pools.\nBuilt Grafana dashboards monitoring Kubernetes cluster health and AI agent workloads at ~5,000 req/s for a fintech trading startup. Designed a full-stack creator analytics platform (Next.js, React, Neon Postgres) integrating platform APIs to track real-time view metrics and detect sponsored content via caption/bio parsing across 50+ creators, accumulating 1M+ views.",
  },
  
]

export type TerminalLine = {
  type: "prompt" | "info" | "result"
  text: string
}

export type Project = {
  title: string
  tags: string[]
  terminal?: TerminalLine[]
  desc: string
}

export const projects: Project[] = [
  {
    title: "doudizhu-engine",
    tags: ["C++20", "MCTS", "game theory"],
    terminal: [
      { type: "prompt", text: "$ ./mcts_bot --games 10000" },
      { type: "info", text: "[INFO] UCT constant: sqrt(2)" },
      { type: "info", text: "[INFO] rollout policy: random" },
      { type: "result", text: "[RESULT] landlord winrate: 47.2%" },
      { type: "result", text: "[RESULT] avg time/move: 138ms" },
      { type: "info", text: "[INFO] simulation complete, 10000/10000 games" },
    ],
    desc: "A from-scratch rules engine for 斗地主 (Dou Dizhu) paired with a Monte Carlo tree search decision engine including UCT selection, expansion, rollout, and backpropagation — tuned across thousands of self-play games.",
  },
  {
    title: "Linux container runtime",
    tags: ["C", "namespaces", "cgroups v2"],
    terminal: [
      { type: "prompt", text: "$ ./runtime run --rootless alpine" },
      { type: "info", text: "[INFO] clone(CLONE_NEWPID|NEWNS|NEWUTS|NEWNET)" },
      { type: "info", text: "[INFO] pivot_root -> /var/lib/runtime/rootfs" },
      { type: "info", text: "[INFO] cgroups v2: memory.max=256M pids.max=64" },
      { type: "result", text: "[RESULT] seccomp loaded, caps dropped, pid 1 started" },
    ],
    desc: "A rootless Linux container runtime in C using clone() with multiple namespaces, cgroups v2 for resource limits, pivot_root() for filesystem isolation, and libcap/seccomp for capability dropping and syscall filtering without root access.",
  },
  {
    title: "Dynamic memory allocator",
    tags: ["C", "malloc", "systems"],
    terminal: [
      { type: "prompt", text: "$ ./mdriver -t traces/realloc-bal.rep" },
      { type: "info", text: "[INFO] free list: explicit, first-fit" },
      { type: "info", text: "[INFO] coalescing: boundary tags, all 4 cases" },
      { type: "result", text: "[RESULT] utilization: 92.3%" },
      { type: "result", text: "[RESULT] throughput: 4.1M ops/sec" },
    ],
    desc: "A 64-bit dynamic memory allocator built from scratch in C using explicit doubly-linked free list, first-fit placement, boundary-tag coalescing, block splitting, and page-aligned heap extension via a custom mmap-backed sbrk model. Block metadata packed into 64-bit bitfield headers with matching footer tags.",
  },
  {
    title: "Linux debugger",
    tags: ["C", "ptrace", "ELF"],
    terminal: [
      { type: "prompt", text: "$ ./dbg ./target" },
      { type: "info", text: "[INFO] breakpoint set @ 0x401136 (main)" },
      { type: "info", text: "[INFO] 0xcc injected, original byte saved" },
      { type: "result", text: "[RESULT] SIGTRAP caught, RIP rolled back" },
      { type: "info", text: "[INFO] backtrace: main <- __libc_start_main" },
    ],
    desc: "A Linux debugger in C built on ptrace() with single-step execution, software breakpoints with INT3 injection, saved-byte restoration and RIP rollback, and byte-level memory access. Parses ELF section headers to resolve symtab/strtab and walk saved RIP chains into a full stack backtrace.",
  },
  {
    title: "C++ build system",
    tags: ["C++", "DAG", "Makefile"],
    terminal: [
      { type: "prompt", text: "$ mymake" },
      { type: "info", text: "[INFO] parsing Makefile, resolving DAG..." },
      { type: "info", text: "g++ -c main.cpp -o build/main.o" },
      { type: "info", text: "g++ -c parser.cpp -o build/parser.o" },
      { type: "info", text: "g++ build/main.o build/parser.o -o build/app" },
      { type: "result", text: "[RESULT] build succeeded, 2 targets rebuilt, 3 cached" },
    ],
    desc: "A build system clone with regex-based Makefile parsing, DAG dependency resolution with cycle detection, stat()-driven staleness checks, and a custom binary serialization library used to cache parsed rules across runs.",
  },
]

export type StackItem = {
  label: string
  category: string
  level: number
  accent: "amber" | "cyan"
}

export const stack: StackItem[] = [
  { label: "C", category: "systems", level: 92, accent: "amber" },
  { label: "C++", category: "systems", level: 90, accent: "amber" },
  { label: "x86-64 Assembly", category: "low-level", level: 75, accent: "cyan" },
  { label: "Go", category: "services", level: 70, accent: "amber" },
  { label: "Kubernetes / Docker", category: "infra", level: 80, accent: "amber" },
  { label: "PostgreSQL / Neon", category: "data", level: 78, accent: "cyan" },
]

export const achievements = [
  { year: "2025", text: "\"Most Popular\", WatrFall — Top 1 of 100+ (Columbia DevFest 2025)" },
  { year: "2024", text: "\"Best Use of Auth0\", NeuroTalent — Top 1 of 60+ (Columbia DivHacks 2024)" },
]