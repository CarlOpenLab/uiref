<script setup lang="ts">
interface Props {
  /** thinking：标题脉冲闪烁；done：显示完成态 */
  status?: 'thinking' | 'done'
  /** 耗时，如 4.2s */
  duration?: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  status: 'done',
  defaultOpen: false,
})

const open = ref(props.defaultOpen)
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-zinc-50/60">
    <button
      type="button"
      class="flex w-full items-center gap-2 px-3.5 py-2.5 text-left"
      @click="open = !open"
    >
      <svg
        class="size-4"
        :class="props.status === 'thinking' ? 'animate-pulse text-indigo-500' : 'text-zinc-400'"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      </svg>
      <span
        class="text-xs font-medium"
        :class="props.status === 'thinking' ? 'text-indigo-600' : 'text-zinc-500'"
      >
        {{ props.status === 'thinking' ? '深度思考中…' : '已完成思考' }}
      </span>
      <span v-if="props.duration" class="text-xs text-zinc-400">{{ props.duration }}</span>
      <svg
        class="ml-auto size-3.5 text-zinc-400 transition-transform"
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

    <div v-show="open" class="border-t border-zinc-200 px-3.5 py-3 text-sm leading-relaxed text-zinc-500">
      <slot />
    </div>
  </div>
</template>
