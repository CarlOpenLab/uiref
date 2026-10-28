<script setup lang="ts">
const show = ref(false)
const tone = ref<'success' | 'error' | 'info'>('success')
const title = ref('')
const description = ref('')

function fire(newTone: 'success' | 'error' | 'info') {
  tone.value = newTone
  if (newTone === 'success') {
    title.value = '已保存'
    description.value = '设置已同步到所有设备'
  } else if (newTone === 'error') {
    title.value = '发布失败'
    description.value = '构建返回错误码 137，请重试'
  } else {
    title.value = '提示'
    description.value = '草稿每 30 秒自动保存一次'
  }
  show.value = true
}
</script>

<template>
  <div class="w-full max-w-xl">
    <div class="flex flex-wrap gap-2">
      <UButton size="sm" @click="fire('success')">触发成功提示</UButton>
      <UButton size="sm" variant="danger" @click="fire('error')">触发失败提示</UButton>
      <UButton size="sm" variant="outline" @click="fire('info')">触发信息提示</UButton>
    </div>
    <p class="mt-3 text-xs text-zinc-500">3 秒后自动消失（duration=0 时需手动关闭），Toast 渲染在页面底部居中。</p>

    <UToast v-model="show" :tone="tone" :title="title" :description="description" />
  </div>
</template>
