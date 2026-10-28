<script setup lang="ts">
const items = ['用年付价格重算', '加一个对比表格', '换成深色主题', '导出为 React 代码']

const selected = ref('')
</script>

<template>
  <div class="w-full max-w-xl">
    <UQuickReplies :items="items" @select="selected = $event" />
    <p class="mt-3 text-xs text-zinc-500">
      点击后 emit select —— 已选择：{{ selected || '（点击上方试试）' }}
    </p>
  </div>
</template>
