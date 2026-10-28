<script setup lang="ts">
interface Props {
  tone?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'info',
})

const tones = {
  info: {
    wrap: 'border-indigo-200 bg-indigo-50 text-indigo-900',
    dot: 'bg-indigo-500',
  },
  success: {
    wrap: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    dot: 'bg-emerald-500',
  },
  warning: {
    wrap: 'border-amber-200 bg-amber-50 text-amber-900',
    dot: 'bg-amber-500',
  },
  danger: {
    wrap: 'border-red-200 bg-red-50 text-red-900',
    dot: 'bg-red-500',
  },
}

const style = tones[props.tone]
</script>

<template>
  <div class="flex gap-3 rounded-xl border p-4" :class="style.wrap" role="alert">
    <span class="mt-1.5 size-2 shrink-0 rounded-full" :class="style.dot" aria-hidden="true" />
    <div class="text-sm leading-relaxed">
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <div :class="title ? 'mt-1 opacity-80' : ''">
        <slot />
      </div>
    </div>
  </div>
</template>
