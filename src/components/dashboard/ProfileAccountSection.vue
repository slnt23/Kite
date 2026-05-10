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
    color: #1f2328;
    padding-bottom: 6px;
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
  --el-input-bg-color: #f6f8fa;
  --el-input-border-color: #d0d7de;
  --el-input-border-radius: 6px;
  --el-input-height: 40px;

  &:focus {
    --el-input-border-color: #0969da;
    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15);
  }
}

.update-btn {
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  white-space: nowrap;
  background-color: #1a7f37;
  border-color: #1a7f37;

  &:hover {
    background-color: #116329;
    border-color: #116329;
  }
}

.field-hint {
  margin: 6px 0 0 0;
  font-size: 13px;
  color: #656d76;
  line-height: 1.5;
}

/* 整体表单间距 */
.account-settings-form {
  padding: 0;
}
</style>