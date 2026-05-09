<script setup lang="ts">
/**
 * 用户个人中心页面组件
 */

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 导入个人中心各功能区块组件
import ProfileAccessibilitySection from '@/components/dashboard/ProfileAccessibilitySection.vue' // 辅助功能设置
import ProfileAccountSection from '@/components/dashboard/ProfileAccountSection.vue' // 账户信息管理
import ProfileAppearanceSection from '@/components/dashboard/ProfileAppearanceSection.vue' // 外观设置
import ProfileNotificationsSection from '@/components/dashboard/ProfileNotificationsSection.vue' // 通知设置
import ProfilePublicProfileSection from '@/components/dashboard/ProfilePublicProfileSection.vue' // 公开资料编辑

// 导入布局组件
import SettingsWorkspaceShell from '@/components/dashboard/SettingsWorkspaceShell.vue' // 整体布局容器
import SettingsSidebar from '@/components/dashboard/SettingsSidebar.vue' // 侧边导航栏

// 导入类型定义
import type { DashboardSectionId, UserInfoParams } from '@/types'

// 导入常量配置
import {
  AUTH_CHANGE_EVENT,
  AUTH_STORAGE_KEY,
  EXAMPLE_PUBLIC_PROFILE_DEFAULTS,
  PROFILE_ACCESSIBILITY_CARDS,
  PROFILE_ACCOUNT_CARDS,
  PROFILE_APPEARANCE_CARDS,
  PROFILE_NOTIFICATION_CARDS,
  // PROFILE_SECTION_ITEMS,
  PROFILE_SETTINGS_NAV_SECTIONS,
} from '@/constant'

// 导入认证工具函数
import { getCurrentUser, logout, onAuthChange } from '@/utils/auth.ts'

/**
 * 扩展的用户信息类型，包含个人资料相关字段
 */
// type ProfileUser = UserInfoParams & {
//   avatarUrl?: string // 头像URL
//   pronouns?: string // 人称代词
//   websiteUrl?: string // 个人网站
// }

// 路由实例，用于页面导航
const router = useRouter()

// 响应式数据定义，改为
const currentUser = ref<UserInfoParams | null>(getCurrentUser()) // 当前登录用户信息
const activeSectionId = ref<DashboardSectionId>('public') // 当前激活的功能区块ID，默认为公开资料

// 认证状态监听器清理函数
let removeAuthListener = () => {
}

/**
 * 计算属性：用户显示名称（优先显示昵称，其次用户名）
 */
const profileName = computed(() => currentUser.value?.nickName || currentUser.value?.userName || '个人中心')

/**
 * 计算属性：用户邮箱或访客标识
 */
const profileHandle = computed(() => currentUser.value?.email || 'guest@kite.local')

/**
 * 计算属性：侧边栏标题行显示逻辑
 * 显示规则：昵称(用户名) > 昵称 > (用户名) > 默认名称(guest)
 */
const profileTitleLine = computed(() => {
  const u = currentUser.value
  const nick = (u?.nickName || '').trim()
  const un = (u?.userName || '').trim()
  if (nick && un) return `${nick} (${un})` // 同时有昵称和用户名
  if (nick) return nick // 只有昵称
  if (un) return `(${un})` // 只有用户名
  return `${profileName.value} (guest)` // 访客模式
})

// 侧边栏副标题
const profileSidebarSubtitle = '你的个人账户'

/**
 * 计算属性：用户角色/备注信息
 */
const profileRole = computed(() => currentUser.value?.remark || '个人账户')

/**
 * 计算属性：登录方式显示
 */
const profileLoginMode = computed(() => currentUser.value?.phone || '邮箱验证')

/**
 * 计算属性：最近活动时间或登录记录
 */
const profileLoginAt = computed(() => currentUser.value?.rawPhone || '未记录')

/**
 * 计算属性：用户名称首字母（用于头像占位符）
 */
const profileInitial = computed(() => profileName.value.trim().slice(0, 1).toUpperCase() || 'Q')

/**
 * 计算属性：侧边栏头像URL（使用用户头像或默认头像）
 */
const sidebarAvatarUrl = computed(
  () => (currentUser.value?.avatar ?? '').trim() || EXAMPLE_PUBLIC_PROFILE_DEFAULTS.avatar,
)

/**
 * 计算属性：当前激活的功能区块配置信息
 */
// const activeSection = computed(
//   () => PROFILE_SECTION_ITEMS.find((item) => item.id === activeSectionId.value) || PROFILE_SECTION_ITEMS[0],
// )

// 公开资料默认值常量
const examplePublic = EXAMPLE_PUBLIC_PROFILE_DEFAULTS

/**
 * 计算属性：可编辑的公开资料表单数据
 * 将用户数据与默认值合并，确保表单有合理的初始值
 */
const publicProfile = computed<UserInfoParams>(() => {
  const u = currentUser.value
  return {
    userName: u?.userName ?? examplePublic.userName,
    nickName: (u?.nickName || u?.userName || '').trim() || examplePublic.nickName,
    email: u?.email ?? examplePublic.email,
    phone: u?.phone ?? examplePublic.phone,
    remark: (u?.remark ?? '').trim() || examplePublic.remark,
    rawPhone: u?.rawPhone ?? examplePublic.rawPhone,
    role: u?.role ?? examplePublic.role,
    avatar: (u?.avatar ?? '').trim() || examplePublic.avatar,
  }
})

