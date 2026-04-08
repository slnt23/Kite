<script setup>
defineProps({
  module: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="module-card">
    <div class="module-card__header">
      <div>
        <p class="module-card__eyebrow">{{ module.key }}</p>
        <h4>{{ module.title }}</h4>
      </div>
      <span class="status-badge" :class="`status-badge--${module.status}`">
        {{ module.statusLabel }}
      </span>
    </div>

    <p class="module-card__description">{{ module.description }}</p>

    <dl class="module-card__meta">
      <div>
        <dt>职责</dt>
        <dd>{{ module.scope }}</dd>
      </div>
      <div>
        <dt>后续扩展</dt>
        <dd>{{ module.nextStep }}</dd>
      </div>
    </dl>
  </article>
</template>
