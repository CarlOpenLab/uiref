<script setup lang="ts">
const options = [
  { id: 'glm-5', name: 'GLM-5', description: '综合能力最强，适合复杂生成', group: '旗舰模型', badge: 'New' },
  { id: 'glm-flash', name: 'GLM Flash', description: '响应最快，适合轻量任务', group: '旗舰模型' },
  { id: 'mini', name: 'Mini', description: '低成本高速档', group: '快速模型' },
  { id: 'vision', name: 'Vision', description: '支持图片理解', group: '快速模型' },
]

const model = ref('glm-5')
</script>

<template>
  <div class="w-full max-w-xl">
    <p class="text-sm font-medium text-zinc-900">分组 + 描述 + 选中态</p>
    <UModelPicker v-model="model" :options="options" class="mt-3" />
    <p class="mt-3 text-xs text-zinc-500">当前模型：<span class="font-mono">{{ model }}</span></p>
  </div>
</template>
