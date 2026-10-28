<script setup lang="ts">
interface Props {
  label?: string
  disabled?: boolean
}

defineProps<Props>()

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="model"
    :disabled="disabled"
    class="group flex items-center gap-2 text-left disabled:cursor-not-allowed disabled:opacity-50"
    @click="model = !model"
  >
    <span
      class="flex size-4 shrink-0 items-center justify-center rounded border transition-colors"
      :class="model ? 'border-indigo-600 bg-indigo-600' : 'border-zinc-300 bg-white group-hover:border-zinc-400'"
    >
      <svg v-if="model" class="size-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    <span class="text-sm text-zinc-700">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>
