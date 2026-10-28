<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <section class="rounded-xl border border-zinc-200 bg-white shadow-sm">
    <header v-if="title || description || $slots.header" class="px-6 pt-5">
      <slot name="header">
        <h3 class="font-semibold text-zinc-900">{{ title }}</h3>
        <p v-if="description" class="mt-1 text-sm text-zinc-500">{{ description }}</p>
      </slot>
    </header>
    <div class="p-6">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="rounded-b-xl border-t border-zinc-100 bg-zinc-50/60 px-6 py-4">
      <slot name="footer" />
    </footer>
  </section>
</template>
