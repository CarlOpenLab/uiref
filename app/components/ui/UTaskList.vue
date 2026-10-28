<script setup lang="ts">
interface Props {
  items: Array<{
    id: string
    text: string
    status?: 'pending' | 'in_progress' | 'completed'
  }>
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '任务计划',
})

const done = computed(() => props.items.filter((item) => item.status === 'completed').length)
const percent = computed(() =>
  props.items.length === 0 ? 0 : Math.round((done.value / props.items.length) * 100),
)
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white">
    <div class="flex items-center gap-3 border-b border-zinc-100 px-3.5 py-2.5">
      <span class="text-xs font-semibold text-zinc-900">{{ props.title }}</span>
      <span class="font-mono text-xs text-zinc-400">{{ done }}/{{ props.items.length }}</span>
      <div class="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-zinc-100">
        <div class="h-full rounded-full bg-indigo-500 transition-all" :style="{ width: `${percent}%` }" />
      </div>
    </div>

    <ul class="p-1.5">
      <li
        v-for="item in props.items"
        :key="item.id"
        class="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm"
      >
        <!-- 已完成 -->
        <span v-if="item.status === 'completed'" class="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500">
          <svg class="size-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <!-- 进行中 -->
        <svg v-else-if="item.status === 'in_progress'" class="size-4 shrink-0 animate-spin text-indigo-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.2-8.56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
        <!-- 待处理 -->
        <span v-else class="size-4 shrink-0 rounded-full border-2 border-zinc-300" aria-hidden="true" />

        <span
          :class="
            item.status === 'completed'
              ? 'text-zinc-400 line-through'
              : item.status === 'in_progress'
                ? 'font-medium text-zinc-900'
                : 'text-zinc-500'
          "
        >
          {{ item.text }}
        </span>
      </li>
    </ul>
  </div>
</template>
