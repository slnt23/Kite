<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="spotlight-list">
    <article
      v-for="(item, index) in items"
      :key="item.title"
      class="spotlight-card glass-panel"
      :class="{ 'spotlight-card--reverse': index % 2 === 1 }"
    >
      <div class="spotlight-card__image-wrap">
        <img class="spotlight-card__image" :src="item.image" :alt="item.title" />
      </div>

      <div class="spotlight-card__content">
        <p>{{ item.eyebrow }}</p>
        <h3>{{ item.title }}</h3>
        <p class="spotlight-card__description">{{ item.description }}</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
/* 共用主题变量与可复用样式见 src/style.css：glass-panel */
.spotlight-list {
  display: grid;
  gap: 20px;
}

.spotlight-card {
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(0, 1.05fr);
  overflow: hidden;
  border-radius: 30px;
}

.spotlight-card--reverse {
  grid-template-columns: minmax(0, 1.05fr) minmax(280px, 0.95fr);
}

.spotlight-card--reverse .spotlight-card__image-wrap {
  order: 2;
}

.spotlight-card__image {
  width: 100%;
  height: 100%;
  min-height: 300px;
  object-fit: cover;
}

.spotlight-card__content {
  padding: 28px;
}

.spotlight-card__content > p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.spotlight-card h3 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.spotlight-card__description {
  margin: 0;
  color: var(--color-text-soft);
}

@media (max-width: 960px) {
  .spotlight-card,
  .spotlight-card--reverse {
    grid-template-columns: 1fr;
  }

  .spotlight-card--reverse .spotlight-card__image-wrap {
    order: 0;
  }
}

@media (max-width: 760px) {
  .spotlight-card__content {
    padding: 20px;
  }
}
</style>
