<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="timeline">
    <article v-for="item in items" :key="item.year" class="timeline__item">
      <span class="timeline__year">{{ item.year }}</span>
      <div class="timeline__content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.timeline {
  display: grid;
  gap: 18px;
}

.timeline__item {
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  gap: 18px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
}

.timeline__item:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.timeline__year {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 800;
  letter-spacing: 0.1em;
}

.timeline__content h3 {
  margin: 0 0 10px;
  color: var(--color-text);
}

.timeline__content p {
  margin: 0;
  color: var(--color-text-soft);
}

@media (max-width: 760px) {
  .timeline__item {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
