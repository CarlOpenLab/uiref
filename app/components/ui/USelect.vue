<script setup lang="ts">
interface SelectOption {
  value: string
  label: string
}

interface Props {
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择…',
})

const model = defineModel<string>({ default: '' })

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const selected = computed(() => props.options.find((option) => option.value === model.value))

function onClickOutside(event: MouseEvent) {
  if (open.value && root.value && !root.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="root" class="relative w-full">
    <button
      type="button"
      :disabled="props.disabled"
      class="flex h-10 w-full items-center justify-between rounded-lg border px-3 text-sm transition-colors"
      :class="props.disabled ? 'cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400' : 'border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400'"
      @click="open = !open"
    >
      <span :class="selected ? '' : 'text-zinc-400'">{{ selected?.label ?? props.placeholder }}</span>
      <svg class="size-4 text-zinc-400 transition-transform" :class="open ? 'rotate-180' : ''" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      v-show="open"
      class="absolute z-10 mt-1.5 max-h-60 w-full overflow-auto rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
    >
      <button
        v-for="option in props.options"
        :key="option.value"
        type="button"
        class="flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-50"
        :class="option.value === model ? 'font-medium text-indigo-600' : 'text-zinc-700'"
        @click="model = option.value; open = false"
      >
        {{ option.label }}
        <svg v-if="option.value === model" class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>
    </div>
  </div>
</template>
