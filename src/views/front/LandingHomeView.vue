<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import bannerImage from '../../assets/front/banner.jpg'
import heroLayerOne from '../../assets/front/pic01.jpg'
import heroLayerTwo from '../../assets/front/pic02.jpg'
import heroLayerThree from '../../assets/front/pic03.jpg'

const scrollY = ref(0)
const viewportHeight = ref(1)

const introCards = [
  {
    title: '价格查询',
    subtitle: '独立价格页面',
    description: '查看材料、线缆与报价趋势面板，后续可直接接入真实接口。',
    path: '/price-query',
  },
  {
    title: 'AI聊天',
    subtitle: '智能协同入口',
    description: '把价格分析、摘要生成和客户沟通草稿集中到一个聊天工作台。',
    path: '/ai-chat',
  },
  {
    title: '品牌故事',
    subtitle: '项目叙事页面',
    description: '展示网站气质、设计方向与整体表达逻辑。',
    path: '/story',
  },
  {
    title: '服务能力',
    subtitle: '能力总览页面',
    description: '快速了解当前前台项目已经承载的模块结构与扩展方向。',
    path: '/capabilities',
  },
]

const featureRows = [
  {
    index: '01',
    title: '全屏分段滚动',
    description: '每个 section 都以一屏为单位，滚动时会精确吸附到下一个区块。',
  },
  {
    index: '02',
    title: '分层视差纵深',
    description: '前景、背景、光斑和卡片以不同速度移动，制造更明显的空间感。',
  },
  {
    index: '03',
    title: '天蓝灰白新主题',
    description: '整体配色改为天蓝、雾白与浅灰，页面观感会更轻、更透、更现代。',
  },
]

const storyRows = [
  {
    label: '首页定位',
    value: '首页只负责总览与导流，不承载具体业务明细。',
  },
  {
    label: '价格查询',
    value: '作为独立业务界面存在，适合后续扩展成真正的数据页。',
  },
  {
    label: '交互方向',
    value: '继续往下可以接 Three.js 粒子、3D 模型或图表场景。',
  },
]

const syncViewport = () => {
  viewportHeight.value = Math.max(window.innerHeight, 1)
}

const syncScroll = () => {
  scrollY.value = window.scrollY
}

const getSectionProgress = (index) => {
  const start = index * viewportHeight.value
  return (scrollY.value - start) / viewportHeight.value
}

const getLayerStyle = (speed, depth, index) => {
  const progress = getSectionProgress(index)
  const offsetY = progress * speed
  const offsetX = progress * speed * -0.2

  return {
    transform: `translate3d(${offsetX}px, ${offsetY}px, ${depth}px) scale(${1 + Math.abs(depth) / 2200})`,
  }
}

const heroContentStyle = computed(() => ({
  transform: `translate3d(0, ${scrollY.value * -0.12}px, 120px)`,
}))

onMounted(() => {
  document.body.classList.add('body-home-scrollsnap')
  document.documentElement.classList.add('body-home-scrollsnap')
  syncViewport()
  syncScroll()
  window.addEventListener('resize', syncViewport)
  window.addEventListener('scroll', syncScroll, { passive: true })
})

onBeforeUnmount(() => {
  document.body.classList.remove('body-home-scrollsnap')
  document.documentElement.classList.remove('body-home-scrollsnap')
  window.removeEventListener('resize', syncViewport)
  window.removeEventListener('scroll', syncScroll)
})
</script>

