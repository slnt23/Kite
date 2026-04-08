<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  primaryLabel: {
    type: String,
    required: true,
  },
  primaryTo: {
    type: String,
    required: true,
  },
  secondaryLabel: {
    type: String,
    required: true,
  },
  secondaryTo: {
    type: String,
    required: true,
  },
  stats: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="hero-panel section-grid">
    <div class="hero-panel__copy">
      <p class="hero-panel__eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p class="hero-panel__description">{{ description }}</p>

      <div class="hero-panel__actions">
        <RouterLink class="button-link button-link--primary" :to="primaryTo">
          {{ primaryLabel }}
        </RouterLink>
        <RouterLink class="button-link" :to="secondaryTo">
          {{ secondaryLabel }}
        </RouterLink>
      </div>
    </div>

    <div class="hero-panel__stats">
      <article v-for="stat in stats" :key="stat.label" class="metric-card">
        <strong>{{ stat.value }}</strong>
        <span>{{ stat.label }}</span>
      </article>
    </div>
  </section>
</template>
