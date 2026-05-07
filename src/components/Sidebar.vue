<template>
  <div class="w-64 bg-white dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 border-r border-blue-100 dark:border-slate-700/50 flex flex-col h-screen overflow-y-auto shadow-lg">
    <!-- Logo Section -->
    <div class="p-4 border-b border-blue-100 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <span class="text-white font-bold text-lg">D</span>
        </div>
        <div>
          <h1 class="text-lg font-bold text-blue-900 dark:text-white">DSMS</h1>
          <p class="text-xs text-blue-600 dark:text-slate-400">Driving School</p>
        </div>
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="flex-1 p-4 space-y-2">
      <button
        v-for="link in navLinks"
        :key="link.path"
        @click="router.push(link.path)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
          isActive(link.path)
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
            : 'text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50'
        ]"
      >
        <component :is="link.icon" :size="20" />
        <span class="font-medium text-sm">{{ link.label }}</span>
      </button>
    </nav>

    <!-- Bottom Section -->
    <div class="p-4 border-t border-blue-100 dark:border-slate-700/50 space-y-3">
      <!-- Theme Toggle -->
      <button
        @click="themeStore.toggleTheme()"
        class="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
      >
        <Sun v-if="themeStore.theme === 'dark'" :size="20" class="text-blue-500" />
        <Moon v-else :size="20" class="text-blue-600" />
        <span class="text-sm font-medium">
          {{ themeStore.theme === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </button>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button
          @click="profileOpen = !profileOpen"
          class="w-full flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <img
            :src="authStore.currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'"
            :alt="authStore.currentUser?.name"
            class="w-6 h-6 rounded-full ring-2 ring-blue-200 dark:ring-slate-600"
          />
          <div class="flex-1 text-left min-w-0">
            <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
              {{ authStore.currentUser?.name || 'User' }}
            </p>
            <p class="text-xs text-blue-600 dark:text-slate-400 capitalize">{{ role }}</p>
          </div>
          <ChevronDown :size="16" />
        </button>

        <div
          v-if="profileOpen"
          class="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-800 border border-blue-100 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
        >
          <button
            @click="handleProfileClick"
            class="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
          >
            <User :size="16" />
            Profile
          </button>
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors border-t border-blue-100 dark:border-slate-700"
          >
            <LogOut :size="16" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { LogOut, User, ChevronDown, LayoutDashboard, Sun, Moon } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const props = defineProps({
  role: {
    type: String,
    required: true
  }
})

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const profileOpen = ref(false)

const navLinks = computed(() => {
  if (props.role === 'student') {
    return [
      { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    ]
  }
  return []
})

const isActive = (path) => route.path === path

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const handleProfileClick = () => {
  router.push(`/${props.role}/profile`)
  profileOpen.value = false
}
</script>