import FrontLayout from '@/layouts/FrontLayout.vue'
import AiChatView from '@/views/front/AiChatView.vue'
import PriceMainView from '@/views/front/PriceMainView.vue'
import UserProfileView from '@/views/front/UserProfileView.vue'
import ImageVideoView from '@/views/front/ImageVideoView.vue'
import HomeView from '@/views/front/HomeView.vue'
import BlogView from '@/views/front/BlogView.vue'
import BlogListView from '@/views/front/BlogListView.vue'
import MeditationView from '@/views/front/MeditationView.vue'


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
        component: PriceMainView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'story',
        name: 'front-story',
        component: ImageVideoView,
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
        path: 'blog',
        name: 'front-blog',
        component: BlogView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'blog/posts',
        name: 'front-blog-posts',
        component: BlogListView,
        meta: {
          // requiresAuth: true,
        },
      },
      {
        path: 'meditations',
        name: 'front-meditations',
        component: MeditationView,
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

    ],
  },
]

export default frontRoutes
