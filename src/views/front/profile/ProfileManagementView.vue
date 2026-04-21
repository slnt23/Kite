<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, logout, onAuthChange } from '@/utils/auth.js'

const router = useRouter()
const currentUser = ref(getCurrentUser())
const activeSectionId = ref('public')
let removeAuthListener = () => {}

const profileSections = [
  {
    id: 'public',
    label: '公开资料',
    heading: '公开资料',
    description: '管理昵称、简介、外部链接和对外展示内容。',
  },
  {
    id: 'account',
    label: '账户',
    heading: '账户设置',
    description: '查看当前登录身份、绑定信息和基础账户状态。',
  },
  {
    id: 'appearance',
    label: '外观',
    heading: '外观偏好',
    description: '配置前台个人中心和常用界面的视觉偏好。',
  },
  {
    id: 'accessibility',
    label: '无障碍',
    heading: '无障碍',
    description: '调整文字显示、动效和辅助浏览偏好。',
  },
  {
    id: 'notifications',
    label: '通知',
    heading: '通知设置',
    description: '控制系统提醒、价格订阅和 AI 对话消息通知。',
  },
]

const activeSection = computed(
  () => profileSections.find((item) => item.id === activeSectionId.value) || profileSections[0],
)

const profileName = computed(() => currentUser.value?.displayName || '未登录用户')
const profileHandle = computed(() => currentUser.value?.email || `${currentUser.value?.role || 'guest'}@kite.local`)
const profileRole = computed(() => currentUser.value?.roleLabel || '访客身份')
const profileLoginMode = computed(() => currentUser.value?.loginModeLabel || '未记录')
const profileLoginAt = computed(() => {
  if (!currentUser.value?.loginAt) return '未记录'

  return new Date(currentUser.value.loginAt).toLocaleString('zh-CN', {
    hour12: false,
  })
})

const profileInitial = computed(() => profileName.value.trim().slice(0, 1).toUpperCase() || 'K')

const handleLogout = () => {
  logout()
  router.push('/login')
}

onMounted(() => {
  removeAuthListener = onAuthChange((user) => {
    currentUser.value = user
  })
})

onBeforeUnmount(() => {
  removeAuthListener()
})
</script>

