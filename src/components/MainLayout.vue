<template>
  <div class="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <Sidebar :role="role" />
    <div class="flex-1 overflow-auto">
      <main class="p-8 max-w-7xl mx-auto w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'

defineProps({
  role: {
    type: String,
    required: true
  }
})
</script>