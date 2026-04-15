import FrontLayout from '../../layouts/FrontLayout.vue'
import CapabilitiesView from '../../views/front/CapabilitiesView.vue'
import AiChatView from '../../views/front/ai/AiChatView.vue'
import PortalLoginView from '../../views/front/PortalLoginView.vue'
import PriceLookupView from '../../views/front/PriceLookupView.vue'
import ProfileManagementView from '../../views/front/ProfileManagementView.vue'
import StoryView from '../../views/front/StoryView.vue'
import HomeView from '../../views/front/HomeView.vue'
// import LoginDialogView from '../../views/front/login/LoginDialogView.vue'

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
        component: PriceLookupView,
      },
      {
        path: 'story',
        name: 'front-story',
        component: StoryView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'capabilities',
        name: 'front-capabilities',
        component: CapabilitiesView,
        meta: {
          requiresAuth: true,
        },
      },
      // {
      //   path: 'login',
      //   name: 'front-login',
      //   component: LoginDialogView,
      //   meta: {
      //     publicOnly: true,
      //   },
      // },
      {
        path: 'ai-chat',
        name: 'front-ai-chat',
        component: AiChatView,
      },
      {
        path: 'profile',
        name: 'front-profile',
        component: ProfileManagementView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
]

export default frontRoutes
