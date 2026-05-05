<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import {
  ArrowDown,
  Bell,
  Box,
  Brush,
  ChatDotRound,
  CreditCard,
  FolderOpened,
  Compass,
  Key,
  Lock,
  Message,
  Monitor,
  OfficeBuilding,
  Setting,
  Share,
  User,
  View,
} from '@element-plus/icons-vue'
import type {
  ProfileSettingsIconKey,
  ProfileSettingsNavItem,
  ProfileSettingsNavSection,
} from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: string
    sections: ProfileSettingsNavSection[]
    titleLine: string
    subtitleLine: string
    avatarUrl?: string | null
    avatarInitial?: string
  }>(),
  {
    avatarUrl: null,
    avatarInitial: '?',
  },
)

const emit = defineEmits<{
  'update:modelValue': [id: string]
}>()

const expandedIds = ref<Record<string, boolean>>({})

const iconComponents: Record<ProfileSettingsIconKey, Component> = {
  user: User,
  setting: Setting,
  brush: Brush,
  view: View,
  bell: Bell,
  creditCard: CreditCard,
  message: Message,
  lock: Lock,
  monitor: Monitor,
  key: Key,
  officeBuilding: OfficeBuilding,
  compass: Compass,
  chatWarning: ChatDotRound,
  folder: FolderOpened,
  share: Share,
  box: Box,
}

const resolveIcon = (key: ProfileSettingsIconKey): Component => iconComponents[key]

const resolvedAvatarUrl = computed(() => (props.avatarUrl ?? '').trim())

const showAvatarImage = computed(() => resolvedAvatarUrl.value.length > 0)

const isExpanded = (id: string) => !!expandedIds.value[id]

const toggleExpand = (item: ProfileSettingsNavItem) => {
  if (!item.expandable) return
  expandedIds.value = {
    ...expandedIds.value,
    [item.id]: !expandedIds.value[item.id],
  }
}

const onRowClick = (item: ProfileSettingsNavItem) => {
  if (item.disabled) return
  if (item.expandable) {
    toggleExpand(item)
    if (item.navigable === false) return
  }
  if (item.navigable === false) return
  emit('update:modelValue', item.id)
}
</script>

<template>
  <aside class="ps-sidebar" aria-label="设置导航">
    <div class="ps-sidebar__header">
      <div v-if="showAvatarImage" class="ps-sidebar__avatar ps-sidebar__avatar--img">
        <img :src="resolvedAvatarUrl" alt="" />
      </div>
      <div v-else class="ps-sidebar__avatar ps-sidebar__avatar--text" aria-hidden="true">
        {{ avatarInitial }}
      </div>
      <div class="ps-sidebar__header-text">
        <div class="ps-sidebar__title-line">{{ titleLine }}</div>
        <div class="ps-sidebar__subtitle">{{ subtitleLine }}</div>
      </div>
    </div>

    <nav class="ps-sidebar__nav">
      <template v-for="(section, sIdx) in sections" :key="sIdx">
        <div v-if="sIdx > 0" class="ps-sidebar__divider" role="presentation" />
        <p v-if="section.title" class="ps-sidebar__section-title">{{ section.title }}</p>
        <ul class="ps-sidebar__list" role="list">
          <li v-for="item in section.items" :key="item.id" class="ps-sidebar__li" role="none">
            <button
              type="button"
              class="ps-sidebar__item"
              :class="{
                'ps-sidebar__item--active': item.id === modelValue && item.navigable !== false,
                'ps-sidebar__item--disabled': item.disabled,
              }"
              :disabled="item.disabled"
              role="menuitem"
              @click="onRowClick(item)"
            >
              <span class="ps-sidebar__item-border" aria-hidden="true" />
              <el-icon class="ps-sidebar__icon" :size="16">
                <component :is="resolveIcon(item.icon)" />
              </el-icon>
              <span class="ps-sidebar__label">{{ item.label }}</span>
              <span v-if="item.badge" class="ps-sidebar__badge">{{ item.badge }}</span>
              <el-icon
                v-if="item.expandable"
                class="ps-sidebar__chevron"
                :class="{ 'ps-sidebar__chevron--open': isExpanded(item.id) }"
                :size="14"
              >
                <ArrowDown />
              </el-icon>
            </button>
          </li>
        </ul>
      </template>
    </nav>

    <div v-if="$slots.footer" class="ps-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<style scoped lang="scss">
.ps-sidebar {
  --ps-border: #d8dee4;
  --ps-muted: #656d76;
  --ps-text: #1f2328;
  --ps-active-bg: #eaeef2;
  --ps-active-bar: #0969da;
  /* 侧栏菜单项悬停：浅灰底，在白底页面上更清晰 */
  --ps-row-hover: #e8eaed;

  box-sizing: border-box;
  width: 100%;
  max-width: 320px;
  min-width: 0;
  padding: 16px 0 20px;
  background: #ffffff;
  border: 1px solid var(--ps-border);
  border-radius: 6px;
}

.ps-sidebar__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 20px;
}

.ps-sidebar__avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--ps-border);
}

.ps-sidebar__avatar--img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ps-sidebar__avatar--text {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1f7ae0 0%, #79b8ff 100%);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
}

.ps-sidebar__header-text {
  min-width: 0;
}

.ps-sidebar__title-line {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--ps-text);
  word-break: break-word;
}

.ps-sidebar__subtitle {
  margin-top: 2px;
  font-size: 0.75rem;
  line-height: 1.35;
  color: var(--ps-muted);
}

.ps-sidebar__nav {
  padding: 0 8px;
}

.ps-sidebar__divider {
  height: 1px;
  margin: 12px 8px 14px;
  background: var(--ps-border);
}

.ps-sidebar__section-title {
  margin: 0 8px 6px;
  padding: 0 8px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--ps-muted);
}

.ps-sidebar__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ps-sidebar__li {
  margin: 0;
}

.ps-sidebar__item {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 8px 12px 8px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--ps-text);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.12s ease;

  &:hover:not(:disabled) {
    background: var(--ps-row-hover);
  }
}

.ps-sidebar__item--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.ps-sidebar__item-border {
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 4px;
  border-radius: 2px;
  background: transparent;
  pointer-events: none;
}

.ps-sidebar__item--active {
  background: var(--ps-active-bg);
  font-weight: 600;

  .ps-sidebar__item-border {
    background: var(--ps-active-bar);
  }
}

.ps-sidebar__icon {
  flex-shrink: 0;
  color: var(--ps-muted);
}

.ps-sidebar__item--active .ps-sidebar__icon {
  color: var(--ps-text);
}

.ps-sidebar__label {
  flex: 1;
  min-width: 0;
}

.ps-sidebar__badge {
  flex-shrink: 0;
  padding: 1px 7px;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.35;
  color: #1a7f37;
  background: #dafbe1;
  border: 1px solid rgba(26, 127, 55, 0.2);
}

.ps-sidebar__chevron {
  flex-shrink: 0;
  color: var(--ps-muted);
  transition: transform 0.15s ease;
}

.ps-sidebar__chevron--open {
  transform: rotate(-180deg);
}

.ps-sidebar__footer {
  margin-top: 16px;
  padding: 14px 16px 0;
  border-top: 1px solid var(--ps-border);
}
</style>
