<script setup lang="ts">
defineProps<{
  id: string
  title: string
  count?: string
}>()
</script>

<template>
  <section class="section" :id="id">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <span v-if="count" class="section-count">{{ count }}</span>
    </div>
    <slot />
  </section>
</template>
