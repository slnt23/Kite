<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import MenuPanel from '../components/site/MenuPanel.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import { getCurrentUser, onAuthChange } from '../utils/auth.session.js'
import menuImageHome from '../assets/front/banner.jpg'
import menuImagePriceQuery from '../assets/front/pic01.jpg'
import menuImageStory from '../assets/front/pic02.jpg'
import menuImageCapabilities from '../assets/front/pic03.jpg'
import menuImageAiChat from '../assets/front/pic04.jpg'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const currentUser = ref(getCurrentUser())
let removeAuthListener = () => {}

const isHome = computed(() => route.path === '/')
const showCompactHeader = computed(() => !isHome.value || isScrolled.value)
const showFooter = computed(() => !isHome.value)

const menuItems = computed(() => [
  {
    title: '首页',
    subtitle: '查看全屏滚动总览与模块入口',
    path: '/',
    image: menuImageHome,
    size: 'large',
  },
  {
    title: '价格查询',
    subtitle: '进入独立查询界面，查看价格与趋势',
    path: '/price-query',
    image: menuImagePriceQuery,
  },
  {
    title: '品牌故事',
    subtitle: '查看当前项目的设计方向与页面叙事',
    path: '/story',
    image: menuImageStory,
  },
  {
    title: '服务能力',
    subtitle: '浏览前台项目的结构与能力范围',
    path: '/capabilities',
    image: menuImageCapabilities,
  },
  {
    title: 'AI聊天',
    subtitle: '进入聊天界面入口，查看对话交互样式',
    path: '/ai-chat',
    image: menuImageAiChat,
  },
])

const accountRoute = computed(() => (currentUser.value ? '/profile' : '/login'))
const accountLabel = computed(() => (currentUser.value ? '我的' : '登录'))

const syncScrollState = () => {
  isScrolled.value = window.scrollY > window.innerHeight * 0.28
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

watch(
  () => route.path,
  () => {
    closeMenu()
    window.requestAnimationFrame(() => {
      syncScrollState()
    })
  },
)

onMounted(() => {
  syncScrollState()
  removeAuthListener = onAuthChange((user) => {
    currentUser.value = user
  })
  window.addEventListener('scroll', syncScrollState, { passive: true })
})

onBeforeUnmount(() => {
  removeAuthListener()
  window.removeEventListener('scroll', syncScrollState)
})
</script>

<template>
  <div class="site-shell" :class="{ 'site-shell--menu-open': menuOpen }">
    <header
      class="site-header glass-panel"
      :class="{
        'site-header--home-top': isHome && !showCompactHeader,
        'site-header--compact': showCompactHeader,
      }"
    >
      <RouterLink
        v-if="showCompactHeader"
        class="site-brand site-brand--compact"
        to="/"
        @click="closeMenu"
      >
        <strong>匆匆</strong>
      </RouterLink>

      <div class="site-header__actions">
        <button class="site-header__button" type="button" @click="toggleMenu">
          {{ menuOpen ? '关闭 MENU' : 'MENU' }}
        </button>
        <RouterLink
          class="site-header__button site-header__button--login"
          :to="accountRoute"
          @click="closeMenu"
        >
          {{ accountLabel }}
        </RouterLink>
      </div>
    </header>

    <main class="site-main">
      <RouterView />
    </main>

    <SiteFooter v-if="showFooter" />

    <MenuPanel :open="menuOpen" :items="menuItems" @close="closeMenu" />
  </div>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style.scss：glass-panel */
.site-shell {
  position: relative;
  width: var(--shell-width);
  margin: 0 auto;
  padding-bottom: 56px;
}

.site-main {
  width: 100%;
}

.site-header {
  position: fixed;
  top: 10px;
  left: 50%;
  z-index: 40;
  width: var(--shell-width);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 18px;
  border-radius: 22px;
  transition:
    background 220ms ease,
    border-color 220ms ease,
    opacity 220ms ease,
    transform 220ms ease;
}

.site-header--home-top {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.site-header--home-top .site-brand {
  opacity: 0;
  pointer-events: none;
}

.site-brand {
  display: inline-flex;
  align-items: center;
}

.site-brand strong {
  color: var(--color-text);
  font-size: 1.18rem;
  letter-spacing: 0.16em;
}

.site-header__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.site-header__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 96px;
  padding: 9px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease;
}

.site-header__button:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.site-header__button--login {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(202, 239, 255, 0.72));
  color: var(--color-text-deep);
  font-weight: 600;
}

@media (max-width: 760px) {
  .site-shell {
    width: var(--shell-width-mobile);
  }

  .site-header {
    top: 10px;
    width: var(--shell-width-mobile);
    padding: 12px 14px;
    border-radius: 18px;
  }

  .site-brand strong {
    font-size: 1rem;
  }

  .site-header__actions {
    gap: 8px;
  }

  .site-header__button {
    min-width: auto;
    padding: 9px 13px;
  }
}
</style>
