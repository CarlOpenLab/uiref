<template>
  <div class="min-h-screen bg-zinc-50 text-zinc-900 antialiased">
    <SiteHeader />
    <main class="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </main>
    <SiteFooter />
  </div>
</template>
