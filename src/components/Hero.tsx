'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, ArrowDown, HardHat, Leaf, ShieldCheck, Activity } from 'lucide-react'

// Dynamically import the 3D component with no SSR to avoid hydration errors
const ACUnit3D = dynamic(() => import('./3d/ACUnit3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-50/50 rounded-3xl animate-pulse">
       <span className="text-slate-400 font-mono text-sm">Loading Model...</span>
    </div>
  )
})

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  
  // Refs for animation targets
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const visualContainerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const smartTagRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Entrance Animations
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
      ease: 'back.out(1.2)',
    }, '-=0.6')
    .from(smartTagRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.8,
    }, '-=0.8')
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, '-=0.6')
    // Target the class directly which is more robust
    .from('.trust-feature', { 
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      clearProps: 'all' // Ensure clean state after animation
    }, '-=0.4')

    // Smart Tag Floating Animation (Yoyo)
    gsap.to(smartTagRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    })

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

        {/* Central Visual 3D Container */}
        {/* Changed: Fixed height as requested for the 3D model container */}
        <div className="relative w-full max-w-5xl h-[500px] mb-8 -mt-4 z-10 touch-action-pan-y">
            
            {/* 3D Unit */}
            <div ref={visualContainerRef} className="w-full h-full drop-shadow-2xl">
                 <ACUnit3D />
            </div>

            {/* Smart Tag: "Air Quality" */}
            <div 
                ref={smartTagRef}
                className="absolute top-10 right-4 md:right-0 bg-white/70 backdrop-blur-md border border-white/50 shadow-lg rounded-xl p-4 flex flex-col items-start gap-1 z-30 transform md:translate-x-1/2"
            >
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600">
                        <Leaf className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Air Quality</span>
                </div>
                <div className="flex items-end gap-1 px-1">
                    <span className="text-xl font-bold text-emerald-600 leading-none">Excellent</span>
                    <span className="text-xs text-slate-400 font-medium mb-0.5">AQI 12</span>
                </div>
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
            <div className="trust-feature group bg-white/60 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 hover:scale-[1.02] cursor-default">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover:bg-blue-100 transition-colors">
                    <HardHat className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-0.5">Expert Engineers</h3>
                    <p className="text-slate-500 text-sm leading-snug">
                        Qualified professionals,<br/> not just mechanics.
                    </p>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="trust-feature group bg-white/60 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100 hover:scale-[1.02] cursor-default">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-100 transition-colors">
                    <Leaf className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-0.5">Energy Efficient</h3>
                    <p className="text-slate-500 text-sm leading-snug">
                        Right-sized systems for<br/> lower bills.
                    </p>
                </div>
            </div>

            {/* Feature 3 */}
            <div className="trust-feature group bg-white/60 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl flex items-center gap-5 text-left transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 hover:scale-[1.02] cursor-default">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-0.5">Reliable Support</h3>
                    <p className="text-slate-500 text-sm leading-snug">
                        Comprehensive<br/> after-sales care.
                    </p>
                </div>
            </div>

        </div>

      </div>
    </section>
  )
}
