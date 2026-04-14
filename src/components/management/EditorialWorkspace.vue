<script setup>
import { computed } from 'vue'

const props = defineProps({
  brand: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  heroImage: {
    type: String,
    required: true,
  },
  sidebarTitle: {
    type: String,
    required: true,
  },
  sidebarIntro: {
    type: String,
    required: true,
  },
  quickLinks: {
    type: Array,
    default: () => [],
  },
  featureItems: {
    type: Array,
    default: () => [],
  },
  postItems: {
    type: Array,
    default: () => [],
  },
  contactItems: {
    type: Array,
    default: () => [],
  },
  actionLabel: {
    type: String,
    default: '',
  },
  logoutLabel: {
    type: String,
    default: '退出登录',
  },
})

const hasPrimaryAction = computed(() => Boolean(props.actionLabel))
const emit = defineEmits(['action', 'logout'])
</script>

<template>
  <div class="editorial-shell">
    <div class="editorial-shell__main">
      <header class="editorial-header">
        <div>
          <p>{{ brand }}</p>
          <h1>{{ title }}</h1>
        </div>

        <div class="editorial-header__actions">
          <button v-if="hasPrimaryAction" class="editorial-button" type="button" @click="emit('action')">
            {{ actionLabel }}
          </button>
          <button class="editorial-button editorial-button--ghost" type="button" @click="emit('logout')">
            {{ logoutLabel }}
          </button>
        </div>
      </header>

      <section class="editorial-banner glass-panel">
        <div class="editorial-banner__copy">
          <p class="eyebrow-label">Workspace</p>
          <h2>{{ subtitle }}</h2>
          <p>{{ description }}</p>
        </div>
        <div class="editorial-banner__image-wrap">
          <img :src="heroImage" :alt="title" />
        </div>
      </section>

      <section class="editorial-section">
        <header class="editorial-section__header">
          <h3>功能占位</h3>
        </header>

        <div class="editorial-features">
          <article v-for="item in featureItems" :key="item.title" class="editorial-feature glass-panel">
            <span>{{ item.icon }}</span>
            <div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="editorial-section">
        <header class="editorial-section__header">
          <h3>模块内容占位</h3>
        </header>

        <div class="editorial-posts">
          <article v-for="item in postItems" :key="item.title" class="editorial-post glass-panel">
            <img :src="item.image" :alt="item.title" />
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <button class="editorial-button editorial-button--small" type="button">{{ item.cta }}</button>
          </article>
        </div>
      </section>
    </div>

    <aside class="editorial-sidebar glass-panel">
      <section class="editorial-sidebar__section">
        <p class="eyebrow-label">Menu</p>
        <h3>{{ sidebarTitle }}</h3>
        <p class="editorial-sidebar__intro">{{ sidebarIntro }}</p>
      </section>

      <nav class="editorial-sidebar__section">
        <ul class="editorial-links">
          <li v-for="item in quickLinks" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </li>
        </ul>
      </nav>

      <section class="editorial-sidebar__section">
        <h3>联系与说明</h3>
        <ul class="editorial-contact">
          <li v-for="item in contactItems" :key="item.label">
            <strong>{{ item.label }}</strong>
            <span>{{ item.value }}</span>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<style scoped lang="scss">
.editorial-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.34fr);
  gap: 18px;
}

.editorial-shell__main {
  display: grid;
  gap: 18px;
}

.editorial-header,
.editorial-banner,
.editorial-feature,
.editorial-post,
.editorial-sidebar {
  border-radius: 28px;
}

.editorial-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 12px 6px 0;
}

.editorial-header p,
.editorial-section__header h3,
.editorial-sidebar h3,
.editorial-post p,
.editorial-feature p,
.editorial-sidebar__intro,
.editorial-links span,
.editorial-contact span {
  color: var(--color-muted-deep);
}

.editorial-header h1,
.editorial-banner h2,
.editorial-feature h4,
.editorial-post h4,
.editorial-sidebar strong,
.editorial-contact strong {
  margin: 0;
  color: var(--color-text-deep);
}

.editorial-header p {
  margin: 0 0 8px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.editorial-header__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.editorial-button {
  min-width: 126px;
  padding: 12px 18px;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(178, 214, 233, 0.78));
  color: var(--color-text-deep);
  font-weight: 700;
}

.editorial-button--ghost {
  background: rgba(255, 255, 255, 0.28);
}

.editorial-button--small {
  min-width: 92px;
  margin-top: auto;
  padding: 10px 14px;
}

.editorial-banner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 0.54fr);
  gap: 18px;
  padding: 24px;
}

.editorial-banner__copy {
  align-self: center;
}

.editorial-banner__copy h2 {
  margin-bottom: 12px;
}

.editorial-banner__copy p:last-child {
  margin: 0;
  color: var(--color-muted-deep);
}

.editorial-banner__image-wrap {
  overflow: hidden;
  border-radius: 24px;
}

.editorial-banner__image-wrap img {
  width: 100%;
  height: 100%;
  min-height: 260px;
  object-fit: cover;
}

.editorial-section {
  display: grid;
  gap: 14px;
}

.editorial-section__header {
  padding: 0 6px;
}

.editorial-features {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.editorial-feature {
  display: flex;
  gap: 16px;
  padding: 22px;
}

.editorial-feature span {
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.44);
  color: var(--color-text-deep);
  font-weight: 800;
}

.editorial-feature h4,
.editorial-post h4 {
  margin-bottom: 10px;
}

.editorial-feature p,
.editorial-post p {
  margin: 0;
}

.editorial-posts {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.editorial-post {
  display: grid;
  gap: 14px;
  padding: 18px;
}

.editorial-post img {
  width: 100%;
  height: 150px;
  border-radius: 18px;
  object-fit: cover;
}

.editorial-sidebar {
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 24px 20px;
}

.editorial-sidebar__section {
  display: grid;
  gap: 12px;
}

.editorial-links,
.editorial-contact {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.editorial-links li,
.editorial-contact li {
  display: grid;
  gap: 6px;
  padding: 14px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.32);
}

.editorial-links li:first-child,
.editorial-contact li:first-child {
  border-top: 0;
  padding-top: 0;
}

@media (max-width: 1100px) {
  .editorial-shell,
  .editorial-banner,
  .editorial-posts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .editorial-features {
    grid-template-columns: 1fr;
  }

  .editorial-header {
    flex-direction: column;
    padding-top: 0;
  }

  .editorial-header__actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
