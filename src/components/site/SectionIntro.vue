<script setup>
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
})
</script>

<template>
  <header class="section-intro">
    <p class="eyebrow-label">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p class="section-intro__body">{{ description }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-intro h2 {
  margin: 0 0 14px;
  color: var(--color-text-deep);
  line-height: 1.08;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
}

.section-intro__body {
  color: var(--color-muted-deep);
}
</style>
