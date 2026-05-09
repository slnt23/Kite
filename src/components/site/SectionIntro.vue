<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header class="section-intro">
    <div class="section-intro__eyebrow">
      <span class="section-intro__line" />
      <p class="eyebrow-label">
        {{ eyebrow }}
      </p>
    </div>

    <h2 class="section-intro__title">
      {{ title }}
    </h2>

    <p class="section-intro__body">
      {{ description }}
    </p>
  </header>
</template>

<style scoped lang="scss">
.section-intro {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: min(720px, 100%);
  margin: 0 auto;

  text-align: center;

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;

    .section-intro__line {
      width: 28px;
      height: 1px;
      background: var(--color-border);
      opacity: 0.7;
    }

    .eyebrow-label {
      margin: 0;
      color: var(--color-muted);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      opacity: 0.88;
    }
  }

  &__title {
    margin: 0;
    color: var(--color-text-deep);
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 700; // 建议改为 700，更标准
    line-height: 1;
    letter-spacing: -0.055em;
  }

  &__body {
    margin: 18px 0 0;
    max-width: 460px;
    color: var(--color-muted-deep);
    font-size: 0.98rem;
    line-height: 1.8;
  }

  /* ==================== 响应式 ==================== */
  @media (max-width: 768px) {
    margin-bottom: 36px;

    &__title {
      font-size: 2.4rem;
    }

    &__body {
      max-width: 92%;
      line-height: 1.7;
    }
  }
}
</style>