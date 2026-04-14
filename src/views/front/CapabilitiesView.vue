<script setup>
import CapabilityTable from '../../components/site/CapabilityTable.vue'
import FeatureGrid from '../../components/site/FeatureGrid.vue'
import SectionIntro from '../../components/site/SectionIntro.vue'

const featureItems = [
  {
    icon: 'A',
    title: '前台官网设计',
    description: '围绕个人品牌、内容表达、项目展示去构建首页与内页体验。',
  },
  {
    icon: 'B',
    title: '模块扩展规划',
    description: '为博客、作品集、实验室、资源导航等方向预留结构与入口。',
  },
  {
    icon: 'C',
    title: '工程结构整理',
    description: '按 views、layouts、components、router、api 的职责明确组织代码。',
  },
  {
    icon: 'D',
    title: '后续后台衔接',
    description: '当前先做前台，但整体命名和目录已经为后台管理预留了空间。',
  },
]

const capabilityRows = [
  {
    name: '首页展示',
    scope: '品牌视觉、首屏叙事、项目入口、核心定位',
    stage: '已完成首版',
  },
  {
    name: '内容内页',
    scope: '品牌故事、能力说明、后续博客/项目详情模板',
    stage: '已建立基础结构',
  },
  {
    name: '工程支撑',
    scope: 'Vue Router 路由、组件分层、前台布局、资源迁移',
    stage: '已完成',
  },
  {
    name: '后续接入',
    scope: 'Axios 接口层、真实数据、后台管理、内容发布',
    stage: '下一阶段',
  },
]
</script>

<template>
  <div class="front-page front-page--article">
    <section class="article-hero article-hero--compact">
      <p>Capabilities</p>
      <h1>把模板改造成一个可继续长大的前台项目。</h1>
      <p class="article-hero__body">
        服务能力页用来沉淀你当前这套前台项目能承载哪些内容、适合怎么继续扩展，也能作为后面接入真实内容系统前的说明页。
      </p>
    </section>

    <section class="content-section">
      <SectionIntro
        eyebrow="Feature Set"
        title="现阶段已经具备的前台能力"
        description="这些能力是从模板中提炼出来，再结合你自己的项目结构重构后的第一版基础。"
      />

      <FeatureGrid :items="featureItems" />
    </section>

    <section class="content-section">
      <SectionIntro
        eyebrow="Capability Map"
        title="后续功能怎么接，也已经提前留好了接口。"
        description="现在还没有接入真实后台和接口，但目录、路由和内容模块的分工已经明确，继续往下做会很顺。"
      />

      <CapabilityTable :rows="capabilityRows" />
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
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.38), rgba(184, 226, 247, 0.16)),
    rgba(120, 183, 215, 0.12);
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

@media (max-width: 760px) {
  .article-hero {
    padding: 20px;
  }
}
</style>
