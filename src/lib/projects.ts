import { PROJECTS } from './data'

/**
 * Helpers for finding and ordering projects.
 *
 * Each project may declare a `tint` (case-study backdrop class), a `mockupUrl`
 * (the URL that appears in the browser-window address bar), a `mockupKind`
 * (which faux window represents it on the homepage), and other display fields.
 */

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  metrics?: Array<{ label: string; value: string }>
  tags: string[]
  github?: string | null
  demo?: string | null
  ieee?: string | null
  paper?: string | null
  featured?: boolean
  category: string
  note?: string
  playable?: boolean
  /** What kind of faux window to render on the homepage card. */
  mockupKind?: 'browser' | 'terminal' | 'editor'
  /** URL shown in the address bar of a browser-window mockup. */
  mockupUrl?: string
  /** Case-study backdrop tint class (`tint-stadia`, `tint-forest`, etc.). */
  tint?: 'stadia' | 'forest' | 'warm' | 'plum' | 'asu'
  /** Short one-liner shown on homepage cards & in the listing. */
  blurb?: string
  /** Year displayed in the homepage card metadata. */
  year?: string
  /** Video URL for the final showcase. */
  videoUrl?: string
}

/** Explicit overrides — pin a project to a specific window kind when it has a
 *  custom mockup (e.g. a real screenshot) that only makes sense in that frame. */
const KIND_OVERRIDES: Record<string, Project['mockupKind']> = {
  'mety-legal': 'browser',
}

const ROTATION: Project['mockupKind'][] = ['terminal', 'browser', 'editor', 'browser']
const TINT_ROTATION: Project['tint'][] = ['stadia', 'forest', 'warm', 'plum']

const decorate = (raw: unknown, i: number): Project => {
  const p = raw as Project
  return {
    ...p,
    mockupKind: KIND_OVERRIDES[p.id] ?? p.mockupKind ?? ROTATION[i % ROTATION.length],
    mockupUrl: p.mockupUrl ?? `mustakim.dev/projects/${p.id}`,
    tint: p.tint ?? TINT_ROTATION[i % TINT_ROTATION.length],
    blurb: p.blurb ?? p.subtitle,
    year: p.year ?? '2025',
  }
}

/** Returns projects in the order they appear on the homepage. */
export const FEATURED_PROJECTS: Project[] = (PROJECTS as unknown as Project[])
  .filter(p => p.featured)
  .map(decorate)

export const ALL_PROJECTS: Project[] = (PROJECTS as unknown as Project[]).map(decorate)

/** Projects not on the homepage hero — shown in the "More work" archive list. */
export const ARCHIVED_PROJECTS: Project[] = (PROJECTS as unknown as Project[])
  .filter(p => !p.featured)
  .map(decorate)

export const getProjectBySlug = (slug: string): Project | undefined =>
  ALL_PROJECTS.find(p => p.id === slug)

export const getNextProject = (slug: string): Project | undefined => {
  const idx = ALL_PROJECTS.findIndex(p => p.id === slug)
  if (idx === -1) return undefined
  return ALL_PROJECTS[(idx + 1) % ALL_PROJECTS.length]
}
