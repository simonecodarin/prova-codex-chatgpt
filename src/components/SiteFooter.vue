<script setup>
import { Github, Linkedin, Mail } from 'lucide-vue-next'
</script>

<template>
  <footer id="footer" class="mx-auto mb-10 mt-12 w-[95%] max-w-6xl rounded-3xl glass-card reveal-card px-6 py-10">
    <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h3 class="text-xl font-semibold">Contatti</h3>
        <p class="text-[var(--text-secondary)]">simone.dev@email.com</p>
      </div>
      <div class="flex gap-3">
        <a href="#" class="rounded-xl border border-slate-300/20 p-2 transition hover:-translate-y-1"><Github class="h-5 w-5" /></a>
        <a href="#" class="rounded-xl border border-slate-300/20 p-2 transition hover:-translate-y-1"><Linkedin class="h-5 w-5" /></a>
        <a href="mailto:simone.dev@email.com" class="rounded-xl border border-slate-300/20 p-2 transition hover:-translate-y-1"><Mail class="h-5 w-5" /></a>
      </div>
    </div>
  </footer>
</template>
