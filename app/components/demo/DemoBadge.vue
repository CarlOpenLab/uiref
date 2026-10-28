<script setup lang="ts">
const tones = [
  { tone: 'gray', label: '默认' },
  { tone: 'indigo', label: '进行中' },
  { tone: 'green', label: '已完成' },
  { tone: 'amber', label: '待处理' },
  { tone: 'red', label: '已失败' },
] as const
</script>

<template>
  <div class="space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">语义色调</h3>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <UBadge v-for="item in tones" :key="item.tone" :tone="item.tone">{{ item.label }}</UBadge>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">状态圆点 + 尺寸</h3>
      <div class="mt-3 flex flex-wrap items-center gap-3">
        <UBadge tone="green" dot size="sm">运行中</UBadge>
        <UBadge tone="red" dot size="sm">已停止</UBadge>
        <UBadge tone="indigo" dot>构建中</UBadge>
        <UBadge tone="gray">v2.4.1</UBadge>
      </div>
    </section>
  </div>
</template>
