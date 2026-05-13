<script setup lang="ts">
import { ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'

const emit = defineEmits<{
  updatePhone: [phone: string]
  updateEmail: [email: string]
}>()

const phone = ref('')
const email = ref('')

const handleUpdatePhone = () => {
  if (phone.value.trim()) {
    emit('updatePhone', phone.value.trim())
  }
}

const handleUpdateEmail = () => {
  if (email.value.trim()) {
    emit('updateEmail', email.value.trim())
  }
}
</script>

<template>
  <ElForm class="account-settings-form" label-position="top">
    <!-- 更新手机号 -->
    <ElFormItem label="手机号" class="form-field">
      <div class="input-group">
        <ElInput v-model="phone" type="tel" placeholder="请输入新手机号" class="custom-input" />
        <ElButton type="primary" class="update-btn" @click="handleUpdatePhone">
          更新
        </ElButton>
      </div>
      <p class="field-hint">更新后将用于登录和接收通知</p>
    </ElFormItem>

    <!-- 更新邮箱 -->
    <ElFormItem label="邮箱" class="form-field">
      <div class="input-group">
        <ElInput v-model="email" type="email" placeholder="请输入新邮箱" class="custom-input" />
        <ElButton type="primary" class="update-btn" @click="handleUpdateEmail">
          更新
        </ElButton>
      </div>
      <p class="field-hint">更新后将用于登录和接收通知邮件</p>
    </ElFormItem>

    <!-- 更新密码 -->
    <ElFormItem label="密码" class="form-field">
      <div class="input-group">
        <ElInput v-model="email" type="email" placeholder="请输入新密码" class="custom-input" />
        <ElButton type="primary" class="update-btn" @click="handleUpdateEmail">
          更新
        </ElButton>
      </div>
      <p class="field-hint">更新后将用于登录，</p>
    </ElFormItem>
  </ElForm>
</template>

<style scoped lang="scss">
.account-settings-form {
  :deep(.el-form-item) {
    margin-bottom: 24px;
  }

  :deep(.el-form-item__label) {
    font-size: 14px;
    font-weight: 500;
    color: #171717;
    padding-bottom: 8px;
    line-height: 20px;
  }
}

/* 输入框 + 按钮组合 */
.input-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.custom-input {
  flex: 1;
  --el-input-bg-color: #ffffff;
  --el-input-border-color: #ebebeb;
  --el-input-border-radius: 6px;
  --el-input-height: 40px;

  &:focus {
    --el-input-border-color: #171717;
    box-shadow: 0 0 0 3px rgba(23, 23, 23, 0.1);
  }
}

.update-btn {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  white-space: nowrap;
  background-color: #171717;
  border-color: #171717;
  border-radius: 100px;

  &:hover {
    background-color: #171717;
    border-color: #171717;
    opacity: 0.9;
  }
}

.field-hint {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #888888;
  line-height: 16px;
}

/* 整体表单间距 */
.account-settings-form {
  padding: 0;
}
</style>