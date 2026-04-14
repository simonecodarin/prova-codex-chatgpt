<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const words = ['Vue.js', 'SQL Server', 'Microservices', 'ASP.NET Core', 'UI/UX Design']
const typedWord = ref('')
let intervalId
let wordIndex = 0
let charIndex = 0
let deleting = false

onMounted(() => {
  intervalId = setInterval(() => {
    const current = words[wordIndex]

    if (!deleting) {
      charIndex += 1
      typedWord.value = current.slice(0, charIndex)
      if (charIndex === current.length) deleting = true
    } else {
      charIndex -= 1
      typedWord.value = current.slice(0, charIndex)
      if (charIndex === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
    }
  }, 120)
})

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <section id="hero" class="fade-up relative mx-auto flex min-h-screen w-[95%] max-w-6xl flex-col justify-center pt-24">
    <p class="mb-4 text-sm uppercase tracking-[0.3em] text-[var(--accent-secondary)]">Full Stack Portfolio</p>
    <h1 class="mb-4 text-4xl font-extrabold leading-tight md:text-6xl">Simone - Full Stack Developer</h1>
    <p class="mb-8 max-w-2xl text-lg text-[var(--text-secondary)]">
      Costruisco prodotti scalabili ed esperienze digitali pulite.
      <span class="font-semibold text-[var(--accent-primary)]">{{ typedWord }}</span>
      <span class="animate-pulse">|</span>
    </p>
    <div class="flex flex-wrap gap-4">
      <a href="#about" class="rounded-2xl bg-[var(--accent-primary)] px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-1">Chi Sono</a>
      <a href="#" class="rounded-2xl border border-[var(--accent-primary)] px-6 py-3 font-semibold transition hover:scale-105">Download CV</a>
    </div>
  </section>
</template>
