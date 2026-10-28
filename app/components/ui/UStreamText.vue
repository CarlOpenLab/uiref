<script setup lang="ts">
interface Props {
  /** 完整文本，流式时逐字显示 */
  text: string
  /** false 时立即显示全文 */
  streaming?: boolean
  /** 每 tick 打出的字符数间隔，毫秒 */
  speed?: number
}

const props = withDefaults(defineProps<Props>(), {
  streaming: true,
  speed: 28,
})

const shown = ref(props.streaming ? '' : props.text)
let timer: ReturnType<typeof setInterval> | null = null

function start() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  if (!props.streaming) {
    shown.value = props.text
    return
  }
  shown.value = ''
  timer = setInterval(() => {
    shown.value = props.text.slice(0, shown.value.length + 2)
    if (shown.value.length >= props.text.length && timer) {
      clearInterval(timer)
      timer = null
    }
  }, props.speed)
}

onMounted(start)
watch(() => [props.text, props.streaming], start)
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <p class="text-sm leading-relaxed text-zinc-800">
    {{ shown }}<span
      v-if="props.streaming && shown.length < props.text.length"
      class="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-indigo-500"
      aria-hidden="true"
    />
  </p>
</template>
