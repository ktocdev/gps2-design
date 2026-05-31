<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface NavItem  { id: string; label: string }
interface NavGroup { label: string; items: NavItem[] }

const props = defineProps<{
  title: string
  titleAccent?: string
  navGroups: NavGroup[]
}>()

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
      <template v-for="group in navGroups" :key="group.label">
        <span class="nav-label">{{ group.label }}</span>
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
