<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="feature-grid">
    <article v-for="item in items" :key="item.title" class="feature-card glass-panel">
      <p class="feature-card__icon">{{ item.icon }}</p>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </article>
  </div>
</template>

<style scoped>
/* 共用主题变量与可复用样式见 src/style.css：glass-panel */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.feature-card {
  padding: 28px;
  border-radius: 26px;
}

.feature-card__icon {
  width: 44px;
  height: 44px;
  margin: 0 0 18px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.16);
  color: var(--color-accent);
  font-weight: 800;
}

.feature-card h3 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.feature-card p:last-child {
  margin: 0;
  color: var(--color-text-soft);
}

@media (max-width: 960px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .feature-card {
    padding: 20px;
  }
}
</style>
