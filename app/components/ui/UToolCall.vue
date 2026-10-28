<script setup lang="ts">
interface Props {
  /** 工具名，如 web_search / write_file */
  name: string
  /** 调用参数（通常为 JSON 字符串） */
  args?: string
  status?: 'running' | 'success' | 'error'
  /** 耗时，如 0.8s */
  duration?: string
  /** 返回结果文本 */
  result?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'success',
})

const open = ref(false)

const statusMeta = {
  running: { dot: 'bg-indigo-500 animate-pulse', label: '运行中' },
  success: { dot: 'bg-emerald-500', label: '成功' },
  error: { dot: 'bg-red-500', label: '失败' },
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
    <button
      type="button"
      class="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left"
      @click="open = !open"
    >
      <span class="size-2 shrink-0 rounded-full" :class="statusMeta[props.status].dot" aria-hidden="true" />
      <span class="truncate font-mono text-xs font-medium text-zinc-900">{{ props.name }}</span>
      <span class="shrink-0 text-xs text-zinc-400">
        {{ statusMeta[props.status].label }}<template v-if="props.duration"> · {{ props.duration }}</template>
      </span>
      <svg
        class="ml-auto size-3.5 shrink-0 text-zinc-400 transition-transform"
        :class="open ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-show="open" class="space-y-2 border-t border-zinc-100 px-3.5 py-3">
      <pre v-if="props.args" class="overflow-x-auto rounded-lg bg-zinc-950 p-2.5 font-mono text-xs leading-relaxed text-zinc-100">{{ props.args }}</pre>
      <pre v-if="props.result" class="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 font-mono text-xs leading-relaxed text-zinc-700">{{ props.result }}</pre>
    </div>
  </div>
</template>
