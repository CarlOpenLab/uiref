<script setup lang="ts">
const email = ref('')
const password = ref('')
const remember = ref(true)
</script>

<template>
  <div class="flex min-h-[560px] items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-zinc-100 p-6">
    <div class="w-full max-w-sm">
      <div class="mb-6 text-center">
        <span class="mx-auto flex size-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">A</span>
        <h1 class="mt-4 text-xl font-bold text-zinc-900">登录 Acme 控制台</h1>
        <p class="mt-1 text-sm text-zinc-500">使用你的工作邮箱继续</p>
      </div>

      <form class="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm" @submit.prevent>
        <label class="block text-sm font-medium text-zinc-700" for="login-email">邮箱</label>
        <UInput
          id="login-email"
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="mt-1.5"
        />

        <label class="mt-4 block text-sm font-medium text-zinc-700" for="login-password">密码</label>
        <UInput
          id="login-password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          class="mt-1.5"
        />

        <div class="mt-4 flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-zinc-600">
            <input v-model="remember" type="checkbox" class="size-4 rounded border-zinc-300 accent-indigo-600" />
            记住我
          </label>
          <a href="#" class="text-indigo-600 hover:underline">忘记密码？</a>
        </div>

        <UButton type="submit" block class="mt-6">登 录</UButton>

        <div class="my-5 flex items-center gap-3 text-xs text-zinc-400">
          <span class="h-px flex-1 bg-zinc-200" />
          或
          <span class="h-px flex-1 bg-zinc-200" />
        </div>

        <UButton variant="outline" block>
          <svg class="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          使用 GitHub 登录
        </UButton>
      </form>

      <p class="mt-5 text-center text-sm text-zinc-500">
        还没有账号？<a href="#" class="text-indigo-600 hover:underline">立即注册</a>
      </p>
    </div>
  </div>
</template>
