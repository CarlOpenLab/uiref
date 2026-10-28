<script setup lang="ts">
interface Props {
  tone?: 'gray' | 'indigo' | 'green' | 'amber' | 'red'
  size?: 'sm' | 'md'
  /** 前置圆点，表达运行状态 */
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tone: 'gray',
  size: 'md',
})

const toneClasses = {
  gray: 'bg-zinc-100 text-zinc-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
}

const dotClasses = {
  gray: 'bg-zinc-400',
  indigo: 'bg-indigo-500',
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  red: 'bg-red-500',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap',
      props.size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
      toneClasses[props.tone],
    ]"
  >
    <span v-if="props.dot" class="size-1.5 rounded-full" :class="dotClasses[props.tone]" aria-hidden="true" />
    <slot />
  </span>
</template>
