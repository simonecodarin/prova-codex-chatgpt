<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['done'])
const progress = ref(0)
const preloaderRef = ref(null)
const lines = ref([])
const bootSequence = [
  '[BOOT] Initializing development environment...',
  '[OK] Loading Vue modules...',
  '[OK] Syncing microservices map...',
  '[OK] Building UI rendering pipeline...',
  '[OK] Launching portfolio engine...',
]

onMounted(() => {
  bootSequence.forEach((line, index) => {
    gsap.delayedCall(index * 0.35, () => {
      lines.value.push(line)
    })
  })

  gsap.to(progress, {
    value: 100,
    duration: 2.6,
    ease: 'power2.inOut',
    snap: { value: 1 },
    onComplete: () => {
      gsap.to(preloaderRef.value, {
        yPercent: -100,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => emit('done'),
      })
    },
  })
})
</script>

<template>
  <section ref="preloaderRef" class="fixed inset-0 z-50 flex flex-col justify-between bg-black p-6 font-mono text-emerald-300 md:p-10">
    <div>
      <p class="mb-6 text-sm text-emerald-400">$ boot --portfolio simone</p>
      <p v-for="line in lines" :key="line" class="mb-2 text-xs md:text-sm">{{ line }}</p>
    </div>
    <div class="space-y-3">
      <div class="h-2 w-full overflow-hidden rounded bg-emerald-900/80">
        <div class="h-full bg-emerald-400" :style="{ width: `${progress}%` }" />
      </div>
      <p class="text-right text-lg">{{ progress }}%</p>
    </div>
  </section>
</template>
