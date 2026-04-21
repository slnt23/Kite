<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getCurrentUser, logout, onAuthChange } from '../../../utils/auth.js'

const router = useRouter()
const currentUser = ref(getCurrentUser())
let removeAuthListener = () => {}

const loginTime = computed(() => {
  if (!currentUser.value?.loginAt) {
    return '未记录'
  }

  return new Date(currentUser.value.loginAt).toLocaleString('zh-CN', {
    hour12: false,
  })
})

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
  <div class="profile-page">
    <section class="profile-hero glass-panel">
      <p class="eyebrow-label">My Center</p>
      <h1>个人中心</h1>
      <p>导航栏登录后会自动切换为“我的”，并跳转到这里作为登录后的承接页。</p>
    </section>

    <section class="profile-grid">
      <article class="profile-card glass-panel">
        <h2>账号信息</h2>
        <div class="profile-info">
          <span>显示名称</span>
          <strong>{{ currentUser?.displayName }}</strong>
        </div>
        <div class="profile-info">
          <span>当前身份</span>
          <strong>{{ currentUser?.roleLabel }}</strong>
        </div>
        <div class="profile-info">
          <span>登录方式</span>
          <strong>{{ currentUser?.loginModeLabel }}</strong>
        </div>
        <div class="profile-info">
          <span>登录时间</span>
          <strong>{{ loginTime }}</strong>
        </div>
      </article>

      <article class="profile-card glass-panel">
        <h2>快捷入口</h2>
        <div class="profile-actions">
          <button type="button" @click="router.push('/')">进入价格查询</button>
          <button type="button" @click="router.push('/ai-chat')">进入 AI 聊天</button>
          <button type="button" @click="handleLogout">退出当前账号</button>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  display: grid;
  gap: 22px;
  padding-top: 110px;
}

.profile-hero,
.profile-card {
  padding: 28px;
  border-radius: 30px;
}

.profile-hero h1,
.profile-card h2 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.profile-hero p,
.profile-info span {
  color: var(--color-text-soft);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.profile-info {
  display: grid;
  gap: 6px;
  padding: 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.profile-info:first-of-type {
  border-top: 0;
}

.profile-info strong {
  color: var(--color-text);
}

.profile-actions {
  display: grid;
  gap: 12px;
}

.profile-actions button {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-text);
  text-align: left;
}

@media (max-width: 960px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .profile-page {
    padding-top: 90px;
  }

  .profile-hero,
  .profile-card {
    padding: 20px;
  }
}
</style>
