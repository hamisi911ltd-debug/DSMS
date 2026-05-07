<template>
  <div v-if="authStore.loading" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
  
  <router-view v-else />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import { useThemeStore } from './stores/theme'

const authStore = useAuthStore()
const themeStore = useThemeStore()

onMounted(() => {
  // Initialize theme
  themeStore.initializeTheme()
  
  // Check authentication status
  authStore.checkAuthStatus()
})
</script>