<script setup lang="ts">
interface Props {
  /** 文件路径 */
  file: string
  additions?: number
  deletions?: number
  /** diff 文本：+ 开头为新增行，- 开头为删除行 */
  diff: string
  status?: 'pending' | 'applied' | 'rejected'
}

const props = withDefaults(defineProps<Props>(), {
  status: 'pending',
})

const lines = computed(() => props.diff.split('\n'))

const statusMeta = {
  pending: { label: '待审核', cls: 'border-amber-200 bg-amber-50 text-amber-700' },
  applied: { label: '已应用', cls: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  rejected: { label: '已拒绝', cls: 'border-zinc-200 bg-zinc-50 text-zinc-500' },
}
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-zinc-200 bg-white">
    <div class="flex items-center gap-2.5 border-b border-zinc-100 px-3.5 py-2.5">
      <svg class="size-4 shrink-0 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
      </svg>
      <span class="truncate font-mono text-xs font-medium text-zinc-900">{{ props.file }}</span>
      <span class="shrink-0 font-mono text-xs text-emerald-600">+{{ props.additions ?? 0 }}</span>
      <span class="shrink-0 font-mono text-xs text-red-500">-{{ props.deletions ?? 0 }}</span>
      <span class="ml-auto shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium" :class="statusMeta[props.status].cls">
        {{ statusMeta[props.status].label }}
      </span>
    </div>

    <pre class="overflow-x-auto py-1 text-xs leading-6"><code><span
      v-for="(line, index) in lines"
      :key="index"
      class="block px-3.5 font-mono"
      :class="
        line.startsWith('+')
          ? 'bg-emerald-50 text-emerald-800'
          : line.startsWith('-')
            ? 'bg-red-50 text-red-700'
            : 'text-zinc-600'
      "
    >{{ line || ' ' }}</span></code></pre>

    <div v-if="$slots.actions" class="flex justify-end gap-2 border-t border-zinc-100 px-3.5 py-2.5">
      <slot name="actions" />
    </div>
  </div>
</template>
