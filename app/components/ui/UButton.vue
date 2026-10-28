<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  /** 占满整行宽度，常用于表单底部 */
  block?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
}

const variantClasses = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700',
  secondary: 'bg-zinc-900 text-white hover:bg-zinc-700 active:bg-zinc-800',
  outline:
    'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100',
  ghost: 'text-zinc-700 hover:bg-zinc-100 active:bg-zinc-200',
  danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled || props.loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
      'disabled:pointer-events-none disabled:opacity-50',
      props.block ? 'w-full' : '',
      sizeClasses[props.size],
      variantClasses[props.variant],
    ]"
  >
    <svg
      v-if="props.loading"
      class="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="4" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
    </svg>
    <slot />
  </button>
</template>
