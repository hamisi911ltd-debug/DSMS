<template>
  <div>
    <!-- Welcome Section -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2">
        Welcome back, {{ authStore.currentUser?.name }}!
      </h1>
      <p class="text-slate-600 dark:text-slate-400">Here's your learning progress and upcoming sessions</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Active Courses -->
      <div class="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700/50 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-500/50 transition-colors shadow-sm hover:shadow-md">
        <div class="flex items-center justify-between mb-4">
          <BookOpen class="text-blue-500" :size="24" />
          <span class="text-2xl font-bold text-slate-900 dark:text-white">3</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Active Courses</p>
      </div>

      <!-- Overall Progress -->
      <div class="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700/50 rounded-xl p-6 hover:border-green-300 dark:hover:border-green-500/50 transition-colors shadow-sm hover:shadow-md">
        <div class="flex items-center justify-between mb-4">
          <TrendingUp class="text-green-500" :size="24" />
          <span class="text-2xl font-bold text-slate-900 dark:text-white">75%</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Overall Progress</p>
      </div>

      <!-- Total Spent -->
      <div class="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700/50 rounded-xl p-6 hover:border-purple-300 dark:hover:border-purple-500/50 transition-colors shadow-sm hover:shadow-md">
        <div class="flex items-center justify-between mb-4">
          <Award class="text-purple-500" :size="24" />
          <span class="text-2xl font-bold text-slate-900 dark:text-white">KES 45,000</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Total Invested</p>
      </div>

      <!-- Messages -->
      <div class="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700/50 rounded-xl p-6 hover:border-orange-300 dark:hover:border-orange-500/50 transition-colors shadow-sm hover:shadow-md cursor-pointer">
        <div class="flex items-center justify-between mb-4">
          <MessageSquare class="text-orange-500" :size="24" />
          <span class="text-2xl font-bold text-slate-900 dark:text-white">2</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm">Unread Messages</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700/50 rounded-xl p-6 shadow-sm">
      <h2 class="text-xl font-bold text-blue-900 dark:text-white mb-6">Your Courses</h2>
      
      <div class="text-center py-12">
        <BookOpen class="mx-auto text-blue-300 dark:text-slate-600 mb-4" :size="48" />
        <p class="text-slate-600 dark:text-slate-400 mb-4">Welcome to DSMS!</p>
        <p class="text-sm text-slate-500 dark:text-slate-500">
          This is a simplified version for deployment. The full application with all features is available in the complete codebase.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookOpen, TrendingUp, Award, MessageSquare } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
</script>