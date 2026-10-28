<script setup lang="ts">
interface Task {
  id: string
  text: string
  status: 'pending' | 'in_progress' | 'completed'
}

const tasks = ref<Task[]>([
  { id: '1', text: '梳理定价页结构', status: 'completed' },
  { id: '2', text: '生成 Hero 区块', status: 'completed' },
  { id: '3', text: '实现三档价格表', status: 'in_progress' },
  { id: '4', text: '接入表单校验', status: 'pending' },
  { id: '5', text: '整体视觉走查', status: 'pending' },
])

/** 模拟 Agent 推进任务：当前项完成，下一项开始 */
function advance() {
  const inProgress = tasks.value.find((t) => t.status === 'in_progress')
  if (inProgress) inProgress.status = 'completed'
  const next = tasks.value.find((t) => t.status === 'pending')
  if (next) next.status = 'in_progress'
}
</script>

<template>
  <div class="w-full max-w-xl">
    <UTaskList :items="tasks" />
    <UButton size="sm" variant="outline" class="mt-3" @click="advance">推进下一步</UButton>
  </div>
</template>
