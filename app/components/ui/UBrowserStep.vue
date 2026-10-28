<script setup lang="ts">
interface Props {
  /** 步骤序号，从 1 开始 */
  step: number
  /** 动作描述，如 点击「登录」按钮 */
  action: string
  /** 目标页面网址 */
  url?: string
  status?: 'running' | 'done'
}

withDefaults(defineProps<Props>(), {
  status: 'done',
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
    <div class="flex items-center gap-2 px-3.5 py-2.5">
      <span class="shrink-0 rounded-md bg-indigo-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-600">
        Step {{ step }}
      </span>
      <span class="truncate text-xs font-medium text-zinc-900">{{ action }}</span>

      <span v-if="status === 'running'" class="ml-auto flex shrink-0 items-center gap-1 text-[11px] text-indigo-600">
        <span class="size-1.5 animate-pulse rounded-full bg-indigo-500" aria-hidden="true" />
        执行中
      </span>
      <span v-else class="ml-auto flex shrink-0 items-center gap-1 text-[11px] text-emerald-600">
        <svg class="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
        完成
      </span>
    </div>

    <div v-if="url" class="flex items-center gap-1.5 border-t border-zinc-100 bg-zinc-50 px-3.5 py-1.5">
      <svg class="size-3 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
      </svg>
      <span class="truncate font-mono text-[11px] text-zinc-500">{{ url }}</span>
    </div>

    <!-- 截图区域：默认插槽放页面快照与目标高亮框 -->
    <div class="relative aspect-[16/10] border-t border-zinc-100 bg-zinc-50">
      <slot />
    </div>
  </div>
</template>
