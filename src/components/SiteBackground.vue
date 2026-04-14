<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const canvasRef = ref(null)
let ctx
let rafId
let nodes = []
let floatTween

function createNodes(width, height) {
  const spacing = Math.max(90, Math.floor(width / 14))
  const cols = Math.ceil(width / spacing) + 1
  const rows = Math.ceil(height / spacing) + 1

  nodes = []
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      nodes.push({
        x: x * spacing + (Math.random() * 14 - 7),
        y: y * spacing + (Math.random() * 14 - 7),
        ox: x * spacing,
        oy: y * spacing,
        pulse: Math.random() * Math.PI * 2,
      })
    }
  }
}

function resizeCanvas() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = Math.max(window.innerHeight, document.body.scrollHeight)
  createNodes(canvasRef.value.width, canvasRef.value.height)
}

function drawWireframe() {
  if (!ctx || !canvasRef.value) return
  const { width, height } = canvasRef.value
  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < nodes.length; i += 1) {
    const n1 = nodes[i]

    n1.pulse += 0.007
    n1.x = n1.ox + Math.cos(n1.pulse) * 5
    n1.y = n1.oy + Math.sin(n1.pulse) * 5

    for (let j = i + 1; j < nodes.length; j += 1) {
      const n2 = nodes[j]
      const dx = n1.x - n2.x
      const dy = n1.y - n2.y
      const dist = Math.hypot(dx, dy)

      if (dist < 130) {
        const alpha = 0.18 - (dist / 130) * 0.16
        ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(alpha, 0.03)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(n1.x, n1.y)
        ctx.lineTo(n2.x, n2.y)
        ctx.stroke()
      }

      if (dist < 96) {
        const n3 = nodes[j + 1]
        if (n3) {
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.07)'
          ctx.beginPath()
          ctx.moveTo(n1.x, n1.y)
          ctx.lineTo(n2.x, n2.y)
          ctx.lineTo(n3.x, n3.y)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }

    ctx.fillStyle = 'rgba(125, 211, 252, 0.28)'
    ctx.beginPath()
    ctx.arc(n1.x, n1.y, 1.1, 0, Math.PI * 2)
    ctx.fill()
  }

  rafId = requestAnimationFrame(drawWireframe)
}

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')
  resizeCanvas()
  drawWireframe()

  floatTween = gsap.to('.polygon-glow', {
    opacity: 0.26,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  })

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (floatTween) floatTween.kill()
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div class="polygon-glow absolute inset-0" />
    <canvas ref="canvasRef" class="h-full w-full" />
  </div>
</template>

<style scoped>
.polygon-glow {
  background:
    radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.16), transparent 45%),
    radial-gradient(circle at 80% 60%, rgba(52, 211, 153, 0.13), transparent 50%);
}
</style>
