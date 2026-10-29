<script setup lang="ts">
const columns = [
  { key: 'order', title: '订单号', width: '120px' },
  { key: 'customer', title: '客户' },
  { key: 'amount', title: '金额', width: '120px' },
  { key: 'status', title: '状态', width: '110px' },
]

const rows = [
  { order: '#10241', customer: '陈晨', amount: '¥ 1,280.00', status: 'paid' },
  { order: '#10242', customer: '李斯', amount: '¥ 86.50', status: 'pending' },
  { order: '#10243', customer: '王武', amount: '¥ 3,406.00', status: 'paid' },
  { order: '#10244', customer: '赵柳', amount: '¥ 299.00', status: 'refunded' },
]

const statusLabel: Record<string, { label: string; tone: 'green' | 'amber' | 'red' }> = {
  paid: { label: '已支付', tone: 'green' },
  pending: { label: '待支付', tone: 'amber' },
  refunded: { label: '已退款', tone: 'red' },
}
</script>

<template>
  <div class="w-full max-w-xl space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">基础表格 + 自定义单元格</h3>
      <UTable class="mt-3" :columns="columns" :rows="rows">
        <template #cell-status="{ value }">
          <UBadge :tone="statusLabel[value as string]!.tone" dot size="sm">
            {{ statusLabel[value as string]!.label }}
          </UBadge>
        </template>
      </UTable>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">空状态</h3>
      <UTable class="mt-3" :columns="columns" :rows="[]" />
    </section>
  </div>
</template>
