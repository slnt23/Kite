<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/modules'
import loginAdminImage from '@/assets/login/login_admin_1.png'
import loginUserImage from '@/assets/login/login_user_1.png'

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// 是否显示管理员登录
const showAdmin = ref(false)

const password = ref('')
const submitting = ref(false)
const errorMessage = ref('')
const router = useRouter()
const activeTab = ref('mail')

// 管理员登录表单
const loginForm = reactive({
  email: '',
  password: '',
  code: ''
})

// 计算属性
const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// 切换登录模式
const toggleMode = () => {
  showAdmin.value = !showAdmin.value
  password.value = ''
  errorMessage.value = ''
}

// 提交登录
const submitLogin = async () => {
  submitting.value = true
  errorMessage.value = ''
  const role = showAdmin.value ? 'admin' : 'user'
  const result = loginApi({ role, mode: 'password', secret: password.value })

  if (!result.success) {
    errorMessage.value = result.message
    submitting.value = false
    return
  }

  submitting.value = false
  visible.value = false
  router.push('/profile')
}

//提交注册
const submitRegister = async () => {
}

// 关闭弹窗
const closeDialog = () => {
  visible.value = false
  showAdmin.value = false
  password.value = ''
  errorMessage.value = ''
}
</script>

<template>
  <el-dialog v-model="visible" width="1000px" :show-close="false" @close="closeDialog" class="login-dialog">
    <!-- 自定义关闭按钮 -->
    <button class="login-close-button" @click="closeDialog">×</button>

    <div class="dialog-content">
      <!-- 左边：如果 showAdmin 为 true 显示表单，否则显示图片   admin  -->
      <div class="main-panel" :class="{ 'user-mode': showAdmin, 'admin-mode': !showAdmin }"
        :style="{ width: showAdmin ? '60%' : '40%' }">
        <div v-if="showAdmin" class="form-panel">
          <!--          <h2>管理员登录 请保存好密码 后期删掉</h2>-->
          <div class="form-header">
            <el-tabs v-model="activeTab" class="tabs">
              <el-tab-pane label="邮箱登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="form-body">
            <el-form :model="loginForm">
              <el-form-item prop="mail">
                <div class="email-input-group">
                  <el-input v-model="loginForm.email" placeholder="请输入邮箱地址" clearable></el-input>
                  <el-button v-if="activeTab === 'mail'">发送验证码</el-button>
                </div>

              </el-form-item>

              <el-form-item prop="code" v-if="activeTab === 'mail'">
                <el-input v-model="loginForm.code" clearable placeholder="请输入验证码" />
              </el-form-item>
              <el-form-item prop="password" v-else>
                <el-input v-model="loginForm.password" type="password" show-password clearable placeholder="请输入密码" />
              </el-form-item>
              <el-button class="form-button" type="primary" :loading="submitting" @click="submitLogin">登录</el-button>
            </el-form>
          </div>

        </div>
        <div v-else class="image-panel">
          <img :src="loginUserImage" alt="用户登录背景" />
        </div>
      </div>

      <!-- 右边：如果 showAdmin 为 false 显示表单，否则显示图片  user -->
      <div class="main-panel" :class="{ 'user-mode': showAdmin, 'admin-mode': !showAdmin }"
        :style="{ width: showAdmin ? '40%' : '60%' }">
        <div v-if="!showAdmin" class="form-panel">
          <!--          <h2>欢迎用户登录 后期删掉</h2>-->
          <div class="form-header">
            <el-tabs v-model="activeTab" class="tabs">
              <el-tab-pane label="邮箱注册/登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <div v-if="activeTab === 'mail'" class="form-body">
            <el-form>
              <el-form-item prop="mail">
                <div class="email-input-group">
                  <el-input placeholder="请输入邮箱地址" clearable class="email-input" />
                  <el-button>发送验证码</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="text" show-password clearable placeholder="请输入验证码" />
              </el-form-item>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <div class="form-button-group">
                <el-button type="primary" @click="submitRegister" class="form-button">注册</el-button>
                <el-button type="primary" :loading="submitting" @click="submitLogin" class="form-button">登录</el-button>
              </div>
            </el-form>
          </div>

          <div v-else-if="activeTab === 'password'" class="form-body">
            <el-form>
              <el-form-item prop="mail">
                <el-input placeholder="请输入邮箱地址" clearable />
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="password" show-password clearable placeholder="请输入密码" />
              </el-form-item>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <div class="form-button-group">
                <el-button type="primary" :loading="submitting" @click="submitLogin" class="form-button">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
        <div v-else class="image-panel">
          <img :src="loginAdminImage" alt="管理员登录背景" />
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      点击这里，切换为
      <el-button link type="primary" @click="toggleMode">{{ showAdmin ? '用户' : '管理员' }}</el-button>
      登录
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
.login-dialog {
  border-radius: var(--border-radius-md);
  overflow: hidden;
  padding: 50px;

  :deep(.el-dialog__body) {
    padding: 0 !important;
  }

  .dialog-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .main-panel {
      &:first-child {
        border-right: 1px solid #ccc;
      }

      &.user-mode {
        flex-direction: row;
      }

      &.admin-mode {
        flex-direction: row-reverse;
      }

      .form-panel {
        text-align: center;
        width: 100%;
        padding: 20px;

        h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .form-header {
          padding: 40px;
          text-align: center;

          .tabs {
            :deep(.el-tabs__nav) {
              border: none;
              background: transparent;
              margin: 0 auto;
            }

            :deep(.el-tabs__nav-wrap),
            :deep(.el-tabs__nav-scroll) {
              display: flex;
              justify-content: center;
            }

            :deep(.el-tabs__item) {
              padding: 0 32px 16px;
              font-size: 18px;
              color: #303133;
              background: transparent;
              border: none;
              position: relative;
              transition: color 0.3s;

              &:not(:last-child)::after {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 18px;
                background-color: #dcdfe6;
              }

              &.is-active {
                color: #409eff;
                font-weight: 500;
              }

              &:hover {
                color: #409eff;
              }
            }

            :deep(.el-tabs__active-bar) {
              display: none !important;
            }
          }
        }

        .form-body {
          padding: 5px 40px;
          text-align: center;
          font-size: 16px;

          :deep(.el-form-item__label) {
            font-size: 16px;
            font-weight: 500;
          }

          :deep(.el-input__inner) {
            height: 44px;
            font-size: 16px;
            border-radius: var(--radius-ui);
          }

          :deep(.el-button) {
            height: 44px;
            font-size: 16px;
            border-radius: var(--radius-ui);
          }

          .email-input-group {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;

            .email-input {
              flex: 1;
            }
          }

          .form-button-group {
            display: flex;
            gap: 12px;
            margin: 0;

            .form-button {
              flex: 1;
            }
          }

          .form-button {
            width: 100%;
            margin: 0 auto 0;
          }
        }

        .el-form-item {
          margin-bottom: 16px;

          .el-input {
            width: 100%;
          }
        }

        .error-message {
          color: #f56c6c;
          margin: 0 0 16px;
        }
      }

      .image-panel {
        text-align: center;
        width: 100%;
        padding: 75px;
        border-radius: var(--border-radius-md);

        img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      }
    }
  }

  .dialog-footer {
    text-align: center;
    margin-top: 10px;
  }

  .login-close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    color: #999;

    &:hover {
      color: #333;
    }
  }
}
</style>
