<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import heroVideo1 from '@/assets/front/Front_Hero_1.mp4'
import heroVideo2 from '@/assets/front/Front_Hero_2.mp4'
import heroVideo3 from '@/assets/front/Hero_3.mp4'

const videos = [heroVideo1, heroVideo2]
const currentIndex = ref(0)
const heroRef = ref(null)
const isMuted = ref(true)
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleMouseDown = (e) => {
  touchStartX = e.screenX
}

const handleMouseUp = (e) => {
  touchEndX = e.screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      prevVideo()
    } else {
      nextVideo()
    }
  }
}

const nextVideo = () => {
  currentIndex.value = (currentIndex.value + 1) % videos.length
}

const prevVideo = () => {
  currentIndex.value = (currentIndex.value - 1 + videos.length) % videos.length
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  const activeVideo = document.querySelector('.home-hero__video--active')
  if (activeVideo) {
    activeVideo.muted = isMuted.value
  }
}

const scrollDown = () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth'
  })
}

const pauseAllVideos = () => {
  const videoElements = document.querySelectorAll('.home-hero__video')
  videoElements.forEach(video => {
    video.pause()
  })
}

const playCurrentVideo = () => {
  const activeVideo = document.querySelector('.home-hero__video--active')
  if (activeVideo) {
    activeVideo.play().catch(err => {
      console.log('视频播放失败:', err)
    })
  }
}

const handleScroll = () => {
  const heroSection = heroRef.value
  if (!heroSection) return

  const rect = heroSection.getBoundingClientRect()
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0

  if (!isVisible) {
    pauseAllVideos()
  } else {
    playCurrentVideo()
  }
}

onMounted(() => {
  const hero = heroRef.value
  if (hero) {
    hero.addEventListener('touchstart', handleTouchStart)
    hero.addEventListener('touchend', handleTouchEnd)
    hero.addEventListener('mousedown', handleMouseDown)
    hero.addEventListener('mouseup', handleMouseUp)
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  const hero = heroRef.value
  if (hero) {
    hero.removeEventListener('touchstart', handleTouchStart)
    hero.removeEventListener('touchend', handleTouchEnd)
    hero.removeEventListener('mousedown', handleMouseDown)
    hero.removeEventListener('mouseup', handleMouseUp)
  }

  window.removeEventListener('scroll', handleScroll)
  pauseAllVideos()
})
</script>

<template>
  <section class="home-hero" ref="heroRef">
    <video v-for="(video, index) in videos" :key="index" class="home-hero__video"
      :class="{ 'home-hero__video--active': index === currentIndex }" autoplay loop muted playsinline>
      <source :src="video" type="video/mp4">
    </video>

    <div class="home-hero__overlay" />
    <div class="home-hero__glow" />

    <div class="home-hero__controls">
      <button class="home-hero__button home-hero__button--mute" @click="toggleMute"
        :aria-label="isMuted ? '取消静音' : '静音'">
        <svg v-if="isMuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </button>

      <button class="home-hero__button home-hero__button--prev" @click="prevVideo" aria-label="上一个视频">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div class="home-hero__indicators">
        <span v-for="(_, index) in videos" :key="index" class="home-hero__indicator"
          :class="{ 'home-hero__indicator--active': index === currentIndex }" @click="currentIndex = index" />
      </div>

      <button class="home-hero__button home-hero__button--next" @click="nextVideo" aria-label="下一个视频">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <button class="home-hero__button home-hero__button--down" @click="scrollDown" aria-label="向下滚动">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <!-- <div class="home-hero__scroll">
      <span />
      <small>向下滑动</small>
    </div> -->
  </section>
</template>

<style scoped lang="scss">
$hero-text-color: rgba(255, 255, 255, 0.95);
$hero-overlay-color: rgba(10, 23, 35, 0.48);
$hero-glow-color: rgba(255, 255, 255, 0.22);

.home-hero {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  overflow: hidden;

  &__video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;

    &--active {
      opacity: 1;
    }
  }

  &__overlay,
  &__glow {
    position: absolute;
    inset: 0;
  }

  &__overlay {
    background: linear-gradient(180deg, $hero-overlay-color, rgba(10, 23, 35, 0.62)),
      radial-gradient(circle at center, rgba(255, 255, 255, 0.12), transparent 46%);
  }

  &__glow {
    background: radial-gradient(circle at top, $hero-glow-color, transparent 34%);
  }

  &__content {
    position: relative;
    z-index: 1;
    width: min(1080px, calc(100% - 120px));
    text-align: center;

    >p:first-child {
      margin: 0 0 16px;
      color: $hero-text-color;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.24em;
      text-transform: uppercase;
    }
  }

  h1,
  h2 {
    color: #ffffff;
  }

  h1 {
    margin: 0;
    font-size: clamp(3.4rem, 8vw, 7rem);
    line-height: 0.98;
    letter-spacing: 0.11em;
  }

  h2 {
    max-width: 22ch;
    margin: 22px auto 0;
    font-size: clamp(1.5rem, 3.2vw, 2.4rem);
    line-height: 1.24;
    font-weight: 500;
  }

  &__summary {
    max-width: 64ch;
    margin: 30px auto 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
  }

  &__controls {
    position: absolute;
    bottom: 90px;
    left: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 20px;
    transform: translateX(-50%);
  }

  &__indicators {
    display: flex;
    gap: 12px;
  }

  &__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;

    &--active {
      background: rgba(255, 255, 255, 0.9);
      transform: scale(1.2);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.7);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(8px);

    &:hover {
      background: rgba(255, 255, 255, 0.35);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__scroll {
    position: absolute;
    bottom: 34px;
    left: 50%;
    z-index: 1;
    display: grid;
    justify-items: center;
    gap: 10px;
    transform: translateX(-50%);

    span {
      width: 1px;
      height: 62px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
    }

    small {
      color: rgba(248, 253, 255, 0.93);
      letter-spacing: 0.2em;
    }
  }
}

@media (max-width: 760px) {
  .home-hero {
    &__content {
      width: min(100% - 28px, 980px);
    }

    h1 {
      font-size: clamp(3rem, 17vw, 4.8rem);
    }

    h2 {
      font-size: clamp(1.3rem, 7vw, 2.1rem);
    }
  }
}
</style>