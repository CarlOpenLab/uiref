<script setup lang="ts">
interface Props {
  /** 总页数 */
  total: number
}

const props = defineProps<Props>()

const current = defineModel<number>({ default: 1 })

/** 展示页码序列，超出范围用省略号折叠 */
const pages = computed<(number | '…')[]>(() => {
  const total = props.total
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }
  const wanted = new Set<number>([1, total, current.value - 1, current.value, current.value + 1])
  const sorted = [...wanted].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const out: (number | '…')[] = []
  let prev = 0
  for (const n of sorted) {
    if (n - prev > 1) out.push('…')
    out.push(n)
    prev = n
  }
  return out
})

const numberBtn =
  'flex h-8 min-w-8 items-center justify-center rounded-lg px-1 text-sm transition-colors'
const navBtn =
  'flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-40'
</script>

<template>
  <nav class="flex items-center gap-1" aria-label="分页">
    <button
      type="button"
      :class="navBtn"
      :disabled="current <= 1"
      aria-label="上一页"
      @click="current--"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>

    <template v-for="(page, index) in pages" :key="`${page}-${index}`">
      <span v-if="page === '…'" class="px-1 text-sm text-zinc-400">…</span>
      <button
        v-else
        type="button"
        :class="[numberBtn, page === current ? 'bg-indigo-600 text-white' : 'text-zinc-600 hover:bg-zinc-100']"
        :aria-current="page === current ? 'page' : undefined"
        @click="current = page"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      :class="navBtn"
      :disabled="current >= total"
      aria-label="下一页"
      @click="current++"
    >
      <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  </nav>
</template>
