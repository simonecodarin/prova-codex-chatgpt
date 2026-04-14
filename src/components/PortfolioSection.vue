<script setup>
import { CodeXml, Database, Layers3 } from 'lucide-vue-next'

const projects = [
  { name: 'Finance Dashboard', desc: 'Analytics in tempo reale con grafici e report personalizzati.', icons: [CodeXml, Database] },
  { name: 'Microservice Hub', desc: 'Gateway e orchestrazione servizi per ecosistema enterprise.', icons: [Layers3, Database] },
  { name: 'UX Booking App', desc: 'Web app booking orientata a conversione e performance.', icons: [CodeXml, Layers3] },
]

function handleTilt(event) {
  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  const rx = ((y / rect.height) - 0.5) * -10
  const ry = ((x / rect.width) - 0.5) * 10
  card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`
}

function resetTilt(event) {
  event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)'
}
</script>

<template>
  <section id="portfolio" class="mx-auto w-[95%] max-w-6xl py-20">
    <h2 class="section-title">Portfolio</h2>
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="project in projects"
        :key="project.name"
        class="glass-card reveal-card rounded-3xl p-6 transition duration-300"
        @mousemove="handleTilt"
        @mouseleave="resetTilt"
      >
        <h3 class="mb-2 text-xl font-semibold">{{ project.name }}</h3>
        <p class="mb-4 text-[var(--text-secondary)]">{{ project.desc }}</p>
        <div class="flex gap-3">
          <component :is="icon" v-for="(icon, idx) in project.icons" :key="idx" class="h-5 w-5 text-[var(--accent-primary)]" />
        </div>
      </article>
    </div>
  </section>
</template>