const handleLogout = () => {
  logout()
  router.push('/')
}

const handleSavePublicProfile = (payload: UserInfoParams) => {
  // 更新当前用户数据
  currentUser.value = {
    ...(currentUser.value || {
      userName: '',
      nickName: '',
      email: '',
      phone: '',
      remark: '',
      rawPhone: '',
      avatarUrl: '',
    }),
    userName: payload.userName,
    nickName: payload.nickName,
    email: payload.email,
    phone: payload.phone,
    remark: payload.remark,
    avatar: payload.avatar,
  } as UserInfoParams

  // 在浏览器环境中持久化数据并通知其他组件
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser.value))
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))

    //后续要发送给后端接口，
  }
}

/**
 * 处理头像编辑操作
 * 切换到公开资料区块以便编辑头像
 */
const handleEditAvatar = () => {
  activeSectionId.value = 'public'
}

/**
 * 组件挂载时设置认证状态监听
 * 当用户登录状态变化时更新当前用户数据
 */
onMounted(() => {
  removeAuthListener = onAuthChange((user) => {
    currentUser.value = user as UserInfoParams | null
  })
})

/**
 * 组件卸载前清理认证监听器
 * 防止内存泄漏
 */
onBeforeUnmount(() => {
  removeAuthListener()
})

// 后期清除

/**
 * 计算属性：账户信息卡片数据
 * 将静态卡片配置与动态用户数据结合
 */
const accountCards = computed(() =>
  PROFILE_ACCOUNT_CARDS.map((card) => {
    if (card.label === '当前身份') return { ...card, value: profileRole.value }
    if (card.label === '登录方式') return { ...card, value: profileLoginMode.value }
    if (card.label === '最近活动') return { ...card, value: profileLoginAt.value }
    if (card.label === '主邮箱') return { ...card, value: profileHandle.value }
    return card
  }),
)

// 

</script>

<template>
  <!-- 个人中心整体布局容器 -->
  <SettingsWorkspaceShell>
    <template #sidebar>
      <SettingsSidebar v-model="activeSectionId" :sections="PROFILE_SETTINGS_NAV_SECTIONS"
        :title-line="profileTitleLine" :subtitle-line="profileSidebarSubtitle" :avatar-url="sidebarAvatarUrl"
        :avatar-initial="profileInitial">

        <template #footer>
          <button type="button" class="profile-logout" @click="handleLogout">退出登录</button>
        </template>
      </SettingsSidebar>
    </template>

    <!-- 主内容区域 -->
    <div class="profile-content">
      <header class="profile-content__header">
        <div>
          <p class="eyebrow-label">个人中心</p>
          <!-- <h2>{{ activeSection.heading }}</h2> -->
          <!-- <p>{{ activeSection.description }}</p> -->
        </div>
      </header>

      <!-- 动态内容区块：根据激活的区块ID显示对应组件 -->
      <ProfilePublicProfileSection v-if="activeSectionId === 'public'" :profile="publicProfile"
        @save="handleSavePublicProfile" @edit-avatar="handleEditAvatar" @email-settings="activeSectionId = 'account'" />
      <ProfileAccountSection v-else-if="activeSectionId === 'account'" :cards="accountCards" />
      <ProfileAppearanceSection v-else-if="activeSectionId === 'appearance'" :cards="PROFILE_APPEARANCE_CARDS" />
      <ProfileAccessibilitySection v-else-if="activeSectionId === 'accessibility'"
        :cards="PROFILE_ACCESSIBILITY_CARDS" />
      <ProfileNotificationsSection v-else :cards="PROFILE_NOTIFICATION_CARDS" />
    </div>
  </SettingsWorkspaceShell>
</template>

<style scoped lang="scss">
/**
 * 退出登录按钮样式
 */
.profile-logout {
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  color: #cf222e;
  /* 红色强调色，表示危险操作 */
  text-align: left;
  cursor: pointer;

  /* 悬停效果 */
  &:hover {
    background: #ffebe9;
    /* 浅红色背景 */
  }
}

/**
 * 主内容区域布局
 */
.profile-content {
  display: grid;
  gap: 22px;
  /* 区块间距 */
  min-width: 0;
  /* 防止内容溢出 */
}

/**
 * 内容区头部样式
 */
.profile-content__header {
  padding: 8px 4px 0;
  background: transparent;
}

/**
 * 内容区主标题样式
 */
.profile-content__header h2 {
  margin: 4px 0 10px;
  font-size: 2rem;
  color: var(--color-text);
  /* 使用CSS变量确保主题一致性 */
}

/**
 * 内容区描述文字样式
 */
.profile-content__header p:last-child {
  margin: 0;
  color: var(--color-text-soft);
  /* 较浅的文字颜色 */
  max-width: 720px;
  /* 限制最大宽度，提高可读性 */
}
</style>