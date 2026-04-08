<template>
  <footer class="site-footer glass-panel">
    <div class="site-footer__inner">
      <div>
        <p class="site-footer__eyebrow">Kite Studio</p>
        <h3>让个人网站既有表达力，也能持续进化。</h3>
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
/* 共用主题变量与可复用样式见 src/style.scss：glass-panel */
.site-footer {
  margin-top: 28px;
  padding: 28px;
  border-radius: 30px;
}

.site-footer__eyebrow {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.site-footer h3 {
  margin: 0;
  color: var(--color-text);
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
  color: var(--color-text-soft);
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
