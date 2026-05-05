<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileAccessibilitySection from '@/components/profile/ProfileAccessibilitySection.vue'
import ProfileAccountSection from '@/components/profile/ProfileAccountSection.vue'
import ProfileAppearanceSection from '@/components/profile/ProfileAppearanceSection.vue'
import ProfileNotificationsSection from '@/components/profile/ProfileNotificationsSection.vue'
import ProfilePublicProfileSection from '@/components/profile/ProfilePublicProfileSection.vue'
import SettingsWorkspaceShell from '@/components/layout/SettingsWorkspaceShell.vue'
import ProfileSettingsSidebar from '@/components/profile/ProfileSettingsSidebar.vue'
import type { EditablePublicProfile, ProfileSectionId, UserInfo } from '@/types'
import {
  AUTH_CHANGE_EVENT,
  AUTH_STORAGE_KEY,
  EXAMPLE_PUBLIC_PROFILE_DEFAULTS,
  PROFILE_ACCESSIBILITY_CARDS,
  PROFILE_ACCOUNT_CARDS,
  PROFILE_APPEARANCE_CARDS,
  PROFILE_NOTIFICATION_CARDS,
  PROFILE_SECTION_ITEMS,
  PROFILE_SETTINGS_NAV_SECTIONS,
} from '@/constants'

import { getCurrentUser, logout, onAuthChange } from '@/utils/auth.ts'

type ProfileUser = UserInfo & {
  avatarUrl?: string
  pronouns?: string
  websiteUrl?: string
}

const router = useRouter()
const currentUser = ref<ProfileUser | null>(getCurrentUser() as ProfileUser | null)
const activeSectionId = ref<ProfileSectionId>('public')
let removeAuthListener = () => { }

const profileName = computed(() => currentUser.value?.nickName || currentUser.value?.userName || 'Queue')
const profileHandle = computed(() => currentUser.value?.email || 'guest@kite.local')
const profileTitleLine = computed(() => {
  const u = currentUser.value
  const nick = (u?.nickName || '').trim()
  const un = (u?.userName || '').trim()
  if (nick && un) return `${nick} (${un})`
  if (nick) return nick
  if (un) return `(${un})`
  return `${profileName.value} (guest)`
})
const profileSidebarSubtitle = '你的个人账户'
const profileRole = computed(() => currentUser.value?.remark || '个人账户')
const profileLoginMode = computed(() => currentUser.value?.phone || '邮箱验证')
const profileLoginAt = computed(() => currentUser.value?.rawPhone || '未记录')
const profileInitial = computed(() => profileName.value.trim().slice(0, 1).toUpperCase() || 'Q')

const sidebarAvatarUrl = computed(
  () => (currentUser.value?.avatarUrl ?? '').trim() || EXAMPLE_PUBLIC_PROFILE_DEFAULTS.avatarUrl,
)

const activeSection = computed(
  () => PROFILE_SECTION_ITEMS.find((item) => item.id === activeSectionId.value) || PROFILE_SECTION_ITEMS[0],
)

const examplePublic = EXAMPLE_PUBLIC_PROFILE_DEFAULTS

const publicProfile = computed<EditablePublicProfile>(() => {
  const u = currentUser.value
  return {
    userName: u?.userName ?? '',
    phone: u?.phone ?? '',
    displayName: (u?.nickName || u?.userName || '').trim() || examplePublic.displayName,
    publicEmail: u?.email ?? examplePublic.publicEmail,
    bio: (u?.remark ?? '').trim() || examplePublic.bio,
    pronouns: u?.pronouns ?? examplePublic.pronouns,
    websiteUrl: u?.websiteUrl ?? examplePublic.websiteUrl,
    avatarUrl: (u?.avatarUrl ?? '').trim() || examplePublic.avatarUrl,
  }
})

const accountCards = computed(() =>
  PROFILE_ACCOUNT_CARDS.map((card) => {
    if (card.label === '当前身份') return { ...card, value: profileRole.value }
    if (card.label === '登录方式') return { ...card, value: profileLoginMode.value }
    if (card.label === '最近活动') return { ...card, value: profileLoginAt.value }
    if (card.label === '主邮箱') return { ...card, value: profileHandle.value }
    return card
  }),
)

const handleLogout = () => {
  logout()
  router.push('/')
}

const handleSavePublicProfile = (payload: EditablePublicProfile) => {
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
    nickName: payload.displayName,
    email: payload.publicEmail,
    phone: payload.phone,
    remark: payload.bio,
    avatarUrl: payload.avatarUrl,
    pronouns: payload.pronouns,
    websiteUrl: payload.websiteUrl,
  } as ProfileUser

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser.value))
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
  }
}

const handleEditAvatar = () => {
  activeSectionId.value = 'public'
}

onMounted(() => {
  removeAuthListener = onAuthChange(() => {
    currentUser.value = getCurrentUser() as ProfileUser | null
  })
})

onBeforeUnmount(() => {
  removeAuthListener()
})
</script>

<template>
  <SettingsWorkspaceShell>
    <template #sidebar>
      <ProfileSettingsSidebar
        v-model="activeSectionId"
        :sections="PROFILE_SETTINGS_NAV_SECTIONS"
        :title-line="profileTitleLine"
        :subtitle-line="profileSidebarSubtitle"
        :avatar-url="sidebarAvatarUrl"
        :avatar-initial="profileInitial"
      >
        <template #footer>
          <button type="button" class="profile-logout" @click="handleLogout">退出登录</button>
        </template>
      </ProfileSettingsSidebar>
    </template>

    <div class="profile-content">
      <header class="profile-content__header">
        <div>
          <p class="eyebrow-label">个人中心</p>
          <h2>{{ activeSection.heading }}</h2>
          <p>{{ activeSection.description }}</p>
        </div>
      </header>

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
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #ffebe9;
  }
}

.profile-content {
  display: grid;
  gap: 22px;
  min-width: 0;
}

.profile-content__header {
  padding: 8px 4px 0;
  background: transparent;
}

.profile-content__header h2 {
  margin: 4px 0 10px;
  font-size: 2rem;
  color: var(--color-text);
}

.profile-content__header p:last-child {
  margin: 0;
  color: var(--color-text-soft);
  max-width: 720px;
}
</style>
