<script setup lang="ts">
const options = [
  { value: 'low', label: '低优先级' },
  { value: 'medium', label: '中优先级' },
  { value: 'high', label: '高优先级' },
]

const value = ref('medium')
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">基础用法</h3>
      <USelect v-model="value" :options="options" class="mt-3 w-64" />
      <p class="mt-2 text-xs text-zinc-500">当前值：<span class="font-mono">{{ value }}</span></p>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">占位与禁用</h3>
      <div class="mt-3 w-64 space-y-3">
        <USelect :options="options" placeholder="选择任务优先级…" />
        <USelect :options="options" model-value="high" disabled />
      </div>
    </section>
  </div>
</template>
