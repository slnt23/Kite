<script setup>
defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="capability-table glass-panel">
    <div class="capability-table__row capability-table__row--head">
      <span>模块</span>
      <span>内容</span>
      <span>适用阶段</span>
    </div>

    <div v-for="row in rows" :key="row.name" class="capability-table__row">
      <strong>{{ row.name }}</strong>
      <span>{{ row.scope }}</span>
      <span>{{ row.stage }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style/index.scss：glass-panel */
.capability-table {
  overflow: hidden;
  border-radius: 30px;
}

.capability-table__row {
  display: grid;
  grid-template-columns: minmax(160px, 0.8fr) minmax(0, 1.4fr) minmax(120px, 0.7fr);
  gap: 18px;
  padding: 18px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.capability-table__row--head {
  border-top: 0;
  color: var(--color-text-deep);
  font-weight: 700;
}

.capability-table strong {
  color: var(--color-text-deep);
}

.capability-table span {
  color: var(--color-muted-deep);
}

@media (max-width: 960px) {
  .capability-table__row {
    grid-template-columns: 1fr;
  }
}
</style>
