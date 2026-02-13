'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Snowflake, ShieldCheck, Wrench, Wind, Smartphone, Route, ArrowRight } from 'lucide-react'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "HVAC Installation",
    description: "VRF & DX systems tailored for luxury homes (4BHK+) and commercial offices.",
    icon: Snowflake,
  },
  {
    title: "Maintenance (AMC)",
    description: "Comprehensive and non-comprehensive contracts. Seasonal tune-ups.",
    icon: ShieldCheck,
  },
  {
    title: "Repairs & Emergency",
    description: "Fast diagnosis and breakdown support. Minimal downtime for your comfort.",
    icon: Wrench,
  },
  {
    title: "Indoor Air Quality",
    description: "Advanced filtration and ventilation solutions for a healthier living environment.",
    icon: Wind,
  },
  {
    title: "Smart Controls",
    description: "Zone control systems and smart thermostat integration for intuitive management.",
    icon: Smartphone,
  },
  {
    title: "Ductwork Design",
    description: "Professional layout planning, testing, and balancing (TAB) for optimal airflow.",
    icon: Route,
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)
    
    gsap.fromTo(cards, 
      { 
        y: 30, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{
             backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
           }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-blue-100">
             Technical Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Engineering-Grade <br/>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Climate Solutions
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Comprehensive HVAC services designed for performance, efficiency, and longevity.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-500/30 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden"
            >
              {/* Technical Index Number */}
              <div className="absolute -top-2 -right-2 text-8xl font-bold text-slate-50/80 select-none z-0 transition-colors group-hover:text-blue-50/50" 
                   style={{ fontFamily: 'var(--font-heading, sans-serif)' }}>
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon Container */}
              <div className="relative z-10 w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm group-hover:shadow-blue-300/50">
                <service.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="relative z-10 text-slate-600 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              {/* CTA Link */}
              <div className="relative z-10 flex items-center text-slate-400 font-semibold text-sm mt-auto transition-all duration-300 group-hover:text-blue-600">
                <span className="mr-2">Explore System</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
