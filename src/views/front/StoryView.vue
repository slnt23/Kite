<script setup>
import SideImageLeft from '../../assets/front/pic04.jpg'
import SideImageRight from '../../assets/front/pic05.jpg'
import SectionIntro from '../../components/site/SectionIntro.vue'
import StoryTimeline from '../../components/site/StoryTimeline.vue'

const timeline = [
  {
    year: '01',
    title: '从模板分析开始',
    description: '先拆出模板中的首页结构、内页结构和资源，确认哪些部分适合延用，哪些部分应当彻底改写。',
  },
  {
    year: '02',
    title: '转成 Vue3 页面体系',
    description: '把原本的静态 HTML 转成布局、页面和组件三层，后续新增页面时不再需要复制整块 HTML。',
  },
  {
    year: '03',
    title: '形成你自己的内容叙事',
    description: '将模板文案替换为你的品牌表达、项目方向和长期愿景，让网站开始真正服务于你自己。',
  },
]
</script>

<template>
  <div class="front-page front-page--article">
    <section class="article-hero">
      <p>Brand Story</p>
      <h1>一个成熟的前台，不只是漂亮，而是能承载你未来的方向。</h1>
      <p class="article-hero__body">
        品牌故事页延续了模板里的通用内页结构，但内容上切换成更适合个人网站的表达方式，用来解释你在做什么、为什么做、未来会走向哪里。
      </p>
    </section>

    <section class="content-section content-section--narrow">
      <SectionIntro
        eyebrow="Narrative"
        title="从静态展示页，转成带方向感的个人站点。"
        description="这里适合承载你的经历、设计观、技术取向以及你为什么要做这个网站。它不是一段简历，而是一段更有温度的长期叙事。"
      />

      <StoryTimeline :items="timeline" />
    </section>

    <section class="story-columns">
      <article class="story-columns__panel">
        <img :src="SideImageLeft" alt="creative workspace" />
        <div>
          <h2>表达层</h2>
          <p>
            前台项目首先要建立足够清晰的视觉记忆点，所以我们将主色收口到蓝色体系，再用轻微暖色去平衡内容与互动区域的冷感。
          </p>
        </div>
      </article>

      <article class="story-columns__panel">
        <img :src="SideImageRight" alt="product planning" />
        <div>
          <h2>增长层</h2>
          <p>
            网站后续还会增加更多兴趣模块，所以页面结构必须天然支持扩展，品牌故事页也会成为理解整站方向的重要入口。
          </p>
        </div>
      </article>
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

.article-hero__body {
  margin: 0;
  color: var(--color-text-soft);
}

.content-section {
  display: grid;
  gap: 20px;
}

.content-section--narrow {
  max-width: 860px;
}

.story-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.story-columns__panel {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  background: linear-gradient(180deg, rgba(8, 37, 76, 0.72), rgba(7, 28, 60, 0.86));
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(18px);
}

.story-columns__panel img {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.story-columns__panel div {
  padding: 28px;
}

.story-columns__panel h2 {
  margin: 0 0 12px;
  color: var(--color-text);
}

.story-columns__panel p {
  margin: 0;
  color: var(--color-text-soft);
}

@media (max-width: 960px) {
  .story-columns {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .article-hero,
  .story-columns__panel div {
    padding: 20px;
  }
}
</style>
