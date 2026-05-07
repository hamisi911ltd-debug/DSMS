import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!currentUser.value)

  const login = async (credentials) => {
    loading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data - replace with actual API call
      currentUser.value = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        role: 'student' // or 'instructor', 'admin'
      }
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    currentUser.value = null
  }

  const checkAuthStatus = async () => {
    loading.value = true
    try {
      // Check if user is logged in (e.g., validate token)
      // This would typically check localStorage/sessionStorage or make an API call
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        currentUser.value = JSON.parse(savedUser)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    currentUser,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus
  }
})