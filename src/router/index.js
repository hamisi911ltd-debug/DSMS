import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import MainLayout from '../components/MainLayout.vue'

// Auth Pages
import Splash from '../pages/customer/Splash.vue'
import Login from '../pages/customer/Login.vue'

// Student Pages
import StudentDashboard from '../pages/student/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: Splash
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/student',
    component: MainLayout,
    props: { role: 'student' },
    meta: { requiresAuth: true, role: 'student' },
    children: [
      {
        path: '',
        redirect: '/student/dashboard'
      },
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: StudentDashboard,
        meta: { requiresAuth: true, role: 'student' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth) {
    if (!authStore.currentUser) {
      next('/login')
      return
    }
    
    if (to.meta.role && authStore.currentUser.role !== to.meta.role) {
      next(`/${authStore.currentUser.role}/dashboard`)
      return
    }
  }
  
  next()
})

export default router