<template>
  <div class="flex min-h-screen flex-col bg-white text-zinc-900 antialiased">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-lg focus:outline-2 focus:outline-indigo-500"
    >
      跳到正文
    </a>
    <SiteHeader />
    <NuxtLayout>
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </NuxtLayout>
    <SiteFooter />
  </div>
</template>
