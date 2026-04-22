<template>
  <footer class="site-footer glass-panel">
    <div class="site-footer__inner">
      <div>
        <p class="site-footer__eyebrow eyebrow-label">Kite Studio</p>
        <h3>Adventure is worthwhile.</h3>
      </div>

      <div class="site-footer__links">
        <a href="mailto:hello@kitestudio.dev">hello@kitestudio.dev</a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance</a>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
/* 共用主题变量与可复用样式见 src/style/index.scss：glass-panel */
.site-footer {
  margin-top: 28px;
  padding: 28px;
  border-radius: 30px;
}

.site-footer h3 {
  margin: 0;
  color: var(--color-text-deep);
}

.site-footer__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.site-footer__links {
  display: grid;
  gap: 8px;
}

.site-footer__links a {
  color: var(--color-muted-deep);
}

@media (max-width: 760px) {
  .site-footer {
    padding: 20px;
  }

  .site-footer__inner {
    flex-direction: column;
  }
}
</style>
