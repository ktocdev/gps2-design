<script setup lang="ts">
import { ref, computed, watchEffect, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { pages } from '../../pages'

interface NavItem  { id: string; label: string }
interface NavGroup { label: string; items: NavItem[] }

const props = defineProps<{
  title: string
  titleAccent?: string
  pageTitle?: string
  navGroups: NavGroup[]
}>()

const route = useRoute()

// Inter-page navigation, sourced from the shared page registry.
// Ungrouped pages render first; named groups follow in first-seen order.
const pageNav = computed(() => {
  const ungrouped = pages.filter(p => !p.group)
  const named = new Map<string, typeof pages>()
  for (const p of pages) {
    if (!p.group) continue
    if (!named.has(p.group)) named.set(p.group, [])
    named.get(p.group)!.push(p)
  }
  return { ungrouped, groups: Array.from(named, ([label, items]) => ({ label, items })) }
})

watchEffect(() => {
  document.title = props.pageTitle ?? [props.title, props.titleAccent].filter(Boolean).join(' ')
})

const activeSection = ref(props.navGroups[0]?.items[0]?.id ?? '')
const mainRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id })
  }, { rootMargin: '-10% 0px -70% 0px' })
  mainRef.value?.querySelectorAll('.section').forEach(s => observer!.observe(s))
})

onUnmounted(() => { observer?.disconnect() })
</script>

<template>
  <div class="design-page">
    <nav class="sidebar">
      <div class="sidebar-brand">
        <h1>GPS2</h1>
        <span><slot name="brand-subtitle">Design System</slot></span>
      </div>

      <!-- Inter-page navigation -->
      <template v-for="p in pageNav.ungrouped" :key="p.path">
        <a v-if="p.href" :href="p.href" target="_blank" rel="noopener" class="nav-item">{{ p.label }}</a>
        <RouterLink v-else :to="p.path" class="nav-item" :class="{ active: route.path === p.path }">{{ p.label }}</RouterLink>
      </template>
      <template v-for="g in pageNav.groups" :key="g.label">
        <span class="nav-label">{{ g.label }}</span>
        <template v-for="p in g.items" :key="p.path">
          <a v-if="p.href" :href="p.href" target="_blank" rel="noopener" class="nav-item">{{ p.label }}</a>
          <RouterLink v-else :to="p.path" class="nav-item" :class="{ active: route.path === p.path }">{{ p.label }}</RouterLink>
        </template>
      </template>

      <!-- In-page section navigation (scroll-spy) -->
      <template v-for="group in navGroups" :key="group.label">
        <span class="nav-label nav-label--sections">{{ group.label }}</span>
        <a
          v-for="item in group.items"
          :key="item.id"
          :href="`#${item.id}`"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
        >{{ item.label }}</a>
      </template>
    </nav>
    <main class="design-main" ref="mainRef">
      <header class="page-header">
        <h1 class="page-title">{{ title }}<template v-if="titleAccent"> <span>{{ titleAccent }}</span></template></h1>
        <slot name="page-meta" />
      </header>
      <slot />
    </main>
  </div>
</template>
