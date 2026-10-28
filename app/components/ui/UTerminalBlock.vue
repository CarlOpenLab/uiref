<script setup lang="ts">
interface Props {
  /** 要执行的命令 */
  command: string
  /** 工作目录，显示在头部 */
  cwd?: string
  output?: string
  status?: 'running' | 'success' | 'error'
  /** 耗时，如 6.2s */
  duration?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'success',
})

const emit = defineEmits<{ stop: [] }>()
</script>

<template>
  <div class="overflow-hidden rounded-xl bg-zinc-950 font-mono text-xs">
    <div class="flex items-center gap-2 border-b border-zinc-800 px-3.5 py-2">
      <svg class="size-3.5 shrink-0 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" />
      </svg>
      <span class="truncate text-zinc-400">{{ props.cwd ?? '~/project' }}</span>
      <span v-if="props.duration" class="shrink-0 text-zinc-500">{{ props.duration }}</span>

      <button
        v-if="props.status === 'running'"
        type="button"
        class="ml-auto flex shrink-0 items-center gap-1.5 rounded-md bg-zinc-800 px-2 py-0.5 text-zinc-300 transition-colors hover:bg-zinc-700"
        @click="emit('stop')"
      >
        <span class="size-1.5 rounded-sm bg-red-400" aria-hidden="true" />
        停止
      </button>
      <span v-else class="ml-auto shrink-0" :class="props.status === 'success' ? 'text-emerald-400' : 'text-red-400'">
        {{ props.status === 'success' ? '✓ 完成' : '✗ 失败' }}
      </span>
    </div>

    <div class="overflow-x-auto p-3.5 leading-6">
      <p class="text-zinc-100"><span class="text-emerald-400">$</span> {{ props.command }}</p>
      <pre v-if="props.output" class="whitespace-pre-wrap text-zinc-400">{{ props.output }}</pre>
      <p v-if="props.status === 'running'" class="animate-pulse text-zinc-500">▌ 运行中…</p>
    </div>
  </div>
</template>
