<script setup lang="ts">
export interface SourceItem {
  id: string
  title: string
  site: string
}

interface Props {
  items: SourceItem[]
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '个来源',
})

const emit = defineEmits<{ select: [item: SourceItem] }>()

const open = ref(false)
</script>

<template>
  <div class="rounded-xl border border-zinc-200 bg-white p-3.5">
    <div class="flex items-center gap-2.5">
      <!-- 编号角标行（Perplexity 式） -->
      <div class="flex -space-x-1.5">
        <span
          v-for="(item, index) in props.items.slice(0, 5)"
          :key="item.id"
          class="flex size-6 items-center justify-center rounded-md border border-zinc-200 bg-white text-[10px] font-semibold text-zinc-600"
        >
          {{ index + 1 }}
        </span>
      </div>
      <button
        type="button"
        class="flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-zinc-800"
        @click="open = !open"
      >
        {{ props.items.length }} {{ props.label }}
        <svg class="size-3.5 transition-transform" :class="open ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>

    <ul v-show="open" class="mt-2.5 space-y-0.5 border-t border-zinc-100 pt-2.5">
      <li v-for="(item, index) in props.items" :key="item.id">
        <button
          type="button"
          class="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-50"
          @click="emit('select', item)"
        >
          <span class="flex size-5 shrink-0 items-center justify-center rounded border border-zinc-200 text-[10px] font-semibold text-zinc-500">
            {{ index + 1 }}
          </span>
          <span class="min-w-0 flex-1 truncate text-left text-xs font-medium text-zinc-800">{{ item.title }}</span>
          <span class="shrink-0 text-[11px] text-zinc-400">{{ item.site }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
