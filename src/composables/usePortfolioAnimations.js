import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export async function initGlobalScroll(rootRef) {
  try {
    const Lenis = (await import('lenis')).default
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  } catch {
    // fallback: native smooth scrolling
  }

  gsap.utils.toArray('.timeline-item').forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
    })
  })

  gsap.utils.toArray('.skill-fill').forEach((bar) => {
    const value = Number(bar.dataset.value || 0)
    gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width: `${value}%`,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 90%',
        },
      },
    )
  })

  if (rootRef?.value) {
    gsap.from('.fade-up', {
      opacity: 0,
      y: 25,
      stagger: 0.08,
      duration: 0.7,
      ease: 'power2.out',
    })
  }
}
