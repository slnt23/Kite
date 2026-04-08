import FrontLayout from '../../layouts/FrontLayout.vue'
import CapabilitiesView from '../../views/front/CapabilitiesView.vue'
import HomeView from '../../views/front/HomeView.vue'
import LoginView from '../../views/front/LoginView.vue'
import StoryView from '../../views/front/StoryView.vue'

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
        path: 'story',
        name: 'front-story',
        component: StoryView,
      },
      {
        path: 'capabilities',
        name: 'front-capabilities',
        component: CapabilitiesView,
      },
      {
        path: 'login',
        name: 'front-login',
        component: LoginView,
      },
    ],
  },
]

export default frontRoutes
