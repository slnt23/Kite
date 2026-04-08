<script setup>
import ModuleGrid from '../components/ModuleGrid.vue'
import OverviewPanel from '../components/OverviewPanel.vue'

defineProps({
  meta: {
    type: Object,
    required: true,
  },
  modules: {
    type: Array,
    required: true,
  },
  groups: {
    type: Array,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
})

const adminRoadmap = [
  '总览面板：访问趋势、内容数量、模块状态',
  '内容管理：文章、项目、媒体资源、标签分类',
  '系统管理：站点配置、权限角色、模块开关、日志记录',
]
</script>

<template>
  <section class="portal-layout">
    <OverviewPanel
      title="后台定位"
      description="后台先做成一个统一管理中枢，后续你接入接口后，可以继续分离权限、菜单、数据看板和具体业务表单。"
      :stats="[
        { label: '当前模块', value: stats.admin },
        { label: '建设中', value: stats.status.building },
        { label: '总模块数', value: stats.total },
      ]"
      :items="adminRoadmap"
    />

    <ModuleGrid
      heading="后台模块分组"
      subheading="后台模块建议围绕运营流程来划分，而不是围绕页面临时堆叠。"
      :groups="groups"
      :modules="modules"
    />
  </section>
</template>