<template>
  <div class="home-page">
    <section class="home-screen home-screen--hero">
      <div class="home-screen__stage">
        <img
          class="home-layer home-layer--backdrop"
          :src="bannerImage"
          alt="首页首屏背景图"
          :style="getLayerStyle(-48, -320, 0)"
        />
        <img
          class="home-layer home-layer--middle"
          :src="heroLayerOne"
          alt="首页首屏前景图层"
          :style="getLayerStyle(-20, -120, 0)"
        />
        <img
          class="home-layer home-layer--front"
          :src="heroLayerTwo"
          alt="首页首屏中景图层"
          :style="getLayerStyle(42, 80, 0)"
        />
        <div class="home-layer home-layer--veil" />
        <div class="home-layer home-layer--glow" :style="getLayerStyle(90, 220, 0)" />

        <div class="home-hero" :style="heroContentStyle">
          <p>Skyline . Motion . Portal</p>
          <h1>Kite</h1>
          <h2>全屏滚动首页，用一屏一屏的方式介绍整个网站。</h2>
          <p class="home-hero__summary">
            首页现在回归首页身份，只做总览与导流。价格查询会作为独立页面存在，AI 聊天、品牌故事和服务能力也都在这里被统一介绍。
          </p>
          <div class="home-hero__actions">
            <RouterLink class="home-hero__action home-hero__action--primary" to="/price-query">
              进入价格查询
            </RouterLink>
            <RouterLink class="home-hero__action" to="/ai-chat">查看 AI 聊天</RouterLink>
          </div>
        </div>

        <div class="home-scroll-indicator">
          <span />
          <small>向下滚动</small>
        </div>
      </div>
    </section>

    <section class="home-screen home-screen--modules">
      <div class="home-screen__stage home-screen__stage--panel">
        <div class="home-panel" :style="getLayerStyle(36, 120, 1)">
          <div class="home-panel__intro">
            <p class="eyebrow-label">Module Overview</p>
            <h2>首页负责把每个功能界面简明地介绍清楚。</h2>
            <p>
              这里不直接展开复杂表格或长说明，而是用一屏聚合主要模块，让访问者快速理解网站的入口结构。
            </p>
          </div>

          <div class="module-grid">
            <RouterLink
              v-for="card in introCards"
              :key="card.title"
              class="module-card"
              :to="card.path"
            >
              <span>{{ card.subtitle }}</span>
              <strong>{{ card.title }}</strong>
              <p>{{ card.description }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="home-screen home-screen--features">
      <div class="home-screen__stage home-screen__stage--panel">
        <img
          class="home-layer home-layer--accent"
          :src="heroLayerThree"
          alt="首页特色图层"
          :style="getLayerStyle(24, -160, 2)"
        />

        <div class="home-panel home-panel--wide" :style="getLayerStyle(-24, 100, 2)">
          <div class="home-panel__intro">
            <p class="eyebrow-label">Scroll Experience</p>
            <h2>通过分层位移，把平面首页做出更强的 3D 气氛。</h2>
          </div>

          <div class="feature-strip">
            <article v-for="item in featureRows" :key="item.index" class="feature-strip__card">
              <span>{{ item.index }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="home-screen home-screen--story">
      <div class="home-screen__stage home-screen__stage--panel">
        <div class="story-card" :style="getLayerStyle(18, 140, 3)">
          <div class="story-card__copy">
            <p class="eyebrow-label">Site Positioning</p>
            <h2>首页是入口页，业务页是落地页，整个网站的结构会更清晰。</h2>
            <p>
              这次改造把“价格查询”从首页拆开后，首页就能专注于视觉、导流和整体认知，后续扩展其他模块也会更顺。
            </p>
          </div>

          <div class="story-card__list">
            <div v-for="item in storyRows" :key="item.label" class="story-card__item">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.home-screen {
  position: relative;
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.home-screen__stage {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  perspective: 1400px;
  transform-style: preserve-3d;
}

.home-screen__stage--panel {
  display: grid;
  place-items: center;
  padding: 110px min(6vw, 68px) 42px;
}

.home-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.home-layer--backdrop {
  filter: brightness(0.72) saturate(1.02);
}

.home-layer--middle {
  inset: 12% auto auto 8%;
  width: 30vw;
  min-width: 280px;
  max-width: 520px;
  height: 56vh;
  border-radius: 34px;
  opacity: 0.3;
  object-fit: cover;
}

.home-layer--front {
  inset: auto 8% 10% auto;
  width: 26vw;
  min-width: 240px;
  max-width: 420px;
  height: 34vh;
  border-radius: 30px;
  opacity: 0.28;
  object-fit: cover;
}

.home-layer--veil {
  background:
    linear-gradient(180deg, rgba(226, 246, 255, 0.12), rgba(108, 179, 218, 0.32)),
    linear-gradient(180deg, rgba(26, 70, 102, 0.14), rgba(26, 70, 102, 0.46)),
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3), transparent 30%);
}

.home-layer--glow {
  inset: 16% auto auto 50%;
  width: 34vw;
  height: 34vw;
  max-width: 480px;
  max-height: 480px;
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(255, 255, 255, 0.72), rgba(130, 214, 255, 0.16) 36%, transparent 68%);
  filter: blur(8px);
  transform: translateX(-50%);
}

.home-layer--accent {
  inset: auto auto 0 0;
  width: 100%;
  opacity: 0.18;
  filter: blur(1px) saturate(0.9);
}

