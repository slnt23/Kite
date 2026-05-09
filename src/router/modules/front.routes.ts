import FrontLayout from '@/layouts/FrontLayout.vue'
import CapabilitiesView from '@/views/front/CapabilitiesView.vue'
import AiChatView from '@/views/front/AiChatView.vue'
import PriceSearchView from '@/views/front/PriceSearchView.vue'
import UserProfileView from '@/views/front/UserProfileView.vue'
import StoryView from '@/views/front/StoryView.vue'
import HomeView from '@/views/front/HomeView.vue'
import BlogView from '@/views/front/BlogView.vue'


const frontRoutes = [
  {
    path: '/',
    component: FrontLayout,
    children: [
      {
        path: '',
        name: 'front-home',
        component: HomeView,
      },
      {
        path: 'price-query',
        name: 'front-price-query',
        component: PriceSearchView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'story',
        name: 'front-story',
        component: StoryView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'capabilities',
        name: 'front-capabilities',
        component: CapabilitiesView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'ai-ai',
        name: 'front-ai-ai',
        component: AiChatView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'profile',
        name: 'front-profile',
        component: UserProfileView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'blog',
        name: 'front-blog',
        component: BlogView,
        meta: {
          // 这个是任何人都可看的博客列表页，里面有一些公开的博客文章，用户可以点击进入查看详情
          // requiresAuth: true,
        },
      },
    ],
  },
]

export default frontRoutes
