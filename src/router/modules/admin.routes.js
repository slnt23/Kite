import AdminLayout from '../../layouts/AdminLayout.vue'
import AdminDashboardView from '../../views/admin/AdminDashboardView.vue'

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: AdminDashboardView,
      },
    ],
  },
]

export default adminRoutes
