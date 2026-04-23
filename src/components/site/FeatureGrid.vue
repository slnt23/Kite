<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import featureCardBack from '../../assets/front/feature_item.jpg'

interface FeatureItem {
  icon?: string
  title: string
  description: string
}

const props = withDefaults(
  defineProps<{
    items?: FeatureItem[]
  }>(),
  {
    items: () => [],
  },
)

const sectionRef = ref<HTMLElement | null>(null)
const progress = ref(0)
const isMobile = ref(false)
let ticking = false

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (start: number, end: number, amount: number) => start + (end - start) * amount

const mapProgress = (value: number, start: number, end: number) => {
  if (end <= start) {
    return value >= end ? 1 : 0
  }

  return clamp((value - start) / (end - start))
}

const lerpColor = (from: [number, number, number], to: [number, number, number], amount: number) =>
  `rgb(${Math.round(mix(from[0], to[0], amount))}, ${Math.round(mix(from[1], to[1], amount))}, ${Math.round(mix(from[2], to[2], amount))})`

const displayItems = computed(() => props.items.slice(0, 4))

const stage = computed(() => {
  const value = progress.value

  return {
    background: mapProgress(value, 0.02, 0.18),  // 背景色渐变提前结束
    visible: mapProgress(value, 0.06, 0.18),    // 显示动画提前结束
    spread: mapProgress(value, 0.18, 0.4),     // 卡片展开在1/4处完成
    flip: mapProgress(value, 0.25, 0.45),         // 翻转动画在1/4处完成
    detail: mapProgress(value, 0.42, 0.6),       // 细节显示提前完成
  }
}
)

const sectionStyle = computed(() => ({
  '--feature-stage-bg': lerpColor([255, 255, 255], [35, 46, 247], stage.value.background),
}))

const updateViewportMode = () => {
  isMobile.value = window.innerWidth < 840
}

const updateProgress = () => {
  ticking = false

  if (!sectionRef.value) {
    return
  }

  const rect = sectionRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight || 1
  const travel = Math.max(rect.height + viewportHeight, 1)
  const passed = clamp(viewportHeight - rect.top, 0, travel)

  progress.value = clamp(passed / travel)
}

const requestProgressUpdate = () => {
  if (ticking) {
    return
  }

  ticking = true
  window.requestAnimationFrame(updateProgress)
}

const handleResize = () => {
  updateViewportMode()
  requestProgressUpdate()
}

const getCardLines = (item: FeatureItem, index: number) => {
  const lines = item.description
    .split(/[，。；;]/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length > 1) {
    return lines.slice(0, 5)
  }

  const fallbackMap = [
    ['Digital experience strategy', 'hnology strategy', 'Creative direction', 'Discovery', 'Research'],
    ['Art direction', 'UX/UI design', 'Motion design', 'Interactive design', 'Illustration'],
    ['WebGL development', 'Front-end development', 'Unity / Unreal', 'Interactive installations', 'AR / VR experiences'],
    ['Procedural modeling', '3D asset creation', '3D optimization', 'Animation', 'Pipeline development'],
  ]

  return fallbackMap[index] ?? [item.description]
}

const getCardState = (index: number) => {
  const stackedX = isMobile.value ? [-14, -4, 4, 14] : [-18, -6, 6, 18]
  const stackedY = isMobile.value ? [10, 3, -3, -10] : [16, 5, -5, -16]
  const stackedRotate = isMobile.value ? [-8, -3, 3, 8] : [-12, -4, 4, 12]

  const spreadX = isMobile.value ? [-132, -42, 42, 132] : [-500, -166, 166, 500]
  const spreadY = isMobile.value ? [8, -6, -6, 8] : [10, 0, 0, 10]
  const spreadRotate = isMobile.value ? [-7, -2.5, 2.5, 7] : [-2, 0, 0, 2]

  const stackScale = isMobile.value ? [0.84, 0.89, 0.89, 0.84] : [0.9, 0.95, 0.95, 0.9]
  const spreadScale = isMobile.value ? [0.84, 0.88, 0.88, 0.84] : [0.95, 1, 1, 0.95]

  const translateX = mix(stackedX[index] ?? 0, spreadX[index] ?? 0, stage.value.spread)
  const translateY = mix(stackedY[index] ?? 0, spreadY[index] ?? 0, stage.value.spread)
  const rotate = mix(stackedRotate[index] ?? 0, spreadRotate[index] ?? 0, stage.value.spread)
  const scale = mix(stackScale[index] ?? 1, spreadScale[index] ?? 1, stage.value.spread)
  const flipAngle = stage.value.flip * 180
  const opacity = mix(0, 1, stage.value.visible) * mix(0.82, 1, stage.value.detail)
  const sectionTravel = isMobile.value ? mix(26, -26, progress.value) : mix(42, -56, progress.value)

  return {
    opacity,
    transform: `translate(-50%, -50%) translate3d(${translateX}px, ${translateY + sectionTravel}px, 0) rotate(${rotate}deg) scale(${scale})`,
    zIndex: index === 1 ? 4 : index === 2 ? 3 : index === 0 ? 2 : 1,
    innerTransform: `rotateY(${flipAngle}deg)`,
  }
}