<template>
  <div class="profile-management">
    <section class="profile-shell">
      <aside class="profile-sidebar">
        <div class="profile-sidebar__account">
          <div class="profile-sidebar__avatar">{{ profileInitial }}</div>
          <div class="profile-sidebar__identity">
            <h1>{{ profileName }}</h1>
            <p>{{ profileRole }}</p>
          </div>
        </div>

        <nav class="profile-sidebar__nav" aria-label="个人中心导航">
          <button
            v-for="section in profileSections"
            :key="section.id"
            type="button"
            class="profile-sidebar__item"
            :class="{ 'profile-sidebar__item--active': section.id === activeSectionId }"
            @click="activeSectionId = section.id"
          >
            {{ section.label }}
          </button>
        </nav>

        <div class="profile-sidebar__footer">
          <button type="button" class="profile-sidebar__link" @click="router.push('/')">返回首页</button>
          <button type="button" class="profile-sidebar__link" @click="router.push('/ai-chat')">进入 AI 聊天</button>
          <button type="button" class="profile-sidebar__link profile-sidebar__link--danger" @click="handleLogout">
            退出登录
          </button>
        </div>
      </aside>

      <div class="profile-content">
        <header class="profile-content__header">
          <div>
            <p class="eyebrow-label">Profile Center</p>
            <h2>{{ activeSection.heading }}</h2>
            <p>{{ activeSection.description }}</p>
          </div>
          <button type="button" class="profile-content__jump" @click="router.push('/profile')">前往您的个人资料</button>
        </header>

        <section v-if="activeSectionId === 'public'" class="profile-panel profile-panel--split">
          <div class="profile-form">
            <label class="profile-field">
              <span>姓名</span>
              <input type="text" :value="profileName" />
              <small>该名称会显示在个人中心与部分前台交互入口中。</small>
            </label>

            <label class="profile-field">
              <span>公开电子邮件</span>
              <input type="email" :value="profileHandle" />
              <small>用于展示给需要联系您的业务场景。</small>
            </label>

            <label class="profile-field">
              <span>个人简介</span>
              <textarea rows="5">专注于把价格查询、业务筛选与 AI 助手整合成顺滑的前台体验。</textarea>
              <small>你可以用这段简介补充自己的业务方向与个人标签。</small>
            </label>

            <label class="profile-field">
              <span>URL</span>
              <input type="url" value="https://kite.example/profile" />
            </label>

            <label class="profile-field">
              <span>社交账号</span>
              <input type="url" value="https://github.com/kite-profile" />
            </label>
          </div>

          <aside class="profile-aside">
            <div class="profile-avatar-card">
              <div class="profile-avatar-card__image">{{ profileInitial }}</div>
              <button type="button">编辑头像</button>
            </div>
          </aside>
        </section>

        <section v-else-if="activeSectionId === 'account'" class="profile-panel">
          <div class="profile-info-grid">
            <article class="profile-info-card">
              <span>当前身份</span>
              <strong>{{ profileRole }}</strong>
            </article>
            <article class="profile-info-card">
              <span>登录方式</span>
              <strong>{{ profileLoginMode }}</strong>
            </article>
            <article class="profile-info-card">
              <span>登录时间</span>
              <strong>{{ profileLoginAt }}</strong>
            </article>
            <article class="profile-info-card">
              <span>绑定邮箱</span>
              <strong>{{ profileHandle }}</strong>
            </article>
          </div>
        </section>

        <section v-else-if="activeSectionId === 'appearance'" class="profile-panel">
          <div class="profile-option-list">
            <article class="profile-option-card">
              <h3>界面密度</h3>
              <p>默认使用舒展布局，适合内容较多的查询和管理页面。</p>
            </article>
            <article class="profile-option-card">
              <h3>圆角风格</h3>
              <p>当前已统一为圆角矩形语言，与导航和全站表单风格保持一致。</p>
            </article>
            <article class="profile-option-card">
              <h3>卡片阴影</h3>
              <p>采用轻量阴影与浅边框，兼顾通透感和业务信息的可读性。</p>
            </article>
          </div>
        </section>

        <section v-else-if="activeSectionId === 'accessibility'" class="profile-panel">
          <div class="profile-option-list">
            <article class="profile-option-card">
              <h3>文字显示</h3>
              <p>建议在移动端使用默认字号，桌面端可保留更舒展的阅读节奏。</p>
            </article>
            <article class="profile-option-card">
              <h3>减少动效</h3>
              <p>可在后续接入系统偏好后，用于弱化按钮和面板过渡动画。</p>
            </article>
          </div>
        </section>

        <section v-else class="profile-panel">
          <div class="profile-option-list">
            <article class="profile-option-card">
              <h3>价格提醒</h3>
              <p>按材料、区域和品类订阅价格波动通知。</p>
            </article>
            <article class="profile-option-card">
              <h3>AI 会话动态</h3>
              <p>在 AI 助手返回结果、生成摘要或完成任务时提醒你。</p>
            </article>
            <article class="profile-option-card">
              <h3>系统消息</h3>
              <p>接收登录提醒、账户安全变更与站内更新说明。</p>
            </article>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.profile-management {
  min-height: 100vh;
  padding:
    calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap))
    var(--chat-edge-gap)
    var(--chat-edge-gap);
}

.profile-shell {
  min-height: 100%;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.profile-sidebar,
.profile-panel,
.profile-content__header {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: var(--shadow-soft);
}

.profile-sidebar {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 24px;
  padding: 24px 18px;
  align-self: start;
  height: fit-content;
}

.profile-sidebar__account {
  display: flex;
  align-items: center;
  gap: 14px;
}

.profile-sidebar__avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1f7ae0 0%, #79b8ff 100%);
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 700;
}

.profile-sidebar__identity h1 {
  margin: 0 0 4px;
  font-size: 1.18rem;
  color: var(--color-text);
}

.profile-sidebar__identity p {
  margin: 0;
  color: var(--color-text-soft);
}

.profile-sidebar__nav {
  display: grid;
  align-content: start;
  gap: 8px;
}

