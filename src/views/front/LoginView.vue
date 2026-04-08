<template>
  <div class="front-page front-page--article">
    <section class="article-hero article-hero--compact">
      <p>Login</p>
      <h1>登录入口已预留，后续可以直接接入后台或账号系统。</h1>
      <p class="article-hero__body">
        目前这是一个前台占位页，按钮和路由已经准备好。后面如果你接入鉴权、管理员后台或会员系统，可以直接在这里延展成正式登录流程。
      </p>
    </section>

    <section class="content-section content-section--narrow">
      <div class="capability-block">
        <div class="capability-block__row capability-block__row--head">
          <span>阶段</span>
          <span>当前状态</span>
          <span>后续方向</span>
        </div>
        <div class="capability-block__row">
          <strong>当前</strong>
          <span>已完成登录按钮、路由入口与页面占位</span>
          <span>可接后台管理或账号体系</span>
        </div>
        <div class="capability-block__row">
          <strong>下一步</strong>
          <span>接入 Axios、鉴权接口、表单验证</span>
          <span>对接管理端与角色权限</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.front-page {
  display: grid;
  gap: 28px;
}

.article-hero {
  margin-top: 110px;
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(8, 37, 76, 0.72), rgba(7, 28, 60, 0.86));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

.article-hero > p:first-child {
  margin: 0 0 14px;
  color: rgba(245, 251, 255, 0.86);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.article-hero h1 {
  margin: 0 0 14px;
  color: var(--color-text);
  line-height: 1.08;
  font-size: clamp(2.1rem, 4vw, 3.5rem);
}

.article-hero__body,
.capability-block span {
  color: var(--color-text-soft);
}

.content-section {
  display: grid;
  gap: 20px;
}

.content-section--narrow {
  max-width: 860px;
}

.capability-block {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(8, 37, 76, 0.72), rgba(7, 28, 60, 0.86));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

.capability-block__row {
  display: grid;
  grid-template-columns: minmax(140px, 0.8fr) minmax(0, 1.4fr) minmax(120px, 0.7fr);
  gap: 18px;
  padding: 18px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}

.capability-block__row--head {
  border-top: 0;
  color: rgba(245, 251, 255, 0.9);
  font-weight: 700;
}

.capability-block strong {
  color: var(--color-text);
}

@media (max-width: 960px) {
  .capability-block__row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .article-hero {
    padding: 20px;
  }
}
</style>
