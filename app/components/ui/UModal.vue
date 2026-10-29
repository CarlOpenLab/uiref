<script setup lang="ts">
interface Props {
  title?: string
}

const props = defineProps<Props>()

const open = defineModel<boolean>({ default: false })
</script>

<template>
  <Teleport to="body">
    <Transition name="u-modal">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div class="absolute inset-0 bg-zinc-950/50" @click="open = false" />
        <div class="relative w-full max-w-md rounded-xl border border-zinc-200 bg-white shadow-xl">
          <div class="flex items-center justify-between px-6 pt-5">
            <h3 class="font-semibold text-zinc-900">{{ title }}</h3>
            <button
              type="button"
              class="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
              aria-label="关闭"
              @click="open = false"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4 text-sm leading-relaxed text-zinc-600">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex justify-end gap-2 border-t border-zinc-100 px-6 py-4">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
