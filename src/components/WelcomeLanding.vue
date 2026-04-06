<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const stage = ref('landing')
const isReady = ref(false)
const kiteVisible = ref(false)
const kiteStyle = ref({})

const svgRef = ref(null)
const guidePathRef = ref(null)

const isOpening = computed(() => stage.value === 'opening')

let rafId = 0
let kiteTimer = 0
let finishTimer = 0

const easeOutQuint = (value) => 1 - Math.pow(1 - value, 5)

const stopKiteFlight = () => {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
}

const startKiteFlight = async () => {
  await nextTick()

  const path = guidePathRef.value
  if (!path) return

  const totalLength = path.getTotalLength()
  const startTime = performance.now()
  const duration = 980

  kiteVisible.value = true

  const animate = (now) => {
    const rawProgress = Math.min((now - startTime) / duration, 1)
    const progress = easeOutQuint(rawProgress)
    const pathOffset = totalLength * (0.08 + progress * 0.84)
    const point = path.getPointAtLength(Math.min(pathOffset, totalLength))
    const previous = path.getPointAtLength(Math.max(0, pathOffset - 1))

    const angle = Math.atan2(point.y - previous.y, point.x - previous.x) * (180 / Math.PI)
    const drift = Math.sin(progress * Math.PI * 3.2) * 4
    const lift = Math.cos(progress * Math.PI * 2.4) * 3

    kiteStyle.value = {
      left: `${(point.x / 560) * 100}%`,
      top: `${(point.y / 320) * 100}%`,
      opacity: rawProgress < 0.08 ? rawProgress / 0.08 : 1,
      transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${drift}px, ${lift}px)`,
    }

    if (rawProgress < 1) {
      rafId = requestAnimationFrame(animate)
      return
    }

    rafId = 0
  }

  stopKiteFlight()
  rafId = requestAnimationFrame(animate)
}

const enterHome = () => {
  if (stage.value !== 'landing') return

  stage.value = 'opening'

  kiteTimer = window.setTimeout(() => {
    startKiteFlight()
  }, 230)

  finishTimer = window.setTimeout(() => {
    stage.value = 'home'
    kiteVisible.value = false
    stopKiteFlight()
  }, 1680)
}

onMounted(() => {
  requestAnimationFrame(() => {
    isReady.value = true
  })
})

onBeforeUnmount(() => {
  window.clearTimeout(kiteTimer)
  window.clearTimeout(finishTimer)
  stopKiteFlight()
})
</script>

<template>
  <main class="welcome-shell">
    <Transition name="scene" mode="out-in">
      <section
        v-if="stage !== 'home'"
        key="landing"
        class="landing"
        :class="{ 'is-ready': isReady, 'is-opening': isOpening }"
        @click="enterHome"
      >
        <div class="landing__canvas" aria-hidden="true">
          <svg
            ref="svgRef"
            class="landing__arc"
            viewBox="0 0 560 320"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <g class="arc arc--upper">
              <path
                d="M14 164C136 74 248 34 354 42C446 49 505 90 546 162"
                pathLength="100"
              />
            </g>
            <g class="arc arc--lower">
              <path
                d="M14 164C136 74 248 34 354 42C446 49 505 90 546 162"
                pathLength="100"
              />
            </g>
            <path
              ref="guidePathRef"
              class="guide-path"
              d="M14 164C136 74 248 34 354 42C446 49 505 90 546 162"
            />
          </svg>

          <button
            class="welcome-trigger"
            type="button"
            aria-label="Enter home page"
            @click.stop="enterHome"
          >
            Welcome
          </button>

          <div
            class="kite"
            :class="{ 'is-visible': kiteVisible, 'is-opening': isOpening }"
            :style="kiteStyle"
            aria-hidden="true"
          >
            <svg viewBox="0 0 96 96" fill="none">
              <path class="kite__tail" d="M44 50C34 62 31 72 36 82" />
              <path class="kite__tail kite__tail--soft" d="M52 47C60 56 61 67 56 78" />
              <path class="kite__body" d="M48 16L70 38L48 60L26 38L48 16Z" />
              <path class="kite__spine" d="M48 17V59" />
              <path class="kite__cross" d="M26 38H70" />
            </svg>
          </div>
        </div>
      </section>

      <section v-else key="home" class="home">
        <div class="home__inner">
          <h1>Home</h1>
          <p>This is the next page.</p>
        </div>
      </section>
    </Transition>
  </main>
</template>

<style scoped lang="scss">
$ease-premium: cubic-bezier(0.22, 1, 0.36, 1);
$text-primary: #171717;
$text-secondary: rgba(23, 23, 23, 0.56);
$line-primary: rgba(17, 17, 17, 0.88);
$line-secondary: rgba(17, 17, 17, 0.14);
$surface: #f5f5f5;

.welcome-shell {
  min-height: 100vh;
  background: $surface;
  color: $text-primary;
}

.landing,
.home {
  min-height: 100vh;
}

.landing {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: scale(1.015);
  transition:
    opacity 0.9s $ease-premium,
    transform 1.2s $ease-premium;

  &.is-ready {
    opacity: 1;
    transform: scale(1);
  }

  &.is-opening {
    cursor: default;
  }
}

.landing__canvas {
  position: relative;
  min-height: 100vh;
}

.landing__arc {
  position: absolute;
  top: 50%;
  right: clamp(-5rem, -2vw, -1rem);
  width: min(54vw, 50rem);
  min-width: 20rem;
  overflow: visible;
  transform: translateY(-50%);
}

.arc {
  transform-origin: 50% 50%;
  transition:
    transform 1.2s $ease-premium,
    opacity 0.9s $ease-premium;

  path {
    fill: none;
    stroke: $line-primary;
    stroke-width: 2.2;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }
}

.arc--lower path {
  stroke: rgba(17, 17, 17, 0.82);
}

.guide-path {
  fill: none;
  stroke: transparent;
  stroke-width: 1;
  pointer-events: none;
}

.welcome-trigger {
  position: absolute;
  top: 49%;
  right: clamp(8.75rem, 18vw, 18rem);
  z-index: 3;
  border: 0;
  padding: 0;
  background: transparent;
  color: $text-primary;
  font:
    600 clamp(1.3rem, 1rem + 0.9vw, 1.9rem) / 1
    'SF Pro Display',
    'PingFang SC',
    'Noto Sans SC',
    'Helvetica Neue',
    sans-serif;
  letter-spacing: 0.02em;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition:
    transform 0.45s $ease-premium,
    opacity 0.35s ease,
    letter-spacing 0.45s $ease-premium;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 0.7;
    transform: translate(-50%, calc(-50% - 2px)) scale(1.018);
    letter-spacing: 0.03em;
  }

  &:active {
    opacity: 0.56;
    transform: translate(-50%, -50%) scale(0.985);
  }

  &:focus-visible {
    outline: none;
    opacity: 0.72;
  }
}

.kite {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  width: clamp(3.25rem, 4vw, 4.4rem);
  opacity: 0;
  filter: saturate(0.94);
  transition:
    opacity 0.25s ease,
    filter 0.5s ease;
  pointer-events: none;

  &.is-visible {
    opacity: 1;
  }

  svg {
    display: block;
    width: 100%;
    height: auto;
  }
}

.kite__body,
.kite__spine,
.kite__cross,
.kite__tail {
  fill: none;
  stroke: $line-primary;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.kite__body {
  stroke-width: 2.2;
}

.kite__spine,
.kite__cross {
  stroke-width: 1.6;
}

.kite__tail {
  stroke-width: 1.5;
  opacity: 0.68;
}

.kite__tail--soft {
  stroke: $line-secondary;
  stroke-width: 1.2;
}

.landing.is-opening {
  .arc--upper {
    opacity: 0.94;
    transform: translateY(-2.9rem) rotate(-1.15deg) scaleX(1.01);
  }

  .arc--lower {
    opacity: 0.9;
    transform: translateY(2.9rem) rotate(1.15deg) scaleX(1.01);
  }

  .welcome-trigger {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 0.8rem)) scale(0.96);
  }
}

.home {
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.78), transparent 34%),
    $surface;
}

.home__inner {
  text-align: center;
  transform: translateY(0.75rem);
  animation: home-rise 0.9s $ease-premium forwards;

  h1,
  p {
    margin: 0;
  }

  h1 {
    font:
      600 clamp(2rem, 1.6rem + 1vw, 3rem) / 1
      'SF Pro Display',
      'PingFang SC',
      'Noto Sans SC',
      'Helvetica Neue',
      sans-serif;
    letter-spacing: -0.03em;
  }

  p {
    margin-top: 0.9rem;
    color: $text-secondary;
    font-size: clamp(0.98rem, 0.94rem + 0.22vw, 1.08rem);
  }
}

.scene-enter-active,
.scene-leave-active {
  transition:
    opacity 0.85s $ease-premium,
    transform 0.85s $ease-premium,
    filter 0.85s $ease-premium;
}

.scene-enter-from {
  opacity: 0;
  transform: translateY(1.6rem) scale(0.995);
  filter: blur(6px);
}

.scene-leave-to {
  opacity: 0;
  transform: translateY(-1.35rem) scale(0.985);
  filter: blur(8px);
}

@keyframes home-rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .landing__arc {
    right: -5.5rem;
    width: min(78vw, 35rem);
  }

  .welcome-trigger {
    top: 50%;
    right: clamp(6.75rem, 23vw, 12rem);
  }
}

@media (max-width: 640px) {
  .landing__arc {
    top: 52%;
    right: -7.25rem;
    width: min(94vw, 31rem);
    min-width: 18rem;
  }

  .welcome-trigger {
    top: 51%;
    right: clamp(4.9rem, 19vw, 7rem);
    font-size: clamp(1.16rem, 0.94rem + 1vw, 1.4rem);
  }

  .landing.is-opening {
    .arc--upper {
      transform: translateY(-2.2rem) rotate(-1deg) scaleX(1.01);
    }

    .arc--lower {
      transform: translateY(2.2rem) rotate(1deg) scaleX(1.01);
    }
  }

  .kite {
    width: 3.35rem;
  }
}

@media (min-width: 1440px) {
  .landing__arc {
    right: 2rem;
    width: min(48vw, 58rem);
  }

  .welcome-trigger {
    right: min(20vw, 20rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing,
  .arc,
  .welcome-trigger,
  .kite,
  .scene-enter-active,
  .scene-leave-active,
  .home__inner {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
