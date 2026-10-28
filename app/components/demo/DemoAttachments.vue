<script setup lang="ts">
interface AttachFile {
  id: string
  name: string
  size?: string
  status?: 'uploading' | 'done' | 'error'
  progress?: number
  type?: 'image' | 'pdf' | 'code' | 'file'
}

const files = ref<AttachFile[]>([
  { id: '1', name: 'hero-banner.png', size: '2.4 MB', status: 'done', type: 'image' },
  { id: '2', name: 'pricing-draft.pdf', size: '818 KB', status: 'uploading', progress: 62, type: 'pdf' },
  { id: '3', name: 'PlanCard.vue', size: '3.1 KB', status: 'done', type: 'code' },
  { id: '4', name: '竞品分析.xlsx', status: 'error', type: 'file' },
])

function remove(file: AttachFile) {
  files.value = files.value.filter((item) => item.id !== file.id)
}
</script>

<template>
  <div class="w-full max-w-xl">
    <UAttachments :files="files" @remove="remove" />
    <p class="mt-3 text-xs text-zinc-500">共 {{ files.length }} 个附件，点击右上角 × 可移除。</p>
  </div>
</template>
