<template>
  <div class="w-full max-w-xl space-y-8">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">Agent 回复加载中</h3>
      <div class="mt-3 flex gap-3">
        <USkeleton class="size-8 shrink-0 rounded-lg" />
        <div class="w-full max-w-sm space-y-2.5">
          <USkeleton class="h-4 w-2/3" />
          <USkeleton class="h-4 w-full" />
          <USkeleton class="h-4 w-5/6" />
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">卡片加载中</h3>
      <div class="mt-3 grid max-w-md gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-zinc-200 bg-white p-4">
          <USkeleton class="h-24 w-full rounded-lg" />
          <USkeleton class="mt-3 h-4 w-3/4" />
          <USkeleton class="mt-2 h-4 w-1/2" />
        </div>
        <div class="rounded-xl border border-zinc-200 bg-white p-4">
          <USkeleton class="h-24 w-full rounded-lg" />
          <USkeleton class="mt-3 h-4 w-2/3" />
          <USkeleton class="mt-2 h-4 w-1/3" />
        </div>
      </div>
    </section>
  </div>
</template>
