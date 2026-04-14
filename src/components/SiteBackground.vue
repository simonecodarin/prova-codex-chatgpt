<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const canvasRef = ref(null)
let animationFrame
let ctx
let particles = []

function buildParticles(width, height) {
  particles = Array.from({ length: Math.min(90, Math.floor(width / 18)) }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.8 + 0.7,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
  }))
}

function draw() {
  if (!ctx || !canvasRef.value) return
  const { width, height } = canvasRef.value
  ctx.clearRect(0, 0, width, height)

  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0 || p.x > width) p.vx *= -1
    if (p.y < 0 || p.y > height) p.vy *= -1

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(56,189,248,0.24)'
    ctx.fill()
  })

  animationFrame = requestAnimationFrame(draw)
}

function resizeCanvas() {
  if (!canvasRef.value) return
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = document.body.scrollHeight
  buildParticles(canvas.width, canvas.height)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resizeCanvas()
  draw()
  gsap.to('.grid-overlay', { backgroundPosition: '200px 200px', repeat: -1, duration: 20, ease: 'none' })
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div class="grid-overlay absolute inset-0 opacity-35" />
    <canvas ref="canvasRef" class="h-full w-full" />
  </div>
</template>

<style scoped>
.grid-overlay {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
