<script setup lang="ts">
/**
 * 设置类工作台布局：左侧栏 + 主内容区，与前台个人中心相同的栅格与响应式规则。
 * 主内容通过默认插槽传入；侧栏通过 `sidebar` 插槽传入（通常为 ProfileSettingsSidebar）。
 */
</script>

<template>
  <div class="settings-workspace">
    <section class="settings-workspace__shell">
      <div class="settings-workspace__sidebar">
        <slot name="sidebar" />
      </div>
      <div class="settings-workspace__main">
        <slot />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.settings-workspace {
  min-height: 100vh;
  background: #ffffff;
}

.settings-workspace__shell {
  min-height: 100%;
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: 28px 36px;
  align-items: start;
}

.settings-workspace__sidebar {
  min-width: 0;
  background: #ffffff;
}

.settings-workspace__sidebar :deep(.ps-sidebar) {
  border: none;
  border-radius: 0;
  background: #ffffff;
}

.settings-workspace__sidebar :deep(.ps-sidebar__avatar) {
  border: none;
}

.settings-workspace__sidebar :deep(.ps-sidebar__footer) {
  border-top: none;
}

.settings-workspace__main {
  min-width: 0;
  background: #ffffff;
}

@media (max-width: 1120px) {
  .settings-workspace__shell {
    grid-template-columns: minmax(0, 280px) minmax(0, 1fr);
    gap: 22px 28px;
  }
}

@media (max-width: 760px) {
  .settings-workspace__shell {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .settings-workspace {
    padding-top: calc(var(--site-header-offset) + var(--site-header-height) + var(--chat-nav-gap));
  }
}
</style>
