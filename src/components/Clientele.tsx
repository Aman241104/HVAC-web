'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const clients = [
  { name: 'ITC Limited' },
  { name: 'JBM Group' },
  { name: 'LJS' },
  { name: 'Laxcon Steels' },
  { name: 'Mitsui Chemicals' },
  { name: 'Tata Steel' },
  { name: 'Reliance Industries' },
  { name: 'HDFC Bank' },
  { name: 'ICICI Bank' },
]

export default function Clientele() {
  const container = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!marqueeRef.current) return

    const marquee = marqueeRef.current
    const items = marquee.children
    const totalWidth = marquee.scrollWidth / 2 // Since we duplicate

    const tween = gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: 'none',
      repeat: -1,
      paused: false,
    })

    const onMouseEnter = () => {
      gsap.to(tween, { timeScale: 0.2, duration: 0.5 })
    }

    const onMouseLeave = () => {
      gsap.to(tween, { timeScale: 1, duration: 0.5 })
    }

    marquee.addEventListener('mouseenter', onMouseEnter)
    marquee.addEventListener('mouseleave', onMouseLeave)

    return () => {
      marquee.removeEventListener('mouseenter', onMouseEnter)
      marquee.removeEventListener('mouseleave', onMouseLeave)
      tween.kill()
    }
  }, { scope: container })

  return (
    <section ref={container} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Our Esteem <br className="hidden md:block" />
              Clientele
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-slate-500 text-lg leading-relaxed">
              We cater to a wide spectrum of clients ranging from farmhouses to corporate houses, banking institutes, and more, delivering exceptional service and solutions tailored to their unique needs.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap items-center py-8"
        >
          {/* First set of clients */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={`c1-${index}`} 
              className="px-8 md:px-16 flex items-center justify-center group cursor-pointer"
            >
              <span className="text-2xl md:text-3xl font-semibold text-slate-400 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-110 relative">
                {client.name}
                <span className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </span>
            </div>
          ))}
          {/* Second set of clients for seamless loop */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={`c2-${index}`} 
              className="px-8 md:px-16 flex items-center justify-center group cursor-pointer"
            >
              <span className="text-2xl md:text-3xl font-semibold text-slate-400 group-hover:text-blue-600 transition-all duration-500 transform group-hover:scale-110 relative">
                {client.name}
                <span className="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </span>
            </div>
          ))}
        </div>
        
        {/* Side Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  )
}
