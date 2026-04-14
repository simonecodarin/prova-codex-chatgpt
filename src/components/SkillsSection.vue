<script setup>
const skillGroups = {
  Frontend: [
    { name: 'Vue 3', value: 92 },
    { name: 'Tailwind CSS', value: 88 },
    { name: 'GSAP', value: 84 },
  ],
  Backend: [
    { name: 'ASP.NET Core', value: 90 },
    { name: 'Microservices', value: 82 },
    { name: 'REST APIs', value: 91 },
  ],
  Database: [
    { name: 'SQL Server', value: 89 },
    { name: 'PostgreSQL', value: 76 },
    { name: 'Redis', value: 68 },
  ],
}
</script>

<template>
  <section id="skills" class="mx-auto w-[95%] max-w-6xl py-20">
    <h2 class="section-title">Skills</h2>
    <div class="grid gap-6 md:grid-cols-3">
      <div v-for="(skills, groupName) in skillGroups" :key="groupName" class="glass-card rounded-3xl p-6">
        <h3 class="mb-5 text-xl font-semibold">{{ groupName }}</h3>
        <div class="space-y-4">
          <div v-for="skill in skills" :key="skill.name">
            <div class="mb-1 flex justify-between text-sm">
              <span>{{ skill.name }}</span>
              <span>{{ skill.value }}%</span>
            </div>
            <div class="h-2 rounded bg-slate-400/20">
              <div class="skill-fill h-full rounded bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" :data-value="skill.value" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
