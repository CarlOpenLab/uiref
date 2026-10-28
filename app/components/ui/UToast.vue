<script setup lang="ts">
interface Props {
  tone?: 'success' | 'error' | 'info'
  title: string
  description?: string
  /** 自动关闭毫秒数，0 表示手动关闭 */
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'info',
  duration: 3000,
})

const visible = defineModel<boolean>({ default: false })

let timer: ReturnType<typeof setTimeout> | null = null

watch(visible, (value) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  if (value && props.duration > 0) {
    timer = setTimeout(() => (visible.value = false), props.duration)
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

const tones = {
  success: { icon: 'bg-emerald-500', path: 'M20 6 9 17l-5-5' },
  error: { icon: 'bg-red-500', path: 'M12 8v5m0 3.5h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z' },
  info: { icon: 'bg-indigo-500', path: 'M12 16v-4m0-4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z' },
}

const tone = computed(() => tones[props.tone])
</script>

<template>
  <Teleport to="body">
    <Transition name="u-modal">
      <div
        v-if="visible"
        class="fixed bottom-6 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg"
        role="status"
      >
        <span class="flex size-5 shrink-0 items-center justify-center rounded-full" :class="tone.icon">
          <svg class="size-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path :d="tone.path" />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium text-zinc-900">{{ title }}</p>
          <p v-if="description" class="mt-0.5 text-xs leading-relaxed text-zinc-500">{{ description }}</p>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="关闭"
          @click="visible = false"
        >
          <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
