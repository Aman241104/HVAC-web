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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950"
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
        <div className="absolute inset-0 bg-slate-950/70 z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950 z-[2]" />
        
        {/* Technical Blueprint Grid Mask */}
        <div className="absolute inset-0 z-[3] opacity-[0.15] pointer-events-none" 
             style={{ 
                 backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', 
                 backgroundSize: '60px 60px',
                 maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                 WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 flex flex-col items-center text-center py-20">

        {/* Eyebrow / Badge above text */}
        <div ref={eyebrowRef} className="mb-6 md:mb-10">
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wide shadow-2xl hover:bg-white/20 transition-all cursor-default">
            <span className="animate-pulse">❄️</span> #1 Rated HVAC Engineering
          </span>
        </div>

        {/* Headline - Centered */}
        <h1 ref={headlineRef} className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-[1.05] tracking-tight max-w-6xl mx-auto drop-shadow-2xl">
          Precision HVAC <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]">
            & Cooling Engineering.
          </span>
        </h1>

        {/* Carousel Slide Title/Desc Overlay (Subtle) - Properly positioned below title */}
        <div className="mb-12 md:mb-16 min-h-[5rem] relative w-full flex justify-center">
          {carouselSlides.map((slide, idx) => (
            <div 
              key={slide.id}
              className={`transition-all duration-1000 absolute w-full flex flex-col items-center ${
                idx === activeIndex ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <p className="text-xl md:text-2xl text-blue-400 font-black uppercase tracking-[0.3em] mb-2 drop-shadow-lg">
                {slide.title}
              </p>
              <p className="text-lg md:text-xl text-slate-200 font-semibold max-w-lg mx-auto leading-relaxed">
                {slide.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTAs - Centered */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 mb-16 w-full sm:w-auto justify-center items-center">
          <a
            href="https://wa.me/919824653242"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-4 md:px-12 md:py-5 rounded-full bg-blue-600 text-white font-black hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] hover:-translate-y-1.5 flex items-center justify-center gap-4 text-lg md:text-xl w-full sm:w-auto"
          >
            Get Free Site Inspection
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
          <Link
            href="#services"
            className="group px-10 py-4 md:px-12 md:py-5 rounded-full border border-white/30 bg-white/5 backdrop-blur-xl text-white font-black hover:bg-white/10 transition-all flex items-center justify-center gap-4 text-lg md:text-xl w-full sm:w-auto hover:-translate-y-1.5"
          >
            Explore Services
            <ArrowDown className="w-6 h-6 group-hover:translate-y-2 transition-transform text-blue-400" />
          </Link>
        </div>

        {/* Quick Stats Bar (Floating at bottom) - Shifted slightly up */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 border-t border-white/10 pt-16 w-full max-w-6xl mx-auto relative -top-8">
            {[
                { label: "Projects Completed", value: "500+" },
                { label: "Cooling Capacity", value: "10K+ TR" },
                { label: "Expert Engineers", value: "25+" },
                { label: "Years Excellence", value: "30+" }
            ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center group cursor-default">
                    <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter group-hover:text-blue-400 transition-colors duration-300">{stat.value}</span>
                    <span className="text-[10px] md:text-xs font-black text-blue-500 uppercase tracking-[0.2em] group-hover:text-white transition-colors duration-300">{stat.label}</span>
                </div>
            ))}
        </div>

        {/* Carousel Dots - Positioned for better visibility */}
        <div className="mt-12 flex gap-6">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-700 ${
                idx === activeIndex ? 'w-16 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : 'w-5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
