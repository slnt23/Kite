<script setup lang="ts">
import { computed } from 'vue'

interface SpotlightItem {
  eyebrow?: string
  title: string
  description?: string
  image: string
}

const props = withDefaults(
  defineProps<{
    items?: SpotlightItem[]
  }>(),
  {
    items: () => [],
  },
)

const normalizedItems = computed(() =>
  props.items.map((item) => ({
    ...item,
    meta: item.eyebrow
      ? item.eyebrow
          .split(/[|/•,，]+/)
          .map((part) => part.trim())
          .filter(Boolean)
      : [],
  })),
)
</script>

<template>
  <section class="spotlight-list">
    <article v-for="item in normalizedItems" :key="item.title" class="spotlight-card">
      <div class="spotlight-card__media">
        <img class="spotlight-card__image" :src="item.image" :alt="item.title" />
      </div>

      <div class="spotlight-card__body">
        <p v-if="item.meta.length" class="spotlight-card__meta">
          {{ item.meta.join(' • ') }}
        </p>

        <h3 class="spotlight-card__title">
          <span class="spotlight-card__arrow">→</span>
          <span>{{ item.title }}</span>
        </h3>

        <p v-if="item.description" class="spotlight-card__description">
          {{ item.description }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.spotlight-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 36px 38px;
}

.spotlight-card {
  display: grid;
  gap: 18px;
}

.spotlight-card__media {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  background: #e9ebf8;
}

.spotlight-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 1.44;
  object-fit: cover;
  transition:
    transform 320ms ease,
    filter 320ms ease;
}

.spotlight-card:hover .spotlight-card__image {
  transform: scale(1.02);
  filter: saturate(1.03);
}

.spotlight-card__body {
  display: grid;
  gap: 8px;
}

.spotlight-card__meta {
  margin: 0;
  color: #232632;
  font-size: 0.96rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.spotlight-card__title {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  margin: 0;
  color: #06070d;
  font-size: clamp(2.1rem, 3.4vw, 4.2rem);
  line-height: 0.95;
  font-weight: 400;
  letter-spacing: -0.05em;
}

.spotlight-card__arrow {
  flex: none;
  transform: translateY(-0.06em);
  font-size: 0.95em;
  line-height: 1;
}

.spotlight-card__description {
  max-width: 52ch;
  margin: 2px 0 0;
  color: rgba(35, 38, 50, 0.68);
  font-size: 0.98rem;
  line-height: 1.65;
}

@media (max-width: 1100px) {
  .spotlight-list {
    gap: 28px 24px;
  }

  .spotlight-card__media {
    border-radius: 24px;
  }

  .spotlight-card__title {
    gap: 14px;
    font-size: clamp(1.8rem, 4vw, 3rem);
  }
}

@media (max-width: 760px) {
  .spotlight-list {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .spotlight-card {
    gap: 14px;
  }

  .spotlight-card__media {
    border-radius: 20px;
  }

  .spotlight-card__meta {
    font-size: 0.84rem;
  }

  .spotlight-card__title {
    gap: 12px;
    font-size: clamp(1.7rem, 8vw, 2.5rem);
  }

  .spotlight-card__description {
    font-size: 0.92rem;
  }
}
</style>
