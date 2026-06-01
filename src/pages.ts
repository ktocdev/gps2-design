// Central page registry — source of truth for the sidebar's inter-page navigation.
// Add a page here (and its route in router/index.ts) to surface it in the nav.

export interface PageDef {
  path: string
  label: string
  group: string | null // null = top-level (ungrouped); otherwise the sidebar group heading
  href?: string        // if set, renders as a plain <a> instead of RouterLink
}

export const pages: PageDef[] = [
  { path: '/',                label: 'Home',            group: null },
  { path: '/prototype',       label: 'Prototype',       group: null, href: `${import.meta.env.BASE_URL}prototype/index.html` },
  { path: '/tokens',          label: 'Tokens',          group: 'Foundations' },
  { path: '/design-elements', label: 'Design Elements', group: 'Foundations' },
]
