<script setup lang="ts">
interface Props {
  placeholder?: string
  disabled?: boolean
  /** 生成中：发送按钮变为停止按钮，点击触发 stop 事件 */
  loading?: boolean
  /** Enter 发送、Shift+Enter 换行；为 false 时 Enter 仅换行 */
  submitOnEnter?: boolean
  /** 文本域最大高度（px），超出后内部滚动 */
  maxHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '描述你想创建的内容…',
  submitOnEnter: true,
  maxHeight: 200,
})

const emit = defineEmits<{
  submit: [value: string]
  stop: []
}>()

const model = defineModel<string>({ default: '' })

const textarea = ref<HTMLTextAreaElement | null>(null)

/** 自适应高度：先置 auto 取内容实际高度，再封顶 */
function autosize() {
  const el = textarea.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, props.maxHeight)}px`
}

onMounted(autosize)
watch(model, () => nextTick(autosize))

const canSubmit = computed(
  () => model.value.trim().length > 0 && !props.disabled && !props.loading,
)

function submit() {
  if (!canSubmit.value) return
  const text = model.value.trim()
  emit('submit', text)
  model.value = ''
  nextTick(autosize)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Enter' || !props.submitOnEnter) return
  // 输入法组词中的 Enter 不应发送
  if (event.shiftKey || event.isComposing) return
  event.preventDefault()
  submit()
}

function onSendClick() {
  if (props.loading) {
    emit('stop')
    return
  }
  submit()
}

const toolbarBtn =
  'flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 disabled:pointer-events-none disabled:opacity-40'

defineExpose({
  focus: () => textarea.value?.focus(),
})
</script>

<template>
  <div
    class="rounded-2xl border border-zinc-300 bg-white p-3 transition-all"
    :class="
      props.disabled
        ? 'opacity-60'
        : 'focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-50'
    "
  >
    <textarea
      ref="textarea"
      v-model="model"
      rows="1"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      class="block w-full resize-none border-0 bg-transparent p-1.5 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed"
      @keydown="onKeydown"
    />

    <div class="mt-1.5 flex items-center gap-2">
      <!-- 左侧工具栏：默认附件 / 图片，可用 #toolbar 整体替换 -->
      <div v-if="$slots.toolbar" class="flex items-center gap-1">
        <slot name="toolbar" />
      </div>
      <div v-else class="flex items-center gap-1">
        <button type="button" :disabled="props.disabled" :class="toolbarBtn" aria-label="添加附件">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button type="button" :disabled="props.disabled" :class="toolbarBtn" aria-label="生成图片">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
          </svg>
        </button>
      </div>

      <slot name="hint">
        <p class="hidden text-xs text-zinc-400 sm:block">Enter 发送 · Shift + Enter 换行</p>
      </slot>

      <button
        type="button"
        class="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full transition-colors"
        :class="
          props.loading
            ? 'bg-zinc-900 text-white hover:bg-zinc-700'
            : canSubmit
              ? 'bg-indigo-600 text-white hover:bg-indigo-500'
              : 'bg-zinc-200 text-zinc-400'
        "
        :aria-label="props.loading ? '停止生成' : '发送'"
        @click="onSendClick"
      >
        <svg v-if="props.loading" class="size-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <rect width="12" height="12" rx="2" />
        </svg>
        <svg v-else class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>
