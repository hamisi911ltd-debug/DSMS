import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
  }

  // Watch for theme changes and apply to document
  watch(theme, (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', newTheme)
  }, { immediate: true })

  // Initialize theme from localStorage
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.value = savedTheme
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.value = 'dark'
    }
  }

  return {
    theme,
    toggleTheme,
    setTheme,
    initializeTheme
  }
})