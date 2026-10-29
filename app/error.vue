<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
  }
}>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900 antialiased">
    <p class="font-mono text-6xl font-bold text-indigo-600">{{ error?.statusCode ?? 500 }}</p>
    <p class="mt-4 text-zinc-600">{{ error?.statusMessage ?? '页面出错了' }}</p>
    <button
      type="button"
      class="mt-8 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
      @click="clearError({ redirect: '/' })"
    >
      回到首页
    </button>
  </div>
</template>
