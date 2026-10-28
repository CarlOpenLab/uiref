<script setup lang="ts">
interface Props {
  type?: string
  placeholder?: string
  disabled?: boolean
  /** 校验错误态：红色边框 + 红色聚焦环 */
  invalid?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
})

const model = defineModel<string>({ default: '' })

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-3 text-sm',
  lg: 'h-11 px-4 text-base',
}
</script>

<template>
  <input
    v-model="model"
    :type="props.type"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :class="[
      'w-full rounded-lg border bg-white text-zinc-900 transition-colors',
      'placeholder:text-zinc-400',
      'focus:outline-2 focus:outline-offset-0 focus:outline-indigo-500',
      'disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400',
      props.invalid ? 'border-red-400 focus:outline-red-500' : 'border-zinc-300',
      sizeClasses[props.size],
    ]"
  />
</template>
