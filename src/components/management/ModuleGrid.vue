<script setup>
import ModuleCard from './ModuleCard.vue'

defineProps({
  heading: {
    type: String,
    required: true,
  },
  subheading: {
    type: String,
    required: true,
  },
  groups: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <section class="panel">
    <div class="section-heading">
      <p class="section-tag">Registered Modules</p>
      <h2>{{ heading }}</h2>
      <p>{{ subheading }}</p>
    </div>

    <div class="module-groups">
      <section v-for="group in groups" :key="group.key" class="module-group">
        <header class="module-group__header">
          <div>
            <h3>{{ group.title }}</h3>
            <p>{{ group.description }}</p>
          </div>
          <span>{{ group.modules.length }} 个模块</span>
        </header>

        <div class="module-grid">
          <ModuleCard
            v-for="module in group.modules"
            :key="module.key"
            :module="module"
          />
        </div>
      </section>
    </div>
  </section>
</template>
