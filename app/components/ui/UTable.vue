<script setup lang="ts">
interface TableColumn {
  key: string
  title: string
  width?: string
}

interface Props {
  columns: TableColumn[]
  rows: Record<string, unknown>[]
  /** 空状态文案 */
  empty?: string
}

withDefaults(defineProps<Props>(), {
  empty: '暂无数据',
})
</script>

<template>
  <div class="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-zinc-200 bg-zinc-50 text-xs tracking-wide text-zinc-500">
          <th
            v-for="col in columns"
            :key="col.key"
            class="px-4 py-3 font-medium"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="border-b border-zinc-100 last:border-0 hover:bg-zinc-50"
        >
          <td v-for="col in columns" :key="col.key" class="px-4 py-3 text-zinc-700">
            <!-- 单元格插槽：#cell-<key> 可完全自定义某一列 -->
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length" class="px-4 py-10 text-center text-sm text-zinc-400">
            {{ empty }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