.home-hero {
  position: relative;
  z-index: 2;
  display: grid;
  justify-items: center;
  width: min(980px, calc(100% - 24px));
  margin: 0 auto;
  padding-top: 18vh;
  text-align: center;
  will-change: transform;
}

.home-hero > p:first-child {
  margin: 0 0 14px;
  color: rgba(246, 252, 255, 0.95);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.home-hero h1,
.home-hero h2,
.home-panel__intro h2,
.feature-strip__card h3,
.story-card__copy h2,
.story-card__item strong,
.module-card strong {
  margin: 0;
  color: var(--color-text);
}

.home-hero h1 {
  font-size: clamp(4rem, 9vw, 7.6rem);
  line-height: 0.92;
  letter-spacing: 0.14em;
}

.home-hero h2 {
  max-width: 16ch;
  margin-top: 18px;
  font-size: clamp(2rem, 4.6vw, 3.5rem);
  line-height: 1.04;
}

.home-hero__summary,
.home-panel__intro p,
.feature-strip__card p,
.story-card__copy p,
.story-card__item span,
.module-card span,
.module-card p {
  color: var(--color-text-soft);
}

.home-hero__summary {
  max-width: 60ch;
  margin: 22px auto 0;
  font-size: 1.04rem;
}

.home-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 26px;
}

.home-hero__action {
  min-width: 160px;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: var(--color-text);
  font-weight: 700;
}

.home-hero__action--primary {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(169, 231, 255, 0.82));
  color: var(--color-text-deep);
}

.home-scroll-indicator {
  position: absolute;
  bottom: 34px;
  left: 50%;
  z-index: 2;
  display: grid;
  gap: 10px;
  justify-items: center;
  transform: translateX(-50%);
}

.home-scroll-indicator span {
  width: 1px;
  height: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(255, 255, 255, 0));
}

.home-scroll-indicator small {
  color: rgba(249, 253, 255, 0.92);
  letter-spacing: 0.18em;
}

.home-panel,
.story-card {
  position: relative;
  width: min(1180px, 100%);
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.52);
  border-radius: 34px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(188, 229, 248, 0.14)),
    rgba(109, 176, 209, 0.12);
  box-shadow: 0 24px 80px rgba(87, 140, 170, 0.18);
  backdrop-filter: blur(16px);
}

.home-panel--wide {
  display: grid;
  gap: 26px;
}

.home-panel__intro {
  max-width: 60ch;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 26px;
}

.module-card,
.feature-strip__card,
.story-card__item {
  border: 1px solid rgba(255, 255, 255, 0.44);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
}

.module-card {
  display: grid;
  gap: 8px;
  padding: 22px;
}

.module-card strong {
  font-size: 1.35rem;
}

.module-card p {
  margin: 0;
}

.feature-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-strip__card {
  padding: 24px;
}

.feature-strip__card span {
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.52);
  color: var(--color-text-deep);
  font-weight: 800;
}

.feature-strip__card h3 {
  margin-bottom: 10px;
}

.story-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.92fr);
  gap: 22px;
}

.story-card__copy {
  align-self: center;
}

.story-card__copy h2 {
  margin-bottom: 14px;
}

.story-card__copy p {
  margin: 0;
}

.story-card__list {
  display: grid;
  gap: 14px;
}

.story-card__item {
  display: grid;
  gap: 8px;
  padding: 22px;
}

.story-card__item strong {
  font-size: 1.08rem;
}

@media (max-width: 960px) {
  .module-grid,
  .feature-strip,
  .story-card {
    grid-template-columns: 1fr;
  }

  .home-layer--middle,
  .home-layer--front {
    opacity: 0.18;
  }
}

@media (max-width: 760px) {
  .home-screen__stage--panel {
    padding: 92px 12px 24px;
  }

  .home-hero {
    width: min(100% - 20px, 980px);
    padding-top: 16vh;
  }

  .home-hero h1 {
    font-size: clamp(3.2rem, 18vw, 5rem);
  }

  .home-hero h2 {
    font-size: clamp(1.7rem, 8vw, 2.6rem);
  }

  .home-panel,
  .story-card {
    padding: 20px;
    border-radius: 26px;
  }

  .home-layer--middle {
    inset: 14% auto auto 4%;
    width: 44vw;
    min-width: 180px;
    height: 34vh;
  }

  .home-layer--front {
    right: 4%;
    bottom: 14%;
    width: 36vw;
    min-width: 160px;
  }
}
</style>
