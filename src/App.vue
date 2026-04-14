<script setup>
import { onUnmounted, ref, watch } from 'vue'
import TerminalPreloader from './components/TerminalPreloader.vue'
import TopNav from './components/TopNav.vue'
import SiteBackground from './components/SiteBackground.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import SiteFooter from './components/SiteFooter.vue'
import { cleanupGlobalScroll, initGlobalScroll } from './composables/usePortfolioAnimations'

const ready = ref(false)
const animationsStarted = ref(false)
const isDark = ref(true)
const rootRef = ref(null)

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
}, { immediate: true })

watch(ready, async (isReady) => {
  if (!isReady || animationsStarted.value) return
  animationsStarted.value = true
  await initGlobalScroll(rootRef)
})

onUnmounted(() => {
  cleanupGlobalScroll()
})
</script>

<template>
  <div ref="rootRef">
    <SiteBackground />
    <TerminalPreloader v-if="!ready" @done="ready = true" />
    <TopNav :is-dark="isDark" @toggle-theme="isDark = !isDark" />

    <main class="relative z-10">
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <PortfolioSection />
      <SkillsSection />
      <SiteFooter />
    </main>
  </div>
</template>
