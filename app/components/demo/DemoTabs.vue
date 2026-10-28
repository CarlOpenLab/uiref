<script setup lang="ts">
const tabs = [
  { id: 'overview', label: '概览' },
  { id: 'specs', label: '规格参数' },
  { id: 'reviews', label: '用户评价' },
]

const active = ref('overview')

const panels: Record<string, string> = {
  overview: '概览内容：当前激活的 tab id 为 overview。',
  specs: '规格参数内容：切换 tab 后渲染对应的面板。',
  reviews: '用户评价内容：UTabs 只负责导航，面板内容由使用者自行控制。',
}
</script>

<template>
  <div class="w-full max-w-xl">
    <UTabs v-model="active" :tabs="tabs" />
    <div class="py-4 text-sm leading-relaxed text-zinc-600">
      {{ panels[active] }}
    </div>
    <p class="font-mono text-xs text-zinc-400">active = "{{ active }}"</p>
  </div>
</template>
