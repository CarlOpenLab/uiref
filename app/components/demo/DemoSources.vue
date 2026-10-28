<script setup lang="ts">
const items = [
  { id: '1', title: 'Nuxt 4 官方发布说明 · Release Notes', site: 'nuxt.com' },
  { id: '2', title: 'Tailwind CSS v4 升级指南', site: 'tailwindcss.com' },
  { id: '3', title: 'SaaS 定价页设计模式研究 2026', site: 'growth.design' },
  { id: '4', title: 'Pricing Table UX: 9 Best Practices', site: 'baymard.com' },
]

const selected = ref('')
</script>

<template>
  <div class="w-full max-w-xl">
    <USources :items="items" @select="selected = $event.title" />
    <p class="mt-3 text-xs text-zinc-500">点击来源 emit select —— 已选择：{{ selected || '（展开后点击试试）' }}</p>
  </div>
</template>
