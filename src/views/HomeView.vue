<script setup lang="ts">
import PageLayout from '../components/design/PageLayout.vue'


const navGroups: { label: string; items: { id: string; label: string }[] }[] = []
</script>

<template>
  <PageLayout title="GPS2" title-accent="Design" page-title="GPS2 Design System Home" :nav-groups="navGroups">
    <template #brand-subtitle>Design System</template>
    <template #page-meta>
      <div class="page-meta">
        <span class="badge">Work in Progress</span>
      </div>
    </template>

    <div class="home-message">
      <p>Work in progress — guinea pig game chrome being assembled.</p>
    </div>
  </PageLayout>
</template>

<style scoped>
.home-message {
  margin-block-start: var(--space-8);
  color: var(--color-neutral-500);
  font-size: var(--font-size-lg);
}
</style>
