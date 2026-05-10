<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { UserInfoParams } from '@/types'


import {
  EXAMPLE_PUBLIC_PROFILE_EMAIL_OPTIONS,
  // EXAMPLE_PUBLIC_PROFILE_HINTS,
  // EXAMPLE_PUBLIC_PROFILE_PRONOUNS_OPTIONS,
} from '@/constant'

const hints = {
  displayUserName: '你的姓名可能会显示在站点中你参与协作或被提及的位置，可随时修改或清空。',
  displayName: '你的昵称可能会显示在站点中你参与协作或被提及的位置，可随时修改或清空。',
  publicEmail: '你已将邮箱设为私密。要调整展示方式，请到「邮箱设置」中取消勾选「对外隐藏邮箱」。',
  bio: '可以记录一些个人简介信息，',
  // pronouns: '',
  // websiteUrl: '',
}

const props = defineProps<{
  profile: UserInfoParams
}>()

const emit = defineEmits<{
  save: [profile: UserInfoParams]
  editAvatar: []
  'email-settings': []
}>()

const router = useRouter()

const formState = reactive<UserInfoParams>({
  userName: '',
  nickName: '',
  email: '',
  phone: '',
  remark: '',
  rawPhone: '',
  role: '',
  avatarUrl: '',
})

const emailOptionsBase = EXAMPLE_PUBLIC_PROFILE_EMAIL_OPTIONS
// const pronounsOptions = EXAMPLE_PUBLIC_PROFILE_PRONOUNS_OPTIONS

const emailOptionsResolved = computed(() => {
  const val = formState.email
  const list = [...emailOptionsBase]
  if (val && !list.some((o) => o.value === val)) {
    list.splice(1, 0, { value: val, label: val })
  }
  return list
})

const syncFormState = (profile: UserInfoParams) => {
  formState.userName = profile.userName
  formState.nickName = profile.nickName
  formState.email = profile.email
  formState.remark = profile.remark
  formState.phone = profile.phone
  formState.rawPhone = profile.rawPhone
  formState.role = profile.role
  formState.avatarUrl = profile.avatarUrl
}

watch(
  () => props.profile,
  (profile) => {
    syncFormState(profile)
  },
  { immediate: true, deep: true },
)

const handleConfirmUpdate = () => {
  emit('save', { ...formState })
}

const handleEditAvatar = () => {
  emit('editAvatar')
}

const goPersonalProfile = () => {
  router.push({ name: 'front-home' })
}
</script>

<template>
  <section class="public-profile">
    <header class="public-profile__head">
      <div class="public-profile__head-text">
        <h3 class="public-profile__title">公开资料</h3>
        <div class="public-profile__rule" />
      </div>
      <!--      <button type="button" class="public-profile__ghost-btn" @click="goPersonalProfile">-->
      <!--        前往个人主页-->
      <!--      </button>-->
    </header>

    <div class="public-profile__grid">
      <div class="public-profile__form">

        <div class="field">
          <label class="field__label" for="pp-display-name">用户名</label>
          <input id="pp-display-name" v-model="formState.userName" type="text" class="field__control"
            autocomplete="name" />
          <p class="field__hint">{{ hints.displayUserName }}</p>
        </div>

        <div class="field">
          <label class="field__label" for="pp-display-name">昵称</label>
          <input id="pp-display-name" v-model="formState.nickName" type="text" class="field__control"
            autocomplete="name" />
          <p class="field__hint">{{ hints.displayName }}</p>
        </div>

        <div class="field">
          <label class="field__label" for="pp-public-email">公开邮箱</label>
          <select id="pp-public-email" v-model="formState.email" class="field__control field__select">
            <option v-for="opt in emailOptionsResolved" :key="`${opt.value}-${opt.label}`" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
          <p class="field__hint">
            {{ hints.publicEmail }}
            <button type="button" class="field__hint-link" @click="emit('email-settings')">邮箱设置</button>
          </p>
        </div>

        <div class="field">
          <label class="field__label" for="pp-url">手机号</label>
          <input id="pp-url" v-model="formState.phone" class="field__control" autocomplete="url"
            placeholder="https://" />
        </div>

        <div class="field">
          <label class="field__label" for="pp-bio">备注/个人简介</label>
          <textarea id="pp-bio" v-model="formState.remark" class="field__control field__textarea" rows="5" />
          <p class="field__hint">{{ hints.bio }}</p>
        </div>

        <!--        <div class="field">-->
        <!--          <label class="field__label" for="pp-pronouns">人称代词</label>-->
        <!--          <select id="pp-pronouns" v-model="formState.pronouns" class="field__control field__select">-->
        <!--            <option v-for="opt in pronounsOptions" :key="opt.label" :value="opt.value">-->
        <!--              {{ opt.label }}-->
        <!--            </option>-->
        <!--    type="url"      </select>-->
        <!--        </div>-->

        <div class="public-profile__actions">
          <button type="button" class="public-profile__submit" @click="handleConfirmUpdate">
            确认更新
          </button>
        </div>
      </div>

      <aside class="public-profile__aside">
        <span class="field__label public-profile__aside-label">头像</span>
        <div class="public-profile__avatar-wrap">
          <div v-if="formState.avatarUrl" class="public-profile__avatar-ring">
            <img :src="formState.avatarUrl" alt="默认头像" class="public-profile__avatar-img" />
          </div>
          <div v-else class="public-profile__avatar-ring public-profile__avatar-ring--placeholder">
            {{ formState.nickName?.trim().slice(0, 1) || formState.userName?.trim().slice(0, 1) || '用' }}
          </div>
          <button type="button" class="public-profile__edit-avatar" @click="handleEditAvatar">
            编辑
          </button>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.public-profile {
  --pp-border: #d0d7de;
  --pp-bg: #f6f8fa;
  --pp-hint: #656d76;
  --pp-green: #1a7f37;
  --pp-green-hover: #116329;
  --pp-link: #0969da;

  min-width: 0;
}

