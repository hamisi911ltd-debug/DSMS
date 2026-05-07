<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-blue-100 dark:border-slate-700">
      <div class="text-center mb-8">
        <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg mb-4 mx-auto">
          <span class="text-white font-bold text-2xl">D</span>
        </div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</h1>
        <p class="text-slate-600 dark:text-slate-400">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            class="w-full px-4 py-3 border border-blue-100 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3 border border-blue-100 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all shadow-md font-medium disabled:opacity-50"
        >
          <span v-if="authStore.loading">Signing In...</span>
          <span v-else>Sign In</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Demo: Use any email/password to login
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  const result = await authStore.login({
    email: email.value,
    password: password.value
  })
  
  if (result.success) {
    router.push(`/${authStore.currentUser.role}/dashboard`)
  }
}
</script>