'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ArrowDown, HardHat, Leaf, ShieldCheck, Wrench, Wind, Zap, ThermometerSnowflake } from 'lucide-react'

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
    icon: ThermometerSnowflake,
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
  const ctaRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  // Carousel Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselSlides.length)
    }, 5000) // Change slide every 5 seconds

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
        zIndex: isCurrent ? 1 : 0,
        duration: 1.5,
        ease: 'power2.inOut'
      })

      // Scale Effect for Active Image
      if (isCurrent) {
        const img = slide.querySelector('.slide-image')
        if (img) {
          gsap.fromTo(img,
            { scale: 1.2 },
            { scale: 1, duration: 6, ease: 'power1.out' }
          )
        }
      }
    })
  }, [activeIndex])

  // Entrance Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(eyebrowRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 0.5
    })
      .from(headlineRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, '-=0.4')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.trust-feature', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      }, '-=0.2')

  }, { scope: containerRef })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-slate-950"
    >
      {/* Full Screen Background Carousel */}
      <div className="absolute inset-0 z-0">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => { slideRefs.current[index] = el }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ opacity: index === 0 ? 1 : 0, zIndex: index === 0 ? 1 : 0 }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="slide-image object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 z-[2]" />
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 flex flex-col items-center text-center pt-20">

        {/* Eyebrow */}
        <div ref={eyebrowRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wide shadow-2xl">
            <span className="animate-pulse">❄️</span> #1 Rated HVAC Engineering
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight max-w-5xl">
          Engineering Perfect <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            Indoor Comfort.
          </span>
        </h1>

        {/* Carousel Slide Title/Desc Overlay (Subtle) */}
        <div className="mb-10 h-12 relative w-full">
          {carouselSlides.map((slide, idx) => (
            <p 
              key={slide.id}
              className={`text-lg md:text-xl text-slate-300 font-medium transition-all duration-1000 absolute left-1/2 -translate-x-1/2 w-full ${
                idx === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {slide.desc}
            </p>
          ))}
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 mb-20 w-full sm:w-auto">
          <a
            href="https://wa.me/919824653242"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
          >
            Get Free Site Inspection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="#services"
            className="group px-10 py-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-3 text-lg"
          >
            Explore Services
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-blue-400" />
          </Link>
        </div>

        {/* Trust Features */}
        <div ref={featuresRef} className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {[
            { icon: HardHat, title: "Expert Engineers", desc: "Qualified professionals, not just mechanics.", color: "text-blue-400" },
            { icon: Leaf, title: "Energy Efficient", desc: "Right-sized systems for lower bills.", color: "text-emerald-400" },
            { icon: ShieldCheck, title: "Reliable Support", desc: "Comprehensive after-sales care.", color: "text-indigo-400" }
          ].map((f, i) => (
            <div key={i} className="trust-feature group bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 cursor-default">
              <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform duration-500`}>
                <f.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="mt-12 flex gap-3">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === activeIndex ? 'w-10 bg-blue-500' : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
