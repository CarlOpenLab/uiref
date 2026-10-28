<script setup lang="ts">
interface AttachFile {
  id: string
  name: string
  size?: string
  status?: 'uploading' | 'done' | 'error'
  /** uploading 时的百分比 0-100 */
  progress?: number
  type?: 'image' | 'pdf' | 'code' | 'file'
}

defineProps<{
  files: AttachFile[]
}>()

const emit = defineEmits<{ remove: [file: AttachFile] }>()

const typeMeta: Record<NonNullable<AttachFile['type']>, { icon: 'image' | 'pdf' | 'code' | 'file'; cls: string }> = {
  image: { icon: 'image', cls: 'bg-emerald-50 text-emerald-600' },
  pdf: { icon: 'pdf', cls: 'bg-red-50 text-red-600' },
  code: { icon: 'code', cls: 'bg-indigo-50 text-indigo-600' },
  file: { icon: 'file', cls: 'bg-zinc-100 text-zinc-500' },
}
</script>

<template>
  <ul class="flex flex-wrap gap-2.5">
    <li
      v-for="file in files"
      :key="file.id"
      class="group relative w-64 rounded-xl border border-zinc-200 bg-white p-2.5"
    >
      <div class="flex items-center gap-2.5">
        <span class="flex size-9 shrink-0 items-center justify-center rounded-lg" :class="typeMeta[file.type ?? 'file'].cls">
          <!-- 图片 -->
          <svg v-if="typeMeta[file.type ?? 'file'].icon === 'image'" class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <!-- PDF -->
          <svg v-else-if="typeMeta[file.type ?? 'file'].icon === 'pdf'" class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
            <path d="M9 15h6" />
          </svg>
          <!-- 代码 -->
          <svg v-else-if="typeMeta[file.type ?? 'file'].icon === 'code'" class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m16 18 6-6-6-6" />
            <path d="m8 6-6 6 6 6" />
          </svg>
          <!-- 通用文件 -->
          <svg v-else class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6" />
          </svg>
        </span>

        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-medium text-zinc-900">{{ file.name }}</p>
          <p class="mt-0.5 text-[11px] text-zinc-400">
            <template v-if="file.status === 'error'"><span class="text-red-500">上传失败</span></template>
            <template v-else-if="file.status === 'uploading'">上传中 {{ file.progress ?? 0 }}%</template>
            <template v-else>{{ file.size ?? '已就绪' }}</template>
          </p>
        </div>

        <button
          type="button"
          class="flex size-6 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          aria-label="移除附件"
          @click="emit('remove', file)"
        >
          <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div v-if="file.status === 'uploading'" class="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100">
        <div class="h-full rounded-full bg-indigo-500 transition-all" :style="{ width: `${file.progress ?? 0}%` }" />
      </div>
    </li>
  </ul>
</template>