.public-profile__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.public-profile__title {
  margin: 0 0 10px;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--color-text, #1f2328);
}

.public-profile__rule {
  height: 1px;
  background: var(--pp-border);
  max-width: 100%;
}

.public-profile__ghost-btn {
  flex-shrink: 0;
  margin-top: 2px;
  padding: 5px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--color-text, #24292f);
  background: #ffffff;
  border: 1px solid var(--pp-border);
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--pp-bg);
  }
}

.public-profile__grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(240px, 1fr);
  gap: 32px 40px;
  align-items: start;
}

.public-profile__form {
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
}

.field__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text, #1f2328);
}

.field__control {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text, #24292f);
  background: var(--pp-bg);
  border: 1px solid var(--pp-border);
  border-radius: 6px;
  outline: none;

  &:focus {
    border-color: #0969da;
    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15);
  }
}

.field__textarea {
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
}

.field__select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2365768a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  padding-right: 32px;
}

.field__hint {
  margin: 6px 0 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: var(--pp-hint);
}

.field__hint-link {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  font-size: inherit;
  color: var(--pp-link);
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.public-profile__actions {
  margin-top: 4px;
}

.public-profile__submit {
  padding: 5px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  color: #ffffff;
  background: var(--pp-green);
  border: 1px solid rgba(27, 31, 36, 0.15);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &:hover {
    background: var(--pp-green-hover);
  }
}

.public-profile__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
}

.public-profile__aside-label {
  margin-bottom: 0;
}

.public-profile__avatar-wrap {
  position: relative;
  width: 100%;
  max-width: 280px;
}

.public-profile__avatar-ring {
  width: 100%;
  max-width: 280px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--pp-border);
  background: var(--pp-bg);
}

.public-profile__avatar-ring--placeholder {
  display: grid;
  place-items: center;
  font-size: 4.5rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #1f7ae0 0%, #79b8ff 100%);
  border: none;
}

.public-profile__avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.public-profile__edit-avatar {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text, #24292f);
  background: #ffffff;
  border: 1px solid var(--pp-border);
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(27, 31, 36, 0.08);

  &:hover {
    background: var(--pp-bg);
  }
}

@media (max-width: 900px) {
  .public-profile__grid {
    grid-template-columns: 1fr;
  }

  .public-profile__avatar-wrap {
    max-width: 220px;
  }
}

@media (max-width: 600px) {
  .public-profile__head {
    flex-direction: column;
    align-items: stretch;
  }

  .public-profile__ghost-btn {
    width: fit-content;
  }
}
</style>
