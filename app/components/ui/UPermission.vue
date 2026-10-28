<script setup lang="ts">
interface Props {
  /** 请求的工具，如 Bash / write_file */
  tool: string
  /** 要执行的具体操作，如 npm install */
  action: string
  risk?: 'low' | 'medium' | 'high'
  /** 补充说明，缺省用通用文案 */
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  risk: 'medium',
})

const emit = defineEmits<{
  approve: [mode: 'once' | 'always']
  deny: []
}>()

const riskMeta = {
  low: { label: '低风险', cls: 'border-zinc-200 bg-zinc-50 text-zinc-600' },
  medium: { label: '中风险', cls: 'border-amber-200 bg-amber-50 text-amber-700' },
  high: { label: '高风险', cls: 'border-red-200 bg-red-50 text-red-700' },
}
</script>

<template>
  <div class="rounded-xl border border-amber-300 bg-amber-50/60 p-4">
    <div class="flex items-center gap-2">
      <svg class="size-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      </svg>
      <span class="text-sm font-semibold text-zinc-900">权限请求</span>
      <span class="ml-auto rounded-full border px-2 py-0.5 text-[11px] font-medium" :class="riskMeta[props.risk].cls">
        {{ riskMeta[props.risk].label }}
      </span>
    </div>

    <p class="mt-2 text-sm text-zinc-600">{{ props.description ?? 'Agent 请求执行以下操作，请确认：' }}</p>

    <div class="mt-2.5 rounded-lg border border-amber-200 bg-white px-3 py-2 font-mono text-xs text-zinc-800">
      <span class="text-zinc-400">{{ props.tool }} · </span>{{ props.action }}
    </div>

    <div class="mt-3 flex flex-wrap gap-2">
      <UButton size="sm" @click="emit('approve', 'once')">允许一次</UButton>
      <UButton size="sm" variant="outline" @click="emit('approve', 'always')">总是允许</UButton>
      <button
        type="button"
        class="inline-flex h-8 items-center rounded-lg px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
        @click="emit('deny')"
      >
        拒绝
      </button>
    </div>
  </div>
</template>
