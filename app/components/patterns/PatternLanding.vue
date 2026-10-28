<template>
  <div class="flex h-full min-h-[620px] flex-col bg-white text-zinc-900">
    <!-- 顶栏 -->
    <header class="flex h-14 shrink-0 items-center gap-6 border-b border-zinc-100 px-6">
      <span class="flex items-center gap-2">
        <span class="flex size-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">N</span>
        <span class="text-sm font-semibold">Nova</span>
      </span>
      <nav class="hidden gap-5 text-sm text-zinc-600 sm:flex">
        <a href="#" class="hover:text-zinc-900">产品</a>
        <a href="#" class="hover:text-zinc-900">定价</a>
        <a href="#" class="hover:text-zinc-900">文档</a>
      </nav>
      <div class="ml-auto flex items-center gap-2">
        <UButton variant="ghost" size="sm">登录</UButton>
        <UButton size="sm">开始使用</UButton>
      </div>
    </header>

    <!-- Hero -->
    <section class="shrink-0 px-6 pb-14 pt-16 text-center">
      <UBadge tone="indigo">v3.0 现已发布</UBadge>
      <h1 class="mx-auto mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        让团队协作像说话一样简单
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-500">
        Nova 把需求、设计、代码和发布放进同一个工作流，你的团队只需要专注真正重要的事。
      </p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <UButton size="lg">免费开始试用</UButton>
        <UButton size="lg" variant="outline">预约演示</UButton>
      </div>
      <p class="mt-4 text-xs text-zinc-400">无需信用卡 · 5 分钟完成配置</p>
    </section>

    <!-- 客户 Logo -->
    <section class="shrink-0 border-y border-zinc-100 px-6 py-6">
      <div class="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span class="text-sm font-semibold text-zinc-300">Acme</span>
        <span class="text-sm font-semibold text-zinc-300">Globex</span>
        <span class="text-sm font-semibold text-zinc-300">Initech</span>
        <span class="text-sm font-semibold text-zinc-300">Umbrella</span>
        <span class="text-sm font-semibold text-zinc-300">Stark</span>
      </div>
    </section>

    <!-- 特性 -->
    <section class="shrink-0 px-6 py-14">
      <h2 class="text-center text-2xl font-bold">为什么选择 Nova</h2>
      <div class="mx-auto mt-8 grid max-w-4xl gap-5 sm:grid-cols-3">
        <UCard>
          <span class="flex size-9 items-center justify-center rounded-lg bg-indigo-50">
            <svg class="size-4.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
            </svg>
          </span>
          <h3 class="mt-3 font-semibold">实时协同</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">光标级同步，编辑冲突自动合并。</p>
        </UCard>
        <UCard>
          <span class="flex size-9 items-center justify-center rounded-lg bg-indigo-50">
            <svg class="size-4.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </span>
          <h3 class="mt-3 font-semibold">工作流编排</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">拖拽即可把需求流转成可执行的任务。</p>
        </UCard>
        <UCard>
          <span class="flex size-9 items-center justify-center rounded-lg bg-indigo-50">
            <svg class="size-4.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
            </svg>
          </span>
          <h3 class="mt-3 font-semibold">企业级安全</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-zinc-500">SOC2 合规，数据全程加密存储。</p>
        </UCard>
      </div>
    </section>

    <!-- CTA -->
    <section class="shrink-0 px-6 pb-14">
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl bg-indigo-600 px-6 py-10 text-center">
        <h2 class="text-2xl font-bold text-white">准备好开始了吗？</h2>
        <p class="text-sm text-indigo-100">14 天全功能试用，随时取消。</p>
        <UButton size="lg" class="mt-2 bg-white text-indigo-700 hover:bg-indigo-50 active:bg-indigo-100">
          创建团队工作区
        </UButton>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="mt-auto shrink-0 border-t border-zinc-100 px-6 py-6">
      <div class="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 text-xs text-zinc-400 sm:flex-row">
        <span>© 2026 Nova Labs</span>
        <div class="flex gap-5">
          <a href="#" class="hover:text-zinc-600">服务条款</a>
          <a href="#" class="hover:text-zinc-600">隐私政策</a>
          <a href="#" class="hover:text-zinc-600">联系我们</a>
        </div>
      </div>
    </footer>
  </div>
</template>
