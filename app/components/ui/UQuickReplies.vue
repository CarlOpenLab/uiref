<script setup lang="ts">
interface Props {
  items: string[]
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{ select: [item: string] }>()
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="item in items"
      :key="item"
      type="button"
      :disabled="disabled"
      class="rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm text-zinc-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:pointer-events-none disabled:opacity-50"
      @click="emit('select', item)"
    >
      {{ item }}
    </button>
  </div>
</template>
