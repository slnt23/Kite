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
    <p>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
    <p class="section-intro__body">{{ description }}</p>
  </header>
</template>

<style scoped>
.section-intro p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.section-intro h2 {
  margin: 0 0 14px;
  color: var(--color-text);
  line-height: 1.08;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
}

.section-intro__body {
  color: var(--color-text-soft);
}
</style>
