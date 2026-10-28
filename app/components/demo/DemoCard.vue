<template>
  <div class="space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">标题 + 描述 + 内容 + 底部操作</h3>
      <UCard
        class="mt-3 max-w-md"
        title="项目成员"
        description="管理谁可以访问这个项目"
      >
        <p class="text-sm leading-relaxed text-zinc-600">
          卡片正文区域。放列表、表单、图表或任意内容，头部与底部都是可选的。
        </p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton variant="ghost" size="sm">取消</UButton>
            <UButton size="sm">保存</UButton>
          </div>
        </template>
      </UCard>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">统计卡片（常见用法）</h3>
      <div class="mt-3 grid max-w-xl gap-4 sm:grid-cols-2">
        <UCard>
          <p class="text-sm text-zinc-500">今日营收</p>
          <p class="mt-2 text-2xl font-bold text-zinc-900">¥ 12,480</p>
          <div class="mt-3">
            <UBadge tone="green" dot size="sm">+12.4%</UBadge>
          </div>
        </UCard>
        <UCard>
          <p class="text-sm text-zinc-500">新增订单</p>
          <p class="mt-2 text-2xl font-bold text-zinc-900">328</p>
          <div class="mt-3">
            <UBadge tone="red" dot size="sm">-1.8%</UBadge>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>
