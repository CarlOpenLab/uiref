<template>
  <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
    <UBrowserStep :step="3" action="点击「登录」按钮" url="https://app.example.com/login" status="running">
      <!-- 模拟页面快照 -->
      <div class="absolute inset-3 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div class="flex gap-1.5 border-b border-zinc-100 px-3 py-2">
          <span class="size-2 rounded-full bg-zinc-300" />
          <span class="size-2 rounded-full bg-zinc-300" />
          <span class="size-2 rounded-full bg-zinc-300" />
        </div>
        <div class="space-y-2 p-4">
          <div class="h-3 w-1/3 rounded bg-zinc-200" />
          <div class="h-2 w-2/3 rounded bg-zinc-100" />
          <div class="h-2 w-1/2 rounded bg-zinc-100" />
        </div>
      </div>
      <!-- 目标高亮框 -->
      <div class="absolute left-[38%] top-[58%] h-8 w-24 rounded-lg border-2 border-indigo-500 ring-4 ring-indigo-500/20">
        <span class="absolute -top-6 left-0 rounded bg-indigo-500 px-1.5 py-0.5 text-[10px] font-medium text-white">登录</span>
      </div>
    </UBrowserStep>

    <UBrowserStep :step="4" action="输入邮箱并提交表单" url="https://app.example.com/login" status="done">
      <div class="absolute inset-3 overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div class="flex gap-1.5 border-b border-zinc-100 px-3 py-2">
          <span class="size-2 rounded-full bg-zinc-300" />
          <span class="size-2 rounded-full bg-zinc-300" />
          <span class="size-2 rounded-full bg-zinc-300" />
        </div>
        <div class="space-y-2 p-4">
          <div class="h-3 w-1/4 rounded bg-zinc-200" />
          <div class="h-2 w-3/4 rounded bg-zinc-100" />
          <div class="h-8 w-1/2 rounded-lg bg-zinc-100" />
        </div>
      </div>
    </UBrowserStep>
  </div>
</template>
