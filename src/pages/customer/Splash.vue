<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
    <div class="text-center">
      <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl mb-8 mx-auto">
        <span class="text-white font-bold text-3xl">D</span>
      </div>
      <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
        DSMS
      </h1>
      <p class="text-slate-600 dark:text-slate-400 mb-8">Driving School Management System</p>
      <button
        @click="router.push('/login')"
        class="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-md font-medium"
      >
        Get Started
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>