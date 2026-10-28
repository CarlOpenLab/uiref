<script setup lang="ts">
const devRunning = ref(true)
const devOutput = ref(`Nuxt 4.1.0 10:24:31 AM

➜ Local:    http://localhost:3000/
➜ Network:  use --host to expose`)

function stopDev() {
  devRunning.value = false
  devOutput.value += '\n\n^C  dev server 已停止'
}
</script>

<template>
  <div class="w-full max-w-xl space-y-6">
    <section>
      <h3 class="text-sm font-medium text-zinc-900">已完成的命令</h3>
      <UTerminalBlock
        class="mt-3"
        command="npm install @nuxtjs/tailwindcss"
        duration="6.2s"
        status="success"
        :output="`added 42 packages in 6s

found 0 vulnerabilities`"
      />
    </section>

    <section>
      <h3 class="text-sm font-medium text-zinc-900">运行中（可停止）</h3>
      <UTerminalBlock
        class="mt-3"
        command="npm run dev"
        :status="devRunning ? 'running' : 'success'"
        :output="devOutput"
        @stop="stopDev"
      />
    </section>
  </div>
</template>
