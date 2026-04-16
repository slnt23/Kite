<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import EditorialWorkspace from '../../../components/management/EditorialWorkspace.vue'
import heroImage from '../../../assets/admin/editorial-hero-01.jpg'
import cardImageOne from '../../../assets/admin/editorial-card-01.jpg'
import cardImageTwo from '../../../assets/admin/editorial-card-02.jpg'
import cardImageThree from '../../../assets/admin/editorial-card-03.jpg'
import { getCurrentUser, logout, onAuthChange } from '@/utils/auth.js'

const router = useRouter()
const currentUser = ref(getCurrentUser())
let removeAuthListener = () => {}

const profileTitle = computed(() => currentUser.value?.displayName || '个人管理')

const quickLinks = computed(() => [
  { title: '账号信息', description: `当前身份：${currentUser.value?.roleLabel || '未登录'}` },
  { title: '登录方式', description: currentUser.value?.loginModeLabel || '未记录' },
  { title: '前台入口', description: '这里保留前台导航，方便继续浏览价格查询和 AI 聊天。' },
])

const featureItems = [
  { icon: '01', title: '资料中心', description: '后续可扩展为头像、昵称、手机号和偏好设置。' },
  { icon: '02', title: '消息通知', description: '这里先占位展示，后续可以接系统消息和价格提醒。' },
  { icon: '03', title: '我的收藏', description: '预留给价格收藏、AI 会话记录和自定义快捷入口。' },
  { icon: '04', title: '安全设置', description: '后续可接修改密码、绑定邮箱和登录设备管理。' },
]

const postItems = [
  { image: cardImageOne, title: '资料编辑', description: '个人资料与偏好配置的占位模块。', cta: '查看' },
  { image: cardImageTwo, title: '操作记录', description: '展示最近登录、查询和收藏记录的占位模块。', cta: '查看' },
  { image: cardImageThree, title: '服务订阅', description: '预留给价格提醒、日报和 AI 助手订阅。', cta: '查看' },
]

const contactItems = computed(() => [
  { label: '当前用户', value: currentUser.value?.displayName || '未登录' },
  { label: '登录时间', value: currentUser.value?.loginAt ? new Date(currentUser.value.loginAt).toLocaleString('zh-CN', { hour12: false }) : '未记录' },
  { label: '说明', value: '前台个人管理界面使用 editorial 风格重建，但保留前台导航。' },
])

const handleLogout = () => {
  logout()
  router.push('/login')
}

onMounted(() => {
  removeAuthListener = onAuthChange((user) => {
    currentUser.value = user
  })
})

onBeforeUnmount(() => {
  removeAuthListener()
})
</script>

<template>
  <div class="profile-management">
    <EditorialWorkspace
      brand="Profile Center"
      :title="profileTitle"
      subtitle="个人管理界面"
      description="点击“我的”后进入这里。界面参考 html5up-editorial 模板改造成侧栏式个人管理页，其余功能模块先用占位内容承接。"
      :hero-image="heroImage"
      sidebar-title="个人中心导航"
      sidebar-intro="这里先放个人中心常用的模块入口说明，后续可以替换成真实菜单和可点击项。"
      :quick-links="quickLinks"
      :feature-items="featureItems"
      :post-items="postItems"
      :contact-items="contactItems"
      action-label="返回首页"
      logout-label="退出登录"
      @action="router.push('/')"
      @logout="handleLogout"
    />
  </div>
</template>

<style scoped lang="scss">
.profile-management {
  padding-top: 110px;
}

@media (max-width: 760px) {
  .profile-management {
    padding-top: 90px;
  }
}
</style>
