<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isAuthenticated, loginWithAccessCode, logout } from '../../utils/auth.js'

const router = useRouter()
const route = useRoute()

const accessCode = ref('')
const errorMessage = ref('')
const submitting = ref(false)
const authed = ref(isAuthenticated())

const redirectTarget = computed(() => route.query.redirect || '/')

const submitLogin = () => {
  submitting.value = true
  errorMessage.value = ''

  const result = loginWithAccessCode(accessCode.value.trim())

  if (!result.success) {
    errorMessage.value = result.message
    submitting.value = false
    return
  }

  authed.value = true
  submitting.value = false
  router.replace(String(redirectTarget.value))
}

const handleLogout = () => {
  logout()
  authed.value = false
  accessCode.value = ''
}
</script>

<template>
  <div class="front-page front-page--article">
    <section class="article-hero article-hero--compact glass-panel">
      <p>Login</p>
      <h1>受保护页面已接入前端路由守卫。</h1>
      <p class="article-hero__body">
        当前是方案 B 的前端鉴权骨架。现在直接输入受保护路径会先跳到这里，登录后再回到原目标页面。后续如果接入后端，这里可以直接替换成真实登录流程。
      </p>
    </section>

    <section class="content-section content-section--narrow content-stack">
      <div v-if="!authed" class="login-panel glass-panel">
        <div class="login-panel__copy">
          <h2>输入访问码</h2>
          <p>
            当前演示访问码为 <code>cc-2026-kite</code>。这一版只是前端限制骨架，真正安全仍然需要后端接口鉴权。
          </p>
        </div>

        <form class="login-form" @submit.prevent="submitLogin">
          <label class="login-form__field">
            <span>访问码</span>
            <input v-model="accessCode" type="password" placeholder="请输入访问码" />
          </label>

          <p v-if="errorMessage" class="login-form__error">{{ errorMessage }}</p>

          <button class="login-form__submit" type="submit" :disabled="submitting">
            {{ submitting ? '验证中...' : '进入受保护页面' }}
          </button>
        </form>
      </div>

      <div v-else class="capability-block glass-panel">
        <div class="capability-block__row capability-block__row--head">
          <span>状态</span>
          <span>当前结果</span>
          <span>操作</span>
        </div>
        <div class="capability-block__row">
          <strong>已登录</strong>
          <span>你已经通过前端守卫验证，可以访问受保护页面。</span>
          <button class="capability-block__action" type="button" @click="handleLogout">
            退出当前验证
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style.scss：glass-panel、content-stack */
.front-page {
  display: grid;
  gap: 28px;
}

.article-hero {
  margin-top: 110px;
  padding: 28px;
  border-radius: 30px;
}

.article-hero > p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.article-hero h1 {
  margin: 0 0 14px;
  color: var(--color-text);
  line-height: 1.08;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
}

.article-hero__body,
.capability-block span {
  color: var(--color-text-soft);
}

.content-section--narrow {
  max-width: 860px;
}

.login-panel {
  padding: 28px;
  border-radius: 30px;
  display: grid;
  gap: 22px;
}

.login-panel__copy h2 {
  margin: 0 0 10px;
  color: var(--color-text);
}

.login-panel__copy p {
  margin: 0;
  color: var(--color-text-soft);
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
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text);
  outline: none;
}

.login-form__field input::placeholder {
  color: rgba(236, 247, 255, 0.52);
}

.login-form__error {
  margin: 0;
  color: #ffd4d4;
}

.login-form__submit,
.capability-block__action {
  justify-self: start;
  min-width: 160px;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(202, 239, 255, 0.72));
  color: var(--color-text-deep);
  font-weight: 700;
}

.capability-block {
  overflow: hidden;
  border-radius: 30px;
}

.capability-block__row {
  display: grid;
  grid-template-columns: minmax(140px, 0.8fr) minmax(0, 1.4fr) minmax(120px, 0.7fr);
  gap: 18px;
  padding: 18px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.capability-block__row--head {
  border-top: 0;
  color: rgba(245, 251, 255, 0.9);
  font-weight: 700;
}

.capability-block strong {
  color: var(--color-text);
}

@media (max-width: 960px) {
  .capability-block__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .article-hero,
  .login-panel {
    padding: 20px;
  }
}
</style>
