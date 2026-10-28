<script setup lang="ts">
interface TabItem {
  id: string
  label: string
}

interface Props {
  tabs: TabItem[]
}

defineProps<Props>()

/** 当前激活的 tab id，v-model 双向绑定 */
const active = defineModel<string>({ required: true })
</script>

<template>
  <div class="border-b border-zinc-200">
    <nav class="-mb-px flex gap-1" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="active === tab.id"
        class="rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition-colors"
        :class="
          active === tab.id
            ? 'border-indigo-600 text-indigo-600'
            : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-800'
        "
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>
