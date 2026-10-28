<script setup lang="ts">
interface Props {
  /** user 靠右气泡；agent 靠左带头像 */
  role?: 'user' | 'agent'
  /** Agent 名称，取首字符做头像 */
  name?: string
  time?: string
}

const props = withDefaults(defineProps<Props>(), {
  role: 'agent',
  name: 'Agent',
})
</script>

<template>
  <div class="flex gap-3" :class="props.role === 'user' ? 'flex-row-reverse' : ''">
    <span
      v-if="props.role === 'agent'"
      class="flex size-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white"
    >
      {{ props.name.charAt(0).toUpperCase() }}
    </span>

    <div class="min-w-0 max-w-[85%]">
      <div v-if="props.role === 'agent'" class="mb-1 flex items-baseline gap-2">
        <span class="text-xs font-semibold text-zinc-900">{{ props.name }}</span>
        <span v-if="props.time" class="text-xs text-zinc-400">{{ props.time }}</span>
      </div>

      <div
        :class="
          props.role === 'user'
            ? 'rounded-2xl rounded-br-md bg-indigo-600 px-3.5 py-2 text-sm leading-relaxed text-white'
            : 'text-sm leading-relaxed text-zinc-800'
        "
      >
        <slot />
      </div>

      <!-- 操作行：复制 / 重新生成等，由使用方填充 -->
      <div v-if="$slots.actions && props.role === 'agent'" class="mt-2 flex items-center gap-1">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
