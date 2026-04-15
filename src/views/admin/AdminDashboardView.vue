<!--<script setup>-->
<!--import { computed, onBeforeUnmount, onMounted, ref } from 'vue'-->
<!--import { useRouter } from 'vue-router'-->
<!--import EditorialWorkspace from '../../components/management/EditorialWorkspace.vue'-->
<!--import heroImage from '../../assets/admin/editorial-hero-02.jpg'-->
<!--import cardImageOne from '../../assets/admin/editorial-card-01.jpg'-->
<!--import cardImageTwo from '../../assets/admin/editorial-card-02.jpg'-->
<!--import cardImageThree from '../../assets/admin/editorial-card-03.jpg'-->
<!--import { getCurrentUser, logout, onAuthChange } from '../../utils/auth.js'-->

<!--const router = useRouter()-->
<!--const currentUser = ref(getCurrentUser())-->
<!--let removeAuthListener = () => {}-->

<!--const dashboardTitle = computed(() => `${currentUser.value?.displayName || '管理员'}后台管理`)-->

<!--const quickLinks = [-->
<!--  { title: '控制台总览', description: '这里可接访问统计、模块状态和待办提醒。' },-->
<!--  { title: '内容管理', description: '占位承接文章、价格数据、AI 预设和资源配置。' },-->
<!--  { title: '系统设置', description: '后续可接权限角色、菜单开关和日志记录。' },-->
<!--]-->

<!--const featureItems = [-->
<!--  { icon: 'A1', title: '数据看板', description: '编辑部风格主区块改造成后台概览看板。' },-->
<!--  { icon: 'A2', title: '菜单管理', description: '预留给后台菜单、入口排序和模块开关管理。' },-->
<!--  { icon: 'A3', title: '用户与权限', description: '后续可接角色、权限组和登录审计能力。' },-->
<!--  { icon: 'A4', title: '运营内容', description: '占位给文章、图片、报价内容和配置项管理。' },-->
<!--]-->

<!--const postItems = [-->
<!--  { image: cardImageOne, title: '内容发布', description: '这里先占位内容编辑与发布流程。', cta: '进入' },-->
<!--  { image: cardImageTwo, title: '数据维护', description: '这里先占位价格维护、导入与校验。', cta: '进入' },-->
<!--  { image: cardImageThree, title: '系统日志', description: '这里先占位后台操作日志与告警中心。', cta: '进入' },-->
<!--]-->

<!--&lt;!&ndash;const contactItems = computed(() => [&ndash;&gt;-->
<!--&lt;!&ndash;  { label: '当前角色', value: currentUser.value?.roleLabel || '未登录' },&ndash;&gt;-->
<!--&lt;!&ndash;  { label: '管理模式', value: '管理员后台界面已独立于前台导航显示。' },&ndash;&gt;-->
<!--&lt;!&ndash;  { label: '退出方式', value: '右上角保留退出登录按钮，便于从后台直接返回登录页。' },&ndash;&gt;-->
<!--&lt;!&ndash;])&ndash;&gt;-->

<!--&lt;!&ndash;const handleLogout = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  logout()&ndash;&gt;-->
<!--&lt;!&ndash;  router.push('/login')&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;onMounted(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  removeAuthListener = onAuthChange((user) => {&ndash;&gt;-->
<!--&lt;!&ndash;    currentUser.value = user&ndash;&gt;-->
<!--&lt;!&ndash;  })&ndash;&gt;-->
<!--&lt;!&ndash;})&ndash;&gt;-->

<!--&lt;!&ndash;onBeforeUnmount(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  removeAuthListener()&ndash;&gt;-->
<!--&lt;!&ndash;})&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--<template>-->
<!--  <EditorialWorkspace-->
<!--    brand="Admin Console"-->
<!--    :title="dashboardTitle"-->
<!--    subtitle="后台管理员管理界面"-->
<!--    description="管理员登录后会进入独立后台。这个页面参考 html5up-editorial 模板重组为侧边栏管理台，前台导航在这里会被隐藏。"-->
<!--    :hero-image="heroImage"-->
<!--    sidebar-title="后台菜单"-->
<!--    sidebar-intro="菜单、搜索、通知、日志与系统信息都可以继续接进这条侧栏。当前先按模板节奏做占位结构。"-->
<!--    :quick-links="quickLinks"-->
<!--    :feature-items="featureItems"-->
<!--    :post-items="postItems"-->
<!--    :contact-items="contactItems"-->
<!--    logout-label="退出登录"-->
<!--    @logout="handleLogout"-->
<!--  />-->
<!--</template>-->
<template></template>