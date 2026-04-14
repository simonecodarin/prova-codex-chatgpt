import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let scrollTriggers = []
let cleanupLenis = null

function track(animation) {
  if (animation?.scrollTrigger) scrollTriggers.push(animation.scrollTrigger)
}

function animateOnEnter(target, vars, triggerOptions = {}) {
  const animation = gsap.from(target, {
    ...vars,
    immediateRender: false,
    scrollTrigger: {
      trigger: target,
      start: 'top 84%',
      once: true,
      ...triggerOptions,
    },
  })
  track(animation)
}

async function initLenis() {
  try {
    const Lenis = (await import('lenis')).default
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, smoothTouch: false })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    cleanupLenis = () => {
      gsap.ticker.remove(tick)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  } catch {
    cleanupLenis = null
  }
}

export async function initGlobalScroll(rootRef) {
  await initLenis()

  gsap.set(['.hero-title span', '.wow-pop'], { clearProps: 'all' })

  gsap.from('.hero-title span', {
    opacity: 0,
    y: 40,
    rotateX: -55,
    transformOrigin: '50% 100%',
    stagger: 0.05,
    duration: 0.85,
    ease: 'back.out(1.35)',
  })

  gsap.from('.wow-pop', {
    opacity: 0,
    scale: 0.88,
    y: 14,
    stagger: 0.08,
    duration: 0.65,
    ease: 'power3.out',
    delay: 0.2,
  })

  gsap.to('.floaty', {
    y: -8,
    duration: 2.2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    stagger: 0.2,
  })

  gsap.utils.toArray('.reveal-card').forEach((card) => {
    animateOnEnter(card, {
      opacity: 0,
      y: 46,
      scale: 0.97,
      duration: 0.75,
      ease: 'power2.out',
    })
  })

  gsap.utils.toArray('.timeline-item').forEach((item) => {
    animateOnEnter(
      item,
      {
        opacity: 0,
        x: -26,
        duration: 0.8,
        ease: 'power2.out',
      },
      { start: 'top 80%' },
    )
  })

  gsap.utils.toArray('.skill-fill').forEach((bar) => {
    const value = Number(bar.dataset.value || 0)
    const animation = gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width: `${value}%`,
        duration: 1.2,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: bar,
          start: 'top 92%',
          once: true,
        },
      },
    )
    track(animation)
  })

  gsap.utils.toArray('.parallax-block').forEach((block) => {
    const animation = gsap.to(block, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    track(animation)
  })

  if (rootRef?.value) {
    gsap.from('.fade-up', {
      opacity: 0,
      y: 22,
      stagger: 0.06,
      duration: 0.62,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
    })
  }

  ScrollTrigger.refresh()
}

export function cleanupGlobalScroll() {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
  if (cleanupLenis) {
    cleanupLenis()
    cleanupLenis = null
  }
}