.profile-sidebar__item {
  width: 100%;
  padding: 14px 16px;
  border-left: 4px solid transparent;
  border-radius: var(--radius-ui);
  background: transparent;
  color: var(--color-text-soft);
  font-weight: 600;
  text-align: left;
  transition: background 180ms ease, border-color 180ms ease, color 180ms ease;
}

.profile-sidebar__item:hover {
  background: rgba(15, 23, 42, 0.05);
  color: var(--color-text);
}

.profile-sidebar__item--active {
  border-left-color: #1f7ae0;
  background: rgba(15, 23, 42, 0.07);
  color: var(--color-text);
}

.profile-sidebar__footer {
  display: grid;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

.profile-sidebar__link {
  padding: 12px 14px;
  border-radius: var(--radius-ui);
  background: rgba(15, 23, 42, 0.04);
  color: var(--color-text);
  text-align: left;
}

.profile-sidebar__link--danger {
  color: #b42318;
}

.profile-content {
  display: grid;
  gap: 20px;
  min-width: 0;
}

.profile-content__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 24px 28px;
}

.profile-content__header h2 {
  margin: 4px 0 10px;
  font-size: 2rem;
  color: var(--color-text);
}

.profile-content__header p:last-child {
  margin: 0;
  color: var(--color-text-soft);
}

.profile-content__jump {
  flex-shrink: 0;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid rgba(28, 54, 72, 0.16);
  border-radius: var(--radius-ui);
  background: rgba(255, 255, 255, 0.92);
  color: var(--color-text);
  font-weight: 600;
}

.profile-panel {
  padding: 28px;
}

.profile-panel--split {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.75fr);
  gap: 28px;
}

.profile-form {
  display: grid;
  gap: 22px;
}

.profile-field {
  display: grid;
  gap: 10px;
}

.profile-field span {
  color: var(--color-text);
  font-size: 1.02rem;
  font-weight: 700;
}

.profile-field small {
  color: var(--color-text-soft);
  line-height: 1.6;
}

.profile-field input,
.profile-field textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(28, 54, 72, 0.14);
  border-radius: var(--radius-ui);
  background: #f7fafc;
  color: var(--color-text);
  outline: none;
}

.profile-field textarea {
  resize: vertical;
}

.profile-aside {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.profile-avatar-card {
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 18px;
}

.profile-avatar-card__image {
  width: min(100%, 240px);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1f7ae0 0%, #79b8ff 100%);
  color: #ffffff;
  font-size: 4rem;
  font-weight: 700;
  box-shadow: var(--shadow-medium);
}

.profile-avatar-card button {
  min-height: 44px;
  padding: 0 18px;
  border-radius: var(--radius-ui);
  background: #ffffff;
  border: 1px solid rgba(28, 54, 72, 0.16);
  color: var(--color-text);
  font-weight: 600;
}

.profile-info-grid,
.profile-option-list {
  display: grid;
  gap: 16px;
}

.profile-info-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.profile-info-card,
.profile-option-card {
  padding: 20px 22px;
  border: 1px solid rgba(28, 54, 72, 0.12);
  border-radius: var(--radius-ui);
  background: #f9fbfd;
}

.profile-info-card span,
.profile-option-card p {
  color: var(--color-text-soft);
}

.profile-info-card strong,
.profile-option-card h3 {
  display: block;
  margin-top: 8px;
  color: var(--color-text);
}

.profile-option-card h3 {
  margin-bottom: 10px;
  font-size: 1.06rem;
}

.profile-option-card p {
  margin: 0;
  line-height: 1.7;
}

@media (max-width: 1120px) {
  .profile-shell {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  .profile-panel--split {
    grid-template-columns: 1fr;
  }

  .profile-aside {
    justify-content: flex-start;
  }
}

@media (max-width: 760px) {
  .profile-management {
    padding-top: calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap));
  }

  .profile-shell {
    grid-template-columns: 1fr;
  }

  .profile-sidebar,
  .profile-content__header,
  .profile-panel {
    padding: 20px;
  }

  .profile-content__header {
    display: grid;
  }

  .profile-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
