<script setup lang="ts">
import type { ProfileInfoExample } from '@/types'

defineProps<{
  cards: ProfileInfoExample[]
}>()
</script>

<template>
  <section class="profile-grid">
    <article v-for="card in cards" :key="card.label" class="profile-info-card">
      <span>{{ card.label }}</span>
      <strong>{{ card.value }}</strong>
    </article>
  </section>
</template>

<style scoped lang="scss">
.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.profile-info-card {
  padding: 20px 22px;
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.05);
}

.profile-info-card span {
  color: var(--color-text-soft);
}

.profile-info-card strong {
  display: block;
  margin-top: 8px;
  color: var(--color-text);
}

@media (max-width: 760px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
