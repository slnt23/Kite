<script setup lang="ts">
import type { ProfileCardExample } from '@/types'

defineProps<{
  cards: ProfileCardExample[]
}>()
</script>

<template>
  <section class="profile-stack">
    <article v-for="card in cards" :key="card.title" class="profile-card">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </article>
  </section>
</template>

<style scoped lang="scss">
.profile-stack {
  display: grid;
  gap: 16px;
}

.profile-card {
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.05);
}

.profile-card h3 {
  margin: 0 0 10px;
  color: var(--color-text);
  font-size: 1.05rem;
}

.profile-card p {
  margin: 0;
  color: var(--color-text-soft);
  line-height: 1.7;
}
</style>
