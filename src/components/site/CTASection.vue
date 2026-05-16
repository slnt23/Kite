<script setup lang="ts">
import type { MenuItem } from '@/types'

withDefaults(
  defineProps<{
    items?: MenuItem[]
  }>(),
  {
    items: () => [],
  },
)
</script>

<template>
  <section class="cta-section">
    <div class="cta-grid">
      <a
        v-for="item in items"
        :key="item.title"
        class="cta-card"
        :class="{ 'cta-card--large': item.size === 'large', 'cta-card--small': item.size === 'small' }"
        :href="item.path"
      >
        <div class="cta-card__bg">
          <img :src="item.image" :alt="item.title" />
          <div class="cta-card__overlay" />
        </div>

        <div class="cta-card__body">
          <h3 class="cta-card__title">{{ item.title }}</h3>
          <p class="cta-card__subtitle">{{ item.subtitle }}</p>
        </div>

        <span class="cta-card__arrow">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
$runway-black: #000000;
$border-dark: #27272a;
$pure-white: #ffffff;
$cool-slate: #767d88;

.cta-section {
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 72px 0 80px;
  background: $runway-black;
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 18px;
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 40px;
}

.cta-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 240px;
  padding: 28px 30px;
  border-radius: 18px;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  isolation: isolate;
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);

    .cta-card__bg img {
      transform: scale(1.06);
    }

    .cta-card__overlay {
      opacity: 0.75;
    }

    .cta-card__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &--large {
    min-height: 300px;
  }

  &--small {
    min-height: 200px;
  }
}

.cta-card__bg {
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s ease;
  }
}

.cta-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent 52%);
  transition: opacity 0.35s ease;
}

.cta-card__body {
  position: relative;
  z-index: 1;
}

.cta-card__title {
  margin: 0 0 6px;
  color: $pure-white;
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.cta-card__subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1.35;
}

.cta-card__arrow {
  position: absolute;
  right: 26px;
  bottom: 26px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  color: $pure-white;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s ease;
}

@media (max-width: 760px) {
  .cta-section {
    padding: 48px 0 56px;
  }

  .cta-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 0 20px;
  }

  .cta-card {
    min-height: 180px;
    padding: 22px 20px;
    border-radius: 14px;

    &--large {
      min-height: 220px;
    }

    &--small {
      min-height: 160px;
    }
  }

  .cta-card__title {
    font-size: 1.2rem;
  }

  .cta-card__arrow {
    right: 20px;
    bottom: 20px;
  }
}
</style>
