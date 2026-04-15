<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import MenuPanel from '../components/site/MenuPanel.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import LoginDialog from '../components/ui/LoginDialog.vue'
import { getCurrentUser, onAuthChange } from '../utils/auth.js'
import menuImageHome from '../assets/front/banner.jpg'
import menuImagePriceQuery from '../assets/front/pic01.jpg'
import menuImageStory from '../assets/front/pic02.jpg'
import menuImageCapabilities from '../assets/front/pic03.jpg'
import menuImageAiChat from '../assets/front/pic04.jpg'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const currentUser = ref(getCurrentUser())
const showLoginDialog = ref(false)
let removeAuthListener = () => {}

const isHome = computed(() => route.path === '/')
const showCompactHeader = computed(() => !isHome.value || isScrolled.value)
const showFooter = computed(() => !isHome.value)

// 菜单选项
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
// 音乐功能暂未实现，预留接口
const openMusic = computed (() => isScrolled.value)


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
      class="site-header"
      :class="{
        'site-header--home-top': isHome && !showCompactHeader,
        'site-header--compact': showCompactHeader,
      }"
    >
<!--      class="site-header glass-panel"-->
<!--      标签之中是不可以加注释的，-->
      <RouterLink
        v-if="showCompactHeader"
        class="site-brand"
        to="/"
        @click="closeMenu"
      >
        <strong>
<!--     site-brand--compact      <img src="../assets/vue.svg" alt="首页" width="24" height="24" />-->
          主页
        </strong>
      </RouterLink>

      <div class="site-header__actions">
<!--        <button class="site-header__button site-header__music-toggle" @click="openMusic">-->
<!--        后续可以追加背景音乐按钮-->
<!--        </button>-->
        <button class="site-header__button site-header__button--menu" type="button" @click="toggleMenu">
<!--          {{ menuOpen ? '关闭 MENU' : 'MENU ' }}-->
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
/* =============================================
   Site Header 样式（头部导航栏）
   ============================================= */

.site-shell {
  position: relative;
  width: var(--shell-width);
  margin: 0 auto;
  padding-bottom: 56px;
}

.site-main {
  width: 100%;
}

/* ==================== 头部基础样式 ==================== */
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

/* 首页顶部极简模式 */
.site-header--home-top {
  background: transparent;
  border-color: transparent;
  box-shadow: none;
  backdrop-filter: none;

  .site-brand {
    opacity: 0;
    pointer-events: none;
  }
}

/* ==================== 左侧品牌区 ==================== */
.site-brand {
  display: inline-flex;
  align-items: center;
}

.site-brand strong {
  color: var(--color-text);
  font-size: 1.18rem;
  letter-spacing: 0.16em;
}

/* ==================== 右侧操作区 ==================== */
.site-header__actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

/* ==================== 操作按钮样式 ==================== */

/* 通用按钮基础样式 */
.site-header__button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 110px;                     /* 适当增加宽度，容纳图标和移动 */
  padding: 9px 20px;                    /* 左右留出足够空间 */
  border-radius: 999px;
  font-weight: 500;
  overflow: hidden;
  transition:
      transform 180ms ease,
      background 220ms ease,
      color 220ms ease;
}

/* 1. 菜单按钮（MENU） */
.site-header__button--menu {
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #333333;
  min-width: 160px; /* 菜单按钮稍宽一些 */

  /* 伪元素 ， 默认右侧单个白点 */
  &::after {
    content: '•';
    position: absolute;
    right: 10px;
    font-size: 1.4em;
    line-height: 1;
    color: #ffffff;
    opacity: 1;
    transition: opacity 220ms ease;
  }

  /* 左侧箭头（默认隐藏） */
  &::before {
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

  /* 悬浮效果 */
  &:hover {
    //background: linear-gradient(135deg, #1a1a1a, #0016ec); //不用渐变，
    background: #0016ec;
    color: #ffffff;
    transform: translateY(-1px);

    /* 文字向右移动（通过 padding 实现自然位移） */
    padding-left: 34px;
    padding-right: 22px;

    /* 显示左侧箭头并滑入 */
    &::before {
      opacity: 1;
      transform: translateX(0);
    }

    /* 隐藏右侧白点 */
    &::after {
      opacity: 0;
    }
  }
}

/* 2. 登录按钮（灰底黑字） */
.site-header__button--login {
  background: #e5e5e5;           /* 浅灰色背景 */
  color: #1a1a1a;                /* 深黑色文字 */
  border: 1px solid #cccccc;

  font-weight: 600;

  &:hover {
    background: #ffffff;         /* 悬浮时变为纯白色 */
    color: #1a1a1a;
    transform: translateY(-1px);
  }
}

/* ==================== 移动端适配 ==================== */
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
    //min-width: auto; /* 移动端按钮宽度自适应内容，但是会挤压当前宽度，后续可以设计一个总的小按钮 */
    padding: 9px 13px;
  }
}
</style>
