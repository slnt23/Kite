<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="overview-panel panel">
    <div class="overview-panel__copy">
      <p class="section-tag">Architecture Layer</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="overview-panel__stats">
      <article v-for="stat in stats" :key="stat.label" class="stat-card">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </article>
    </div>

    <ul class="overview-panel__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>
  </section>
</template>