const cardStates = computed(() => displayItems.value.map((_, index) => getCardState(index)))

onMounted(() => {
  updateViewportMode()
  updateProgress()
  window.addEventListener('scroll', requestProgressUpdate, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', requestProgressUpdate)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section ref="sectionRef" class="feature-grid" :style="sectionStyle">
    <div class="feature-grid__stage">
      <div class="feature-grid__cards">
        <article v-for="(item, index) in displayItems" :key="`${item.title}-${index}`" class="feature-card" :style="{
          opacity: cardStates[index]?.opacity,
          transform: cardStates[index]?.transform,
          zIndex: cardStates[index]?.zIndex,
        }">
          <div class="feature-card__inner" :style="{ transform: cardStates[index]?.innerTransform }">
            <div class="feature-card__face feature-card__face--back">
              <img :src="featureCardBack" :alt="`${item.title} 卡牌背面`" />
            </div>

            <div class="feature-card__face feature-card__face--front">
              <div class="feature-card__front-top">
                <h3>{{ item.title }}</h3>
                <span class="feature-card__symbol">{{ item.icon || `0${index + 1}` }}</span>
              </div>

              <ul class="feature-card__list">
                <li v-for="line in getCardLines(item, index)" :key="line">
                  <span>{{ line }}</span>
                </li>
              </ul>

              <div class="feature-card__footer">
                <span class="feature-card__symbol feature-card__symbol--footer">{{ item.icon || `0${index + 1}`
                }}</span>
                <strong>{{ item.title }}</strong>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.feature-grid {
  position: relative;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background: var(--feature-stage-bg);
  overflow: clip;
  transition: background 100ms linear;
}

.feature-grid__stage,
.feature-grid__cards {
  position: relative;
  width: 100%;
  min-height: inherit;
}

.feature-grid__cards {
  perspective: 2200px;
  perspective-origin: center center;
}

.feature-card {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(240px, 19vw, 430px);
  aspect-ratio: 0.72;
  transform-origin: center center;
  will-change: transform, opacity;
}

.feature-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.feature-card__face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 24px;
  backface-visibility: hidden;
  box-shadow:
    0 36px 90px rgba(15, 21, 70, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

.feature-card__face--back {
  background: #2130ff;
}

.feature-card__face--back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-card__face--front {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 28px;
  padding: 28px 28px 22px;
  background: #f8f8f7;
  color: #10131b;
  transform: rotateY(180deg);
}

.feature-card__front-top,
.feature-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.feature-card__front-top h3,
.feature-card__footer strong {
  margin: 0;
  font-size: clamp(1.2rem, 1.4vw, 1.9rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.feature-card__footer strong {
  transform: rotate(180deg);
}

.feature-card__symbol {
  font-size: clamp(2rem, 2.8vw, 3.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.08em;
  text-transform: uppercase;
}

.feature-card__symbol--footer {
  transform: rotate(180deg);
}

.feature-card__list {
  display: grid;
  align-content: start;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.feature-card__list li {
  display: grid;
  gap: 10px;
}

.feature-card__list li::after {
  content: '';
  height: 3px;
  border-radius: 999px;
  background-image: radial-gradient(circle, rgba(71, 97, 255, 0.28) 1.4px, transparent 1.6px);
  background-size: 10px 3px;
  background-repeat: repeat-x;
}

.feature-card__list span {
  font-size: clamp(1rem, 1.1vw, 1.28rem);
  line-height: 1.25;
}

@media (max-width: 1100px) {
  .feature-grid {
    min-height: 220vh;
  }

  .feature-card {
    width: clamp(160px, 23vw, 260px);
  }

  .feature-card__face--front {
    gap: 18px;
    padding: 18px 18px 16px;
  }

  .feature-card__list {
    gap: 8px;
  }

  .feature-card__list span {
    font-size: 0.9rem;
  }
}

@media (max-width: 840px) {
  .feature-grid {
    min-height: 190vh;
  }

  .feature-card {
    width: clamp(145px, 34vw, 220px);
  }

  .feature-card__face {
    border-radius: 18px;
  }

  .feature-card__front-top h3,
  .feature-card__footer strong {
    font-size: 0.95rem;
  }

  .feature-card__symbol {
    font-size: 1.8rem;
  }

  .feature-card__list span {
    font-size: 0.78rem;
  }
}
</style>