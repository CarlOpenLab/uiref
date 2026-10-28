<script setup lang="ts">
interface PickerOption {
  id: string
  name: string
  description?: string
  /** 可选的小标签，如 New / Beta */
  badge?: string
  group?: string
}

interface Props {
  options: PickerOption[]
  disabled?: boolean
}

const props = defineProps<Props>()

const model = defineModel<string>({ required: true })
const open = ref(false)
const root = ref<HTMLElement | null>(null)

const selected = computed(() => props.options.find((option) => option.id === model.value))

const groups = computed(() => {
  const map = new Map<string, PickerOption[]>()
  for (const option of props.options) {
    const key = option.group ?? '其他'
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(option)
  }
  return [...map.entries()]
})

function onClickOutside(event: MouseEvent) {
  if (open.value && root.value && !root.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="root" class="relative inline-block text-left">
    <button
      type="button"
      :disabled="props.disabled"
      class="flex h-8 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-50"
      @click="open = !open"
    >
      <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
      {{ selected?.name ?? '选择模型' }}
      <svg class="size-3 transition-transform" :class="open ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      v-show="open"
      class="absolute left-0 z-10 mt-1.5 w-72 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg"
    >
      <template v-for="[groupName, options] in groups" :key="groupName">
        <p class="px-2.5 pb-1 pt-2 text-[11px] font-medium text-zinc-400">{{ groupName }}</p>
        <button
          v-for="option in options"
          :key="option.id"
          type="button"
          class="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-zinc-50"
          @click="model = option.id; open = false"
        >
          <span class="min-w-0 flex-1">
            <span class="flex items-center gap-1.5 text-sm font-medium text-zinc-900">
              {{ option.name }}
              <span v-if="option.badge" class="rounded-full bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600">
                {{ option.badge }}
              </span>
            </span>
            <span v-if="option.description" class="mt-0.5 block truncate text-[11px] text-zinc-400">
              {{ option.description }}
            </span>
          </span>
          <svg v-if="option.id === model" class="mt-1 size-4 shrink-0 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </button>
      </template>
    </div>
  </div>
</template>
