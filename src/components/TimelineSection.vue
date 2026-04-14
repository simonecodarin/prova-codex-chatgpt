<script setup>
const items = [
  {
    title: 'Full Stack Developer',
    subtitle: 'Tech Company · 2023 - Presente',
    text: 'Sviluppo di piattaforme enterprise con Vue 3, ASP.NET Core e integrazioni SQL Server.',
  },
  {
    title: 'Laurea in Informatica',
    subtitle: 'Università · 2020 - 2023',
    text: 'Percorso focalizzato su ingegneria del software, database e architetture distribuite.',
  },
  {
    title: 'Certificazione Cloud & Microservices',
    subtitle: 'Professional Program · 2024',
    text: 'Approfondimento su containerizzazione, CI/CD e pattern per sistemi scalabili.',
  },
]
</script>

<template>
  <section id="experience" class="mx-auto w-[95%] max-w-6xl py-20">
    <h2 class="section-title">Esperienza, Formazione e Certificazioni</h2>
    <div class="relative ml-4 border-l border-[var(--border-soft)] pl-8 md:ml-8">
      <div v-for="item in items" :key="item.title" class="timeline-item relative mb-10">
        <span class="absolute -left-[2.2rem] top-1 h-3 w-3 rounded-full bg-[var(--accent-primary)]" />
        <div class="glass-card rounded-2xl p-6">
          <h3 class="text-xl font-semibold">{{ item.title }}</h3>
          <p class="mb-2 text-sm text-[var(--accent-secondary)]">{{ item.subtitle }}</p>
          <p class="text-[var(--text-secondary)]">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
