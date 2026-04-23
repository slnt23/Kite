<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import MenuPanel from '../components/site/MenuPanel.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import LoginDialog from '../components/ui/LoginDialog.vue'
import { getCurrentUser, onAuthChange } from '../utils/auth.js'
import { FRONT_MENU_ITEMS } from '@/constants'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const isHeaderVisible = ref(true)
const isHeaderPinned = ref(false)
const currentUser = ref(getCurrentUser())
const showLoginDialog = ref(false)
let removeAuthListener = () => {}
let lastScrollY = 0
let lastShiftPressAt = 0
let pinnedHideTimer = 0

const shiftDoublePressGap = 360
const pinnedHeaderDuration = 5000
const scrollRevealThreshold = 12

const isHome = computed(() => route.path === '/')
const isChatRoute = computed(() => route.path === '/ai-chat')
const showCompactHeader = computed(() => !isHome.value || isScrolled.value)
const showFooter = computed(() => isHome.value)
const menuItems = computed(() => FRONT_MENU_ITEMS)
const accountRoute = computed(() => (currentUser.value ? '/profile' : '/login'))
const accountLabel = computed(() => (currentUser.value ? '我的' : '登录'))
// 音乐功能暂未实现，预留接口
const openMusic = computed(() => isScrolled.value)

const clearPinnedHideTimer = () => {
  if (pinnedHideTimer) {
    window.clearTimeout(pinnedHideTimer)
    pinnedHideTimer = 0
  }
}

const releasePinnedHeader = () => {
  clearPinnedHideTimer()
  isHeaderPinned.value = false

  if (!menuOpen.value && !showLoginDialog.value) {
    isHeaderVisible.value = false
  }
}

const schedulePinnedHeaderHide = () => {
  clearPinnedHideTimer()
  pinnedHideTimer = window.setTimeout(() => {
    releasePinnedHeader()
  }, pinnedHeaderDuration)
}

const showHeaderTemporarily = () => {
  isHeaderPinned.value = true
  isHeaderVisible.value = true
  schedulePinnedHeaderHide()
}

const syncScrollState = () => {
  const currentScrollY = window.scrollY
  const scrollDelta = currentScrollY - lastScrollY

  isScrolled.value = currentScrollY > window.innerHeight * 0.28

  if (menuOpen.value || showLoginDialog.value || isHeaderPinned.value) {
    isHeaderVisible.value = true
  } else if (currentScrollY <= 24) {
    isHeaderVisible.value = true
  } else if (scrollDelta > scrollRevealThreshold) {
    isHeaderVisible.value = false
  } else if (scrollDelta < -scrollRevealThreshold) {
    isHeaderVisible.value = true
  }

  lastScrollY = currentScrollY
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleKeydown = (event) => {
  if (event.key !== 'Shift' || event.repeat) {
    return
  }

  const now = Date.now()
  if (now - lastShiftPressAt <= shiftDoublePressGap) {
    showHeaderTemporarily()
    lastShiftPressAt = 0
    return
  }

  lastShiftPressAt = now
}

const refreshPinnedHeader = () => {
  if (!isHeaderPinned.value) {
    return
  }

  schedulePinnedHeaderHide()
}

watch(
  () => route.path,
  () => {
    closeMenu()
    isHeaderVisible.value = true
    window.requestAnimationFrame(() => {
      lastScrollY = window.scrollY
      syncScrollState()
    })
  },
)

watch(
  () => menuOpen.value,
  (open) => {
    if (open) {
      isHeaderVisible.value = true
      return
    }

    lastScrollY = window.scrollY
  },
)

watch(
  () => showLoginDialog.value,
  (open) => {
    if (open) {
      isHeaderVisible.value = true
      return
    }

    lastScrollY = window.scrollY
  },
)

onMounted(() => {
  lastScrollY = window.scrollY
  syncScrollState()
  removeAuthListener = onAuthChange((user) => {
    currentUser.value = user
  })
  window.addEventListener('scroll', syncScrollState, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('mousemove', refreshPinnedHeader, { passive: true })
  window.addEventListener('touchstart', refreshPinnedHeader, { passive: true })
  window.addEventListener('click', refreshPinnedHeader, { passive: true })
})

onBeforeUnmount(() => {
  clearPinnedHideTimer()
  removeAuthListener()
  window.removeEventListener('scroll', syncScrollState)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('mousemove', refreshPinnedHeader)
  window.removeEventListener('touchstart', refreshPinnedHeader)
  window.removeEventListener('click', refreshPinnedHeader)
})
</script>

<template>
  <div class="site-shell" :class="{ 'site-shell--menu-open': menuOpen, 'site-shell--chat': isChatRoute }">
    <header
      class="site-header"
      :class="{
        'site-header--home-top': isHome && !showCompactHeader,
        'site-header--compact': showCompactHeader,
        'site-header--hidden': !isHeaderVisible,
      }"
    >
      <RouterLink class="site-brand" to="/" @click="closeMenu">
        <strong>
          <img class="site-brand__logo" src="../assets/front/brand_home_header.png" alt="主页" />
        </strong>
      </RouterLink>

      <div class="site-header__actions">
        <!-- <button class="site-header__button site-header__music-toggle" @click="openMusic"> -->
        <!-- 后续可以追加背景音乐按钮 -->
        <!-- </button> -->
        <button class="site-header__button site-header__button--menu" type="button" @click="toggleMenu">
          LET'S MENU
        </button>
        <button
          v-if="!currentUser"
          class="site-header__button site-header__button--login"
          type="button"
          @click="showLoginDialog = true"
        >
          {{ accountLabel }}
        </button>
        <RouterLink
          v-else
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

    <LoginDialog v-model="showLoginDialog" />
  </div>
</template>

<style scoped lang="scss">
.site-shell {
  position: relative;
  width: var(--shell-width);
  margin: 0 auto;
  padding-bottom: 80px;
}

.site-shell--chat {
  width: 100%;
  max-width: none;
  padding-bottom: 0;
}

.site-main {
  width: 100%;
}

.site-header {
  position: fixed;
  top: var(--site-header-offset);
  left: 50%;
  z-index: 40;
  width: var(--shell-width);
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  min-height: var(--site-header-height);
  border-radius: var(--radius-pill);
  transition:
    background 220ms ease,
    border-color 220ms ease,
    opacity 220ms ease,
    transform 260ms ease;
}

.site-header--hidden {
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 18px));
}

