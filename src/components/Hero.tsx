'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ArrowDown, HardHat, Leaf, ShieldCheck, Activity, Wrench, Wind, Zap, ThermometerSnowflake } from 'lucide-react'

const carouselSlides = [
  {
    id: 1,
    title: "Precision VRF",
    desc: "Expert design & installation.",
    image: "/nopparuj-lamaikul-FQNLeYAgBZg-unsplash.jpg",
    icon: Zap,
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "Annual Maintenance",
    desc: "Proactive system care.",
    image: "/raymond-yeung--BWDRf_mG9Q-unsplash.jpg",
    icon: ThermometerSnowflake, // Need to import this
    color: "bg-emerald-600"
  },
  {
    id: 3,
    title: "Rapid Repair",
    desc: "24/7 Emergency support.",
    image: "/kettenreaktion-l_Vn4HlFQVw-unsplash.jpg",
    icon: Wrench,
    color: "bg-orange-500"
  },
  {
    id: 4,
    title: "Indoor Air Quality",
    desc: "Healthy, clean environments.",
    image: "/healthy-duct-cleaning-xnqyNSf0nck-unsplash.jpg",
    icon: Wind,
    color: "bg-cyan-500"
  }
]

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)

  // Refs for animation targets
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const visualContainerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  // Carousel Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselSlides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Carousel Animation Effect
  useGSAP(() => {
    carouselSlides.forEach((_, index) => {
      const slide = slideRefs.current[index]
      if (!slide) return

      const isCurrent = index === activeIndex

      // Image Animation
      gsap.to(slide, {
        opacity: isCurrent ? 1 : 0,
        zIndex: isCurrent ? 10 : 0,
        duration: 1,
        ease: 'power2.inOut'
      })

      // Scale Effect for Active Image
      if (isCurrent) {
        gsap.fromTo(slide.querySelector('.slide-image'),
          { scale: 1.1 },
          { scale: 1, duration: 4, ease: 'none' }
        )

        // Text Reveal
        gsap.fromTo(slide.querySelectorAll('.slide-text'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
        )
      }
    })
  }, [activeIndex]) // Re-run when activeIndex changes

  // Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(eyebrowRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
    })
      .from(headlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1
      }, '-=0.6')
      .from(visualContainerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.05)',
      }, '-=0.6')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.6')
      .from('.trust-feature', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        clearProps: 'all'
      }, '-=0.4')

  }, { scope: containerRef })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative pt-24 pb-12 px-6 bg-slate-50 min-h-[90vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background decoration: Engineering Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
        }}
      />

      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-4 relative z-20">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 text-slate-700 text-sm font-bold tracking-wide shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span>❄️</span> #1 Rated HVAC Engineering
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 mb-8 leading-[0.95] tracking-tight max-w-5xl relative z-20">
          Engineering Perfect <br />
          <span className="bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Indoor Comfort.
          </span>
        </h1>

        {/* Central Visual Carousel Container */}
        <div
          ref={visualContainerRef}
          className="relative w-full max-w-4xl h-[320px] md:h-[480px] mb-12 z-10 touch-pan-y rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-100"
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => { slideRefs.current[index] = el }}
              className="absolute inset-0 w-full h-full bg-slate-900"
              style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 10 : 0 }}
            >
              {/* Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="slide-image object-cover opacity-80"
                priority={index === 0}
              />

              {/* Grading Ovl */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-left flex items-end justify-between">
                <div>
                  <div className="overflow-hidden mb-2">
                    <span className={`slide-text inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-2 ${slide.color}`}>
                      {slide.title}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="slide-text text-3xl md:text-5xl font-bold text-white leading-tight">
                      {slide.desc}
                    </h3>
                  </div>
                </div>

                {/* Icon Badge */}
                <div className="slide-text hidden md:flex w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white">
                  <slide.icon className="w-8 h-8" />
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Indicators - Custom Pill Style */}
          <div className="absolute bottom-6 left-8 md:bottom-8 md:left-12 flex gap-3 z-30">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-500 ease-out ${idx === activeIndex
                  ? 'w-12 bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto z-20">
          <Link
            href="#services"
            className="group px-8 py-3.5 rounded-full border border-slate-200 bg-white/60 backdrop-blur-sm text-slate-700 font-semibold hover:bg-white hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            Explore Services
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-slate-400 group-hover:text-slate-600" />
          </Link>
          <Link
            href="#contact"
            className="group px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Get Free Site Inspection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust Features (Feature Cards) */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full z-20 relative px-4">

          {/* Feature 1 */}
          <div className="trust-feature group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 cursor-default relative overflow-hidden">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform relative z-10">
              <HardHat className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-0.5">Expert Engineers</h3>
              <p className="text-slate-500 text-sm leading-snug">
                Qualified professionals,<br /> not just mechanics.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="trust-feature group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 cursor-default relative overflow-hidden">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform relative z-10">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-0.5">Energy Efficient</h3>
              <p className="text-slate-500 text-sm leading-snug">
                Right-sized systems for<br /> lower bills.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="trust-feature group bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 cursor-default relative overflow-hidden">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform relative z-10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-0.5">Reliable Support</h3>
              <p className="text-slate-500 text-sm leading-snug">
                Comprehensive<br /> after-sales care.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
