<script setup>
import {ref, computed, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '@/utils/auth.js'
import loginAdminImage from '@/assets/login/login_admin_1.jpg'
import loginUserImage from '@/assets/login/login_user_1.jpg'

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
  const result = login({role, mode: 'password', secret: password.value})

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
  <el-dialog
      v-model="visible"
      width="1000px"
      :show-close="false"
      @close="closeDialog"
      class="login-dialog"
  >
    <!-- 自定义关闭按钮 -->
    <button class="login-close-button" @click="closeDialog">×</button>

    <div class="dialog-content">
      <!-- 左边：如果 showAdmin 为 true 显示表单，否则显示图片   admin  -->
      <div class="main-panel" :class="{ 'user-mode': showAdmin, 'admin-mode': !showAdmin}"
           :style="{ width: showAdmin ? '60%' : '40%' }">
        <div v-if="showAdmin" class="form-panel">
<!--          <h2>管理员登录 请保存好密码 后期删掉</h2>-->
          <div class="form-header">
            <el-tabs v-model="activeTab" class="tabs">
              <el-tab-pane label="邮箱验证码登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="form-body">
            <el-form :model="loginForm">
              <el-form-item prop="mail">
                <div class="email-input-group">
                  <el-input v-model="loginForm.email" placeholder="请输入邮箱地址" clearable></el-input>
                  <el-button v-if="activeTab==='mail'">发送验证码</el-button>
                </div>

              </el-form-item>

              <el-form-item prop="code" v-if="activeTab === 'mail'">
                <el-input v-model="loginForm.code" clearable placeholder="请输入验证码"/>
              </el-form-item>
              <el-form-item prop="password" v-else>
                <el-input v-model="loginForm.password" type="password" show-password clearable placeholder="请输入密码"/>
              </el-form-item>
                <el-button class="form-button" type="primary" :loading="submitting" @click="submitLogin">登录</el-button>
            </el-form>
          </div>

        </div>
        <div v-else class="image-panel">
          <img :src="loginAdminImage" alt="管理员登录背景"/>
        </div>
      </div>

      <!-- 右边：如果 showAdmin 为 false 显示表单，否则显示图片  user -->
      <div class="main-panel" :class="{ 'user-mode': showAdmin, 'admin-mode': !showAdmin}"
           :style="{ width: showAdmin ? '40%' : '60%' }">
        <div v-if="!showAdmin" class="form-panel">
<!--          <h2>欢迎用户登录 后期删掉</h2>-->
          <div class="form-header">
            <el-tabs v-model="activeTab" class="tabs">
              <el-tab-pane label="邮箱验证码登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <div v-if="activeTab === 'mail'" class="form-body">
            <el-form>
              <el-form-item prop="mail">
                <div class="email-input-group">
                  <el-input placeholder="请输入邮箱地址" clearable class="email-input"/>
                  <el-button>发送验证码</el-button>
                </div>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="text" show-password clearable placeholder="请输入验证码"/>
              </el-form-item>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <div class="form-button-group">
                <el-button type="primary" @click="submitRegister" class="form-button">注册</el-button>
                <el-button type="primary" :loading="submitting" @click="submitLogin" class="form-button">登录</el-button>
              </div>
            </el-form>
          </div>

          <div v-else-if="activeTab==='password'" class="form-body">
            <el-form>
              <el-form-item prop="mail">
                <el-input placeholder="请输入邮箱地址" clearable/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="password" show-password clearable placeholder="请输入密码"/>
              </el-form-item>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <div class="form-button-group">
                <el-button type="primary" :loading="submitting" @click="submitLogin" class="form-button">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
        <div v-else class="image-panel">
          <img :src="loginUserImage" alt="用户登录背景"/>
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
  border-radius: 10px;
  overflow: hidden;
  padding: 50px;

  //这里是统一圆角的，但是都没有起作用，/* 统一 Element Plus 圆角为 10px */
  :root{
    --el-border-radius-base: 10px;
  }

  //:deep(:root) {
  //  --el-border-radius-base: 12px;     /* 修改为您想要的圆角值 */
  //  --el-border-radius-small: 6px;     /* 可同时调整小圆角 */
  //  --el-border-radius-round: 20px;    /* 大圆角（如某些按钮） */
  //}

  /* 清除 Element Plus 默认内边距 */
  :deep(.el-dialog__body) {
    padding: 0 !important;
  }

  .dialog-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    .main-panel {
      // width: 100%; 移除，因为现在动态设置

      &:first-child {
        border-right: 1px solid #ccc;
      }

      &.user-mode {
        flex-direction: row; /* 用户登录：左图片，右表单 */
      }

      &.admin-mode {
        flex-direction: row-reverse; /* 管理员登录：左表单，右图片 */
      }

      .form-panel {
        text-align: center;
        width: 100%; // 占满整个面板
        padding: 20px;
        //margin: 50px;

        h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .form-header {
          // 样式 for dialog-header，如果需要可以添加
          padding: 40px;
          text-align: center;

          .tabs {

            :deep(.el-tabs__nav) {
              border: none;
              background: transparent;
              margin: 0 auto; /* 辅助居中 */
            }

            /* 让 Tabs 内容整体居中，不占满右侧 */
            :deep(.el-tabs__nav-wrap),
            :deep(.el-tabs__nav-scroll) {
              display: flex;
              justify-content: center;
            }

            /* 每个 Tab 项样式 */
            :deep(.el-tabs__item) {
              padding: 0 32px 16px; /* 适当加大左右间距，使两个选项更均衡 */
              font-size: 18px; /* 加大字体 */
              color: #303133; /* 默认黑色 */
              background: transparent;
              border: none;
              position: relative;
              transition: color 0.3s;

              /* 两个 Tab 之间添加竖线分隔 */
              &:not(:last-child)::after {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 1px;
                height: 18px; /* 加大竖线高度 */
                background-color: #dcdfe6;
              }

              /* 选中状态：蓝色 + 加粗 */
              &.is-active {
                color: #409eff;
                font-weight: 500;
              }

              &:hover {
                color: #409eff;
              }
            }

            /* 关键：去掉蓝色的滑动横条（active-bar） */
            :deep(.el-tabs__active-bar) {
              display: none !important; /* 彻底隐藏下划线 */
            }
          }
        }

        .form-body {
          padding: 5px 40px;
          text-align: center;
          font-size: 16px; /* 加大字体 */

          /* 加大表单组件 */
          :deep(.el-form-item__label) {
            font-size: 16px;
            font-weight: 500;
          }

          :deep(.el-input__inner) {
            height: 44px;
            font-size: 16px;
            border-radius: 10px;
          }

          :deep(.el-button) {
            height: 44px;
            font-size: 16px;
            border-radius: 10px;
          }

          .email-input-group {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;

            .email-input {
              flex: 1; /* 输入框占满剩余空间 */
            }
          }

          .form-button-group {
            display: flex;
            gap: 12px;
            margin: 0 0 0;

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

          .el-button {
            // 按钮样式，如果需要
          }
        }

        .error-message {
          color: #f56c6c;
          margin: 0 0 16px;
        }

        .el-button {
          // 登录按钮样式
        }
      }

      .image-panel {
        text-align: center;
        width: 100%; // 占满整个面板
        padding: 75px;
        //margin: 20px;
        border-radius: 10px;
        //border: 1px solid #000000;

        img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      }
    }

  }


  .dialog-footer {
    //font-size: 80%;
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
