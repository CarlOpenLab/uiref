<script setup lang="ts">
const nav = [
  { label: '概览', active: true },
  { label: '订单', active: false },
  { label: '客户', active: false },
  { label: '商品', active: false },
  { label: '设置', active: false },
]

const stats = [
  { label: '今日营收', value: '¥ 12,480', delta: '+12.4%', up: true },
  { label: '新增订单', value: '328', delta: '+6.2%', up: true },
  { label: '活跃用户', value: '8,941', delta: '-1.8%', up: false },
  { label: '退款率', value: '0.8%', delta: '+0.1%', up: false },
]

const columns = [
  { key: 'order', title: '订单号', width: '120px' },
  { key: 'customer', title: '客户' },
  { key: 'channel', title: '渠道' },
  { key: 'amount', title: '金额', width: '120px' },
  { key: 'status', title: '状态', width: '100px' },
]

const rows = [
  { order: '#10241', customer: '陈晨', channel: '小程序', amount: '¥ 1,280.00', status: 'paid' },
  { order: '#10242', customer: '李斯', channel: 'Web', amount: '¥ 86.50', status: 'pending' },
  { order: '#10243', customer: '王武', channel: 'App', amount: '¥ 3,406.00', status: 'paid' },
  { order: '#10244', customer: '赵柳', channel: '小程序', amount: '¥ 299.00', status: 'refunded' },
]

const search = ref('')

const statusLabel: Record<string, { label: string; tone: 'green' | 'amber' | 'red' }> = {
  paid: { label: '已支付', tone: 'green' },
  pending: { label: '待支付', tone: 'amber' },
  refunded: { label: '已退款', tone: 'red' },
}
</script>

<template>
  <div class="flex min-h-[560px] bg-zinc-50 text-zinc-900">
    <!-- 侧边栏 -->
    <aside class="hidden w-52 shrink-0 flex-col border-r border-zinc-200 bg-white p-4 sm:flex">
      <div class="flex items-center gap-2 px-2 py-1.5">
        <span class="flex size-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">A</span>
        <span class="text-sm font-semibold">Acme 控制台</span>
      </div>
      <nav class="mt-6 flex-1 space-y-1">
        <button
          v-for="item in nav"
          :key="item.label"
          type="button"
          class="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
          :class="item.active ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-zinc-600 hover:bg-zinc-100'"
        >
          <span class="size-1.5 rounded-full bg-current" aria-hidden="true" />
          {{ item.label }}
        </button>
      </nav>
      <div class="flex items-center gap-2.5 border-t border-zinc-100 px-2 pt-4">
        <span class="flex size-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">陈</span>
        <div class="text-xs">
          <p class="font-medium text-zinc-900">陈晨</p>
          <p class="text-zinc-400">管理员</p>
        </div>
      </div>
    </aside>

    <!-- 主区域 -->
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex h-14 items-center gap-4 border-b border-zinc-200 bg-white px-6">
        <h1 class="text-sm font-semibold">概览</h1>
        <UInput v-model="search" size="sm" placeholder="搜索订单、客户…" class="ml-auto w-56" />
        <UButton size="sm">新建订单</UButton>
      </header>

      <main class="flex-1 space-y-8 overflow-auto p-6">
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="stat in stats" :key="stat.label" class="rounded-xl border border-zinc-200 bg-white p-5">
            <p class="text-sm text-zinc-500">{{ stat.label }}</p>
            <p class="mt-2 text-2xl font-bold">{{ stat.value }}</p>
            <div class="mt-3">
              <UBadge :tone="stat.up ? 'green' : 'red'" dot size="sm">{{ stat.delta }}</UBadge>
            </div>
          </div>
        </div>

        <section>
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold">最近订单</h2>
            <a href="#" class="text-sm text-indigo-600 hover:underline">查看全部</a>
          </div>
          <UTable class="mt-3" :columns="columns" :rows="rows">
            <template #cell-status="{ value }">
              <UBadge :tone="statusLabel[value as string]!.tone" dot size="sm">
                {{ statusLabel[value as string]!.label }}
              </UBadge>
            </template>
          </UTable>
        </section>
      </main>
    </div>
  </div>
</template>
