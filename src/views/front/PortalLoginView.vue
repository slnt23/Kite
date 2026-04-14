<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import loginHeroBgPrimary from '../../assets/login/login-hero-bg-01.jpg'
import loginHeroBgSecondary from '../../assets/login/login-hero-bg-02.jpg'
import {
  AUTH_LOGIN_MODE,
  getCurrentUser,
  getDemoCredentials,
  login,
  logout,
  onAuthChange,
} from '../../utils/auth.session.js'

const router = useRouter()
const route = useRoute()
const demoCredentials = getDemoCredentials()

const selectedRole = ref('user')
const loginMode = ref(AUTH_LOGIN_MODE.PASSWORD)
const secret = ref('')
const submitting = ref(false)
const errorMessage = ref('')
const currentUser = ref(getCurrentUser())
let removeAuthListener = () => {}

const redirectTarget = computed(() => String(route.query.redirect || '/profile'))
const secretLabel = computed(() =>
  loginMode.value === AUTH_LOGIN_MODE.PASSWORD ? '登录密码' : '登录验证码',
)
const secretPlaceholder = computed(() =>
  loginMode.value === AUTH_LOGIN_MODE.PASSWORD ? '请输入密码' : '请输入 6 位验证码',
)
const selectedRoleDemo = computed(() => demoCredentials[selectedRole.value])

const roleOptions = [
  { value: 'admin', label: '管理员', description: '适合后台管理与高权限操作演示' },
  { value: 'user', label: '普通用户', description: '适合日常查询、聊天与个人中心体验' },
]

const modeOptions = [
  { value: AUTH_LOGIN_MODE.PASSWORD, label: '密码登录', description: '使用固定演示密码进入系统' },
  { value: AUTH_LOGIN_MODE.CODE, label: '验证码登录', description: '使用短验证码快速完成登录' },
]

const submitLogin = () => {
  submitting.value = true
  errorMessage.value = ''

  const result = login({
    role: selectedRole.value,
    mode: loginMode.value,
    secret: secret.value,
  })

  if (!result.success) {
    errorMessage.value = result.message
    submitting.value = false
    return
  }

  submitting.value = false
  secret.value = ''
  router.replace(redirectTarget.value)
}

const handleLogout = () => {
  logout()
  secret.value = ''
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
  <div class="login-screen">
    <section class="login-hero">
      <img class="login-hero__image" :src="loginHeroBgPrimary" alt="登录界面背景图" />
      <div class="login-hero__veil" />
      <div class="login-hero__content">
        <p>Secure Access</p>
        <h1>欢迎进入 Kite 智能服务门户</h1>
        <p class="login-hero__summary">
          登录页参考 EXAMPLE 模板的沉浸式单屏结构，重建为适合当前项目的 Vue 3 登录界面，并补齐角色选择、密码/验证码双模式登录。
        </p>
        <div class="login-hero__tags">
          <span>管理员 / 普通用户</span>
          <span>密码登录 / 验证码登录</span>
          <span>登录后进入个人中心</span>
        </div>
      </div>
    </section>

    <section class="login-stage glass-panel">
      <div class="login-stage__intro">
        <p class="eyebrow-label">Account Sign In</p>
        <h2>选择身份与登录方式</h2>
        <p>
          这一版先使用演示账号。后续接入真实后端时，可以把这里的提交逻辑直接替换成 API 调用。
        </p>
      </div>

      <div v-if="!currentUser" class="login-stage__body">
        <div class="login-card login-card--form">
          <div class="login-choice-grid">
            <label
              v-for="option in roleOptions"
              :key="option.value"
              class="login-choice"
              :class="{ 'login-choice--active': selectedRole === option.value }"
            >
              <input v-model="selectedRole" type="radio" name="role" :value="option.value" />
              <span>{{ option.label }}</span>
              <small>{{ option.description }}</small>
            </label>
          </div>

          <div class="login-choice-grid login-choice-grid--compact">
            <label
              v-for="option in modeOptions"
              :key="option.value"
              class="login-choice"
              :class="{ 'login-choice--active': loginMode === option.value }"
            >
              <input v-model="loginMode" type="radio" name="mode" :value="option.value" />
              <span>{{ option.label }}</span>
              <small>{{ option.description }}</small>
            </label>
          </div>

          <form class="login-form" @submit.prevent="submitLogin">
            <label class="login-form__field">
              <span>{{ secretLabel }}</span>
              <input
                v-model="secret"
                :type="loginMode === AUTH_LOGIN_MODE.PASSWORD ? 'password' : 'text'"
                :placeholder="secretPlaceholder"
                autocomplete="off"
              />
            </label>

            <p v-if="errorMessage" class="login-form__error">{{ errorMessage }}</p>

            <button class="login-form__submit" type="submit" :disabled="submitting">
              {{ submitting ? '登录中...' : '立即登录' }}
            </button>
          </form>
        </div>

        <aside class="login-card login-card--demo">
          <img class="login-card__preview" :src="loginHeroBgSecondary" alt="登录演示配图" />
          <div class="login-card__copy">
            <h3>当前演示信息</h3>
            <p>
              已根据你选择的角色自动切换演示账号信息，方便后续对接真实权限模型时继续沿用。
            </p>
            <ul class="login-demo-list">
              <li>
                <strong>身份：</strong>
                {{ selectedRoleDemo.roleLabel }} / {{ selectedRoleDemo.displayName }}
              </li>
              <li>
                <strong>密码：</strong>
                {{ selectedRoleDemo.password }}
              </li>
              <li>
                <strong>验证码：</strong>
                {{ selectedRoleDemo.code }}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div v-else class="login-state">
        <div class="login-state__panel">
          <p class="eyebrow-label">Signed In</p>
          <h2>{{ currentUser.displayName }}，你已经登录成功。</h2>
          <p>
            当前身份为 {{ currentUser.roleLabel }}，登录方式为 {{ currentUser.loginModeLabel }}。
            你现在可以进入个人中心，或者退出当前账号重新切换身份。
          </p>
          <div class="login-state__actions">
            <button class="login-form__submit" type="button" @click="router.push('/profile')">
              进入个人中心
            </button>
            <button class="login-state__logout" type="button" @click="handleLogout">退出登录</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.login-screen {
  display: grid;
  gap: 28px;
  padding-top: 88px;
}

.login-hero {
  position: relative;
  min-height: 72vh;
  display: grid;
  align-items: end;
  overflow: hidden;
  border-radius: 36px;
}

.login-hero__image,
.login-hero__veil {
  position: absolute;
  inset: 0;
}

.login-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.02) brightness(0.58);
}

