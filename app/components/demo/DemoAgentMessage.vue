<script setup lang="ts">
const actionBtn =
  'inline-flex h-7 items-center gap-1 rounded-md px-2 text-xs text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800'

const acted = ref('')

async function copyContent() {
  try {
    await navigator.clipboard.writeText(' pricing 页面已生成，价格表包含三档套餐…')
    acted.value = '已复制到剪贴板'
  } catch {
    acted.value = '复制失败（非安全上下文）'
  }
}
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <UAgentMessage name="UIRef" time="10:24">
      <p>好的，pricing 页面已生成。价格表包含三档套餐，推荐档做了高亮处理，年付自动显示折扣角标。</p>
      <template #actions>
        <button type="button" :class="actionBtn" @click="copyContent">
          <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          复制
        </button>
        <button type="button" :class="actionBtn" @click="acted = '已重新生成'">
          <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          重新生成
        </button>
        <span v-if="acted" class="text-xs text-emerald-600">{{ acted }}</span>
      </template>
    </UAgentMessage>

    <UAgentMessage role="user">
      <p>不错，把推荐档的按钮换成 primary，再加大间距。</p>
    </UAgentMessage>
  </div>
</template>
