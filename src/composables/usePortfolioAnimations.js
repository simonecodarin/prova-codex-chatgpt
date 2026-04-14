import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let scrollTriggers = []

gsap.registerPlugin(ScrollTrigger)

function track(animation) {
  if (animation?.scrollTrigger) scrollTriggers.push(animation.scrollTrigger)
}

export async function initGlobalScroll(rootRef) {
  try {
    const Lenis = (await import('lenis')).default
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, smoothTouch: false })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  } catch {
    // fallback
  }

  gsap.from('.hero-title span', {
    opacity: 0,
    y: 44,
    rotateX: -80,
    transformOrigin: '50% 100%',
    stagger: 0.06,
    duration: 0.95,
    ease: 'back.out(1.4)',
    delay: 0.2,
  })

  gsap.from('.wow-pop', {
    scale: 0.7,
    opacity: 0,
    stagger: 0.1,
    duration: 0.9,
    ease: 'expo.out',
    delay: 0.3,
  })

  gsap.to('.floaty', {
    y: -8,
    duration: 2.4,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
    stagger: 0.2,
  })

  gsap.utils.toArray('.reveal-card').forEach((card, idx) => {
    const anim = gsap.from(card, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 0.9,
      ease: 'power3.out',
      delay: idx % 3 === 0 ? 0 : 0.08,
      scrollTrigger: {
        trigger: card,
        start: 'top 83%',
      },
    })
    track(anim)
  })

  gsap.utils.toArray('.timeline-item').forEach((item) => {
    const anim = gsap.from(item, {
      opacity: 0,
      x: -35,
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
    })
    track(anim)
  })

  gsap.utils.toArray('.skill-fill').forEach((bar) => {
    const value = Number(bar.dataset.value || 0)
    const anim = gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width: `${value}%`,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 92%',
        },
      },
    )
    track(anim)
  })

  gsap.utils.toArray('.parallax-block').forEach((block) => {
    const anim = gsap.to(block, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    track(anim)
  })

  if (rootRef?.value) {
    gsap.from('.fade-up', {
      opacity: 0,
      y: 28,
      stagger: 0.07,
      duration: 0.8,
      ease: 'power2.out',
    })
  }
}

export function cleanupGlobalScroll() {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
}