.login-hero__veil {
  background:
    linear-gradient(135deg, rgba(7, 19, 44, 0.28), rgba(6, 17, 39, 0.84)),
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent 30%),
    radial-gradient(circle at right center, rgba(86, 183, 255, 0.34), transparent 28%);
}

.login-hero__content {
  position: relative;
  z-index: 1;
  width: min(760px, calc(100% - 36px));
  padding: 42px 0 42px 36px;
}

.login-hero__content > p:first-child {
  margin: 0 0 16px;
  color: rgba(245, 251, 255, 0.9);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.login-hero__content h1 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  line-height: 1;
}

.login-hero__summary {
  max-width: 60ch;
  margin: 22px 0 0;
  color: rgba(239, 248, 255, 0.82);
  font-size: 1.03rem;
}

.login-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}

.login-hero__tags span {
  padding: 9px 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.login-stage {
  display: grid;
  gap: 24px;
  padding: 30px;
  border-radius: 32px;
}

.login-stage__intro h2,
.login-card__copy h3,
.login-state__panel h2 {
  margin: 0 0 10px;
  color: var(--color-text);
}

.login-stage__intro p,
.login-card__copy p,
.login-state__panel p {
  margin: 0;
  color: var(--color-text-soft);
}

.login-stage__body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
  gap: 20px;
}

.login-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.06);
}

.login-card--form {
  padding: 22px;
}

.login-choice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.login-choice-grid--compact {
  margin-bottom: 22px;
}

.login-choice {
  position: relative;
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition:
    transform 180ms ease,
    background 180ms ease,
    border-color 180ms ease;
}

.login-choice input {
  position: absolute;
  opacity: 0;
  inset: 0;
}

.login-choice span {
  color: var(--color-text);
  font-weight: 700;
}

.login-choice small {
  color: rgba(236, 247, 255, 0.68);
}

.login-choice--active {
  transform: translateY(-1px);
  border-color: rgba(132, 216, 255, 0.58);
  background: linear-gradient(180deg, rgba(118, 205, 255, 0.16), rgba(255, 255, 255, 0.06));
}

.login-form {
  display: grid;
  gap: 16px;
}

.login-form__field {
  display: grid;
  gap: 8px;
}

.login-form__field span {
  color: var(--color-text);
  font-weight: 600;
}

.login-form__field input {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  outline: none;
}

.login-form__field input::placeholder {
  color: rgba(236, 247, 255, 0.48);
}

.login-form__error {
  margin: 0;
  color: #ffd6d6;
}

.login-form__submit,
.login-state__logout {
  min-width: 160px;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  font-weight: 700;
}

.login-form__submit {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(167, 227, 255, 0.8));
  color: var(--color-text-deep);
}

.login-form__submit:disabled {
  opacity: 0.7;
  cursor: wait;
}

.login-card__preview {
  width: 100%;
  height: 220px;
  object-fit: cover;
  filter: brightness(0.74);
}

.login-card__copy {
  padding: 22px;
}

.login-demo-list {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  color: var(--color-text);
}

.login-state__panel {
  padding: 10px 4px 4px;
}

.login-state__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.login-state__logout {
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
}

@media (max-width: 960px) {
  .login-stage__body {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .login-screen {
    padding-top: 80px;
  }

  .login-hero {
    min-height: 60vh;
    border-radius: 26px;
  }

  .login-hero__content {
    width: min(100% - 24px, 760px);
    padding: 26px 0 26px 20px;
  }

  .login-stage {
    padding: 20px;
    border-radius: 26px;
  }

  .login-choice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