.site-header--compact {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.site-header--home-top {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  backdrop-filter: none;
}

.site-brand {
  display: inline-flex;
  align-items: center;
}

.site-brand strong {
  color: var(--color-text-deep);
  font-size: 1.06rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.site-brand__logo {
  width: auto;
  height: 38px;
}

.site-header__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

/* 导航栏按钮样式保持不变 */
.site-header__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;
  padding: 9px 20px;
  border-radius: var(--radius-pill);
  font-weight: 500;
  overflow: hidden;
  transition:
    transform 180ms ease,
    background 220ms ease,
    color 220ms ease;
}

.site-header__button--menu {
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #333333;
  min-width: 160px;
}

.site-header__button--menu::after {
  content: '•';
  position: absolute;
  right: 10px;
  font-size: 1.4em;
  line-height: 1;
  color: #ffffff;
  opacity: 1;
  transition: opacity 220ms ease;
}

.site-header__button--menu::before {
  content: '→';
  position: absolute;
  left: 10px;
  font-size: 1.2em;
  opacity: 0;
  transform: translateX(-10px);
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.site-header__button--menu:hover {
  background: #0016ec;
  color: #ffffff;
  transform: translateY(-1px);
  padding-left: 34px;
  padding-right: 22px;
}

.site-header__button--menu:hover::before {
  opacity: 1;
  transform: translateX(0);
}

.site-header__button--menu:hover::after {
  opacity: 0;
}

.site-header__button--login {
  background: #e5e5e5;
  color: #1a1a1a;
  border: 1px solid #cccccc;
  font-weight: 600;
}

.site-header__button--login:hover {
  background: #ffffff;
  color: #1a1a1a;
  transform: translateY(-1px);
}

@media (max-width: 760px) {
  .site-shell {
    width: var(--shell-width-mobile);
  }

  .site-header {
    width: var(--shell-width-mobile);
    padding: 10px 12px;
  }

  .site-brand strong {
    font-size: 1rem;
  }

  .site-brand__logo {
    height: 34px;
  }

  .site-header__actions {
    gap: 8px;
  }

  .site-header__button {
    padding: 9px 13px;
  }
}
</style>
