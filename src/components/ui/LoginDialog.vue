<script setup>
import {ref, computed, reactive} from 'vue'
import {useRouter} from 'vue-router'
import {login} from '@/utils/auth.js'
import loginImage from '../../assets/front/banner.jpg'

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
      :show-close="true"
      @close="closeDialog"
  >
    <div class="dialog-content">
      <!-- 左边：如果 showAdmin 为 true 显示表单，否则显示图片 -->
      <div class="left-panel">
        <div v-if="showAdmin" class="form-panel">
          <h3>管理员登录 后期删掉</h3>
          <div class="dialog-header">
            <el-tabs v-model="activeTab" type="card">
              <el-tab-pane label="邮箱验证码登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <el-form :model="loginForm" label-position="left">
            <el-form-item label="邮箱地址" prop="mail">
              <el-input v-model="loginForm.email" placeholder="请输入邮箱地址" clearable/>
              <el-button v-if="activeTab==='mail'">发送验证码</el-button>
            </el-form-item>

            <el-form-item label="验证码" prop="code" v-if="activeTab === 'mail'">
              <el-input v-model="loginForm.code" clearable placeholder="请输入验证码"/>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-else>
              <el-input v-model="loginForm.password" type="password" show-password clearable placeholder="请输入密码"/>
            </el-form-item>

            <el-button type="primary" :loading="submitting" @click="submitLogin">登录</el-button>
          </el-form>
          <div>
            切换为
            <el-button link type="primary" @click="toggleMode">{{ showAdmin ? '用户' : '管理员' }}</el-button>
            登录
          </div>
        </div>
        <div v-else class="image-panel">
          <img :src="loginImage" alt="登录背景"/>
        </div>
      </div>

      <!-- 右边：如果 showAdmin 为 false 显示表单，否则显示图片 -->
      <div class="right-panel">
        <div v-if="!showAdmin" class="form-panel">
          <h3>用户登录  后期删掉</h3>
          <div class="dialog-header">
            <el-tabs v-model="activeTab" type="card">
              <el-tab-pane label="邮箱验证码登录" name="mail"></el-tab-pane>
              <el-tab-pane label="密码登录" name="password"></el-tab-pane>
            </el-tabs>
          </div>

          <div v-if="activeTab === 'mail'" class="form-panel">
            <el-form>
              <el-form-item prop="mail">
                <el-input placeholder="请输入邮箱地址" clearable/>
                <el-button >发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="password" show-password clearable placeholder="请输入验证码"/>
              </el-form-item>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <el-button type="primary" @click="submitRegister">注册</el-button>
              <el-button type="primary" :loading="submitting" @click="submitLogin">登录</el-button>
            </el-form>
          </div>

          <div v-else-if="activeTab==='password'" class="form-panel">
            <el-form>
              <el-form-item prop="mail">
                <el-input placeholder="请输入邮箱地址" clearable/>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="password" type="password" show-password clearable placeholder="请输入密码"/>
              </el-form-item>

              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
              <el-button type="primary" :loading="submitting" @click="submitLogin">登录</el-button>
            </el-form>
          </div>
          <div>
            切换为
<!--            <span >切换为</span>-->
<!--            <span slot="footer" class="dialog-footer">切换为</span>-->
            <el-button link type="primary" @click="toggleMode">{{ showAdmin ? '用户' : '管理员' }}</el-button>
            登录
          </div>


        </div>
        <div v-else class="image-panel">
          <img :src="loginImage" alt="登录背景"/>
        </div>
      </div>
    </div>

    <!-- 切换按钮 -->
<!--    <div class="toggle-button">-->
<!--      <el-button @click="toggleMode">-->
<!--        切换到{{ showAdmin ? '用户' : '管理员' }}登录-->
<!--      </el-button>-->
<!--    </div>-->
  </el-dialog>
</template>

<style scoped lang="scss">
.dialog-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-panel,
.right-panel {
  width: 50%;
  padding: 20px;
}

.form-panel {
  text-align: center;

  h3 {
    margin-bottom: 20px;
    color: #333;
  }

  .el-form-item {
    margin-bottom: 16px;
  }

  .el-input {
    width: 100%;
  }

  .error-message {
    color: #f56c6c;
    margin: 0 0 16px;
  }
}

.image-panel {
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
  }
}

.toggle-button {
  text-align: center;
  margin-top: 20px;
}
</style>
