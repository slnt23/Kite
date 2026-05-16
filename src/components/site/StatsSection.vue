<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { StatItem } from '@/types'

const props = withDefaults(
  defineProps<{
    items?: StatItem[]
  }>(),
  {
    items: () => [],
  },
)

const sectionRef = ref<HTMLElement | null>(null)
const triggered = ref(false)
const displayValues = ref<number[]>(props.items.map(() => 0))

let observer: IntersectionObserver | null = null

const formatValue = (index: number) => {
  const raw = displayValues.value[index] ?? 0
  return Math.floor(raw).toLocaleString()
}

const animateValues = () => {
  if (triggered.value) return
  triggered.value = true

  const duration = 1200
  const startTime = performance.now()
  const starts = props.items.map(() => 0)
  const targets = props.items.map((item) => item.value)

  const tick = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)

    displayValues.value = starts.map((s, i) => s + (targets[i] - s) * eased)
    if (progress < 1) {
      requestAnimationFrame(tick)
    }
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) animateValues()
    },
    { threshold: 0.3 },
  )

  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="stats-section">
    <div class="stats-row">
      <div v-for="(item, index) in items" :key="item.label" class="stats-item">
        <span class="stats-item__number">
          <template v-if="item.prefix">{{ item.prefix }}</template>
          {{ formatValue(index) }}
          <template v-if="item.suffix">{{ item.suffix }}</template>
        </span>
        <span class="stats-item__label">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.stats-section {
  padding: 48px 0 56px;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: #fafbfc;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 40px;
}

.stats-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;

  &__number {
    font-size: clamp(2rem, 3.2vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #1a1a1a;
    line-height: 1;
  }

  &__label {
    font-size: 0.84rem;
    font-weight: 500;
    color: #767d88;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}

@media (max-width: 760px) {
  .stats-section {
    padding: 40px 0 44px;
  }

  .stats-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 16px;
    padding: 0 24px;
  }

  .stats-item__number {
    font-size: 2.2rem;
  }
}
</style>
