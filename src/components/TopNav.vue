<script setup>
import { Menu, Moon, Sun } from 'lucide-vue-next'

defineProps({
  isDark: Boolean,
})

const emit = defineEmits(['toggle-theme'])

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Chi Sono', href: '#about' },
  { label: 'Esperienza', href: '#experience' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contatti', href: '#footer' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-40 mx-auto mt-4 flex w-[95%] max-w-6xl items-center justify-between rounded-2xl border border-slate-300/20 px-4 py-3 glass-card reveal-card">
    <div class="flex items-center gap-2 font-semibold">
      <Menu class="h-4 w-4 text-[var(--accent-primary)]" />
      <span>Simone.dev</span>
    </div>
    <nav class="hidden gap-5 text-sm md:flex">
      <a v-for="link in links" :key="link.href" :href="link.href" class="transition hover:text-[var(--accent-primary)]">{{ link.label }}</a>
    </nav>
    <button
      class="rounded-xl border border-slate-300/20 p-2 transition hover:scale-105"
      @click="emit('toggle-theme')"
      aria-label="toggle theme"
    >
      <Sun v-if="isDark" class="h-4 w-4 text-amber-300" />
      <Moon v-else class="h-4 w-4 text-[var(--accent-primary)]" />
    </button>
  </header>
</template>
