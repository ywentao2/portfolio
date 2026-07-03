const GITHUB_USERNAME = "ywentao2"

type Repo = {
  name: string
  full_name: string
  fork: boolean
  archived: boolean
  languages_url: string
}

export type LanguageStat = {
  label: string
  bytes: number
  pct: number
}

async function githubFetch(url: string) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  // Set GITHUB_TOKEN in your env (server-only, never exposed to the
  // client) to raise the rate limit from 60/hr to 5,000/hr AND to
  // include private repos. The token needs "repo" scope for private
  // repos to show up — that's read/write access to all your private
  // repos, so keep it out of git and only ever reference it here.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(url, {
    headers,
    // Cache for an hour — visitors never trigger a live GitHub call.
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${url}`)
  }

  return res.json()
}

async function getAllRepos(username: string): Promise<Repo[]> {
  const repos: Repo[] = []
  let page = 1

  // With a token present, use the authenticated endpoint so private
  // repos are included. Without one, fall back to the public listing.
  const hasToken = Boolean(process.env.GITHUB_TOKEN)
  const baseUrl = hasToken
    ? "https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator"
    : `https://api.github.com/users/${username}/repos`

  while (true) {
    const sep = baseUrl.includes("?") ? "&" : "?"
    const batch: Repo[] = await githubFetch(
      `${baseUrl}${sep}per_page=100&page=${page}`
    )
    repos.push(...batch)
    if (batch.length < 100) break
    page += 1
  }

  return repos.filter((r) => !r.fork && !r.archived)
}

// Repos to exclude from the language aggregation — e.g. this portfolio
// site itself, whose TS/CSS boilerplate isn't really a skill signal.
// Keyed by "owner/repo" since collaborator repos can share bare names
// with repos you own (e.g. two different repos both named "amen").
const EXCLUDED_REPOS = new Set(["ywentao2/portfolio"])

// Manual weight per repo (default 1 if not listed). Use this to boost
// projects that represent real, sustained work — commit history can't
// be trusted here since some repos were bulk-uploaded from elsewhere
// in a single commit rather than built up organically.
const REPO_WEIGHTS: Record<string, number> = {
  "ywentao2/asp": 6, // advanced systems programming: debugger, allocator, container runtime
  "ywentao2/c2cpp": 5, // mymake / C++ build system
  "ywentao2/doudizhu": 5, // MCTS bot
  "ywentao2/ugc_scraper": 4, // Omen Trade creator analytics platform
  "ywentao2/devtao": 3, // WatrFall — DevFest "Most Popular"
  "ywentao2/divhacks2024": 3, // NeuroTalent — DivHacks "Best Use of Auth0"
  "SKNat26/Beli-4111-Databases-Project": 2, // collaborator repo, real coursework
  "jlimmadeit/amen": 2, // collaborator repo, Omen internal scripting
}

function weightFor(fullName: string): number {
  return REPO_WEIGHTS[fullName] ?? 1
}

/**
 * Aggregates language usage across all of a user's non-fork,
 * non-archived public (and, with a token, private) repos.
 *
 * Normalized by averaging each language's *share within a repo* across
 * repos, weighted by REPO_WEIGHTS — so a large repo with lots of
 * generated/boilerplate code doesn't drown out smaller, denser
 * projects, and repos that don't reflect real hands-on work (e.g.
 * bulk-uploaded code) can be down-weighted explicitly rather than
 * guessed at from repo metadata.
 */
export async function getLanguageStack(
  username: string = GITHUB_USERNAME
): Promise<LanguageStat[]> {
  const repos = (await getAllRepos(username)).filter(
    (r) => !EXCLUDED_REPOS.has(r.full_name)
  )

  const shareSums = new Map<string, number>()
  let totalWeight = 0

  await Promise.all(
    repos.map(async (repo) => {
      try {
        const langs: Record<string, number> = await githubFetch(repo.languages_url)
        const repoTotal = Object.values(langs).reduce((a, b) => a + b, 0)
        if (repoTotal === 0) return

        const weight = weightFor(repo.full_name)
        totalWeight += weight

        for (const [lang, bytes] of Object.entries(langs)) {
          const share = bytes / repoTotal
          shareSums.set(lang, (shareSums.get(lang) ?? 0) + share * weight)
        }
      } catch (err) {
        // Log rather than silently skip — a swallowed error here looks
        // identical to "this repo has no C code" from the outside.
        console.error(`[github-stack] failed to load languages for ${repo.full_name}:`, err)
      }
    })
  )

  if (totalWeight === 0) return []

  return [...shareSums.entries()]
    .map(([label, sum]) => ({
      label,
      bytes: sum, // repurposed: weighted average share, not raw bytes
      pct: (sum / totalWeight) * 100,
    }))
    .sort((a, b) => b.pct - a.pct)
}