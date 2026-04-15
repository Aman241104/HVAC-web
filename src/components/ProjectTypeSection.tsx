'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Building2, Home, Store, Factory, Coffee, ShoppingBag, Landmark, Building } from 'lucide-react'

const projectTypes = [
  { title: "Showrooms", image: "/vadim-babenko-IUuVB1nLsQU-unsplash.jpg", icon: Store },
  { title: "Commercial Offices", image: "/kien-nguyen-3HuYNNM1-8w-unsplash.jpg", icon: Building2 },
  { title: "Complexes", image: "/raymond-yeung--BWDRf_mG9Q-unsplash.jpg", icon: Building },
  { title: "Factories", image: "/kettenreaktion-l_Vn4HlFQVw-unsplash.jpg", icon: Factory },
  { title: "Private Bungalows", image: "/konrad-koller-wvfvIAEXyNg-unsplash.jpg", icon: Home },
  { title: "Private Residences", image: "/declan-sun-lhvfvvvc8EE-unsplash.jpg", icon: Home },
  { title: "Cafes & Restaurants", image: "/nopparuj-lamaikul-FQNLeYAgBZg-unsplash.jpg", icon: Coffee },
  { title: "Malls & Recreational", image: "/my-nguyen-cqke385v2UI-unsplash.jpg", icon: ShoppingBag }
]

export default function ProjectTypeSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.type-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
            Where We Excel
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Tailored HVAC Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Every Architectural Type.
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
        </div>

        {/* 4x2 Grid (Desktop) / 2x4 Grid (Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {projectTypes.map((type, idx) => (
            <div 
              key={idx} 
              className="type-card group relative h-64 md:h-72 rounded-2xl overflow-hidden cursor-default"
            >
              {/* Image Background */}
              <Image 
                src={type.image} 
                alt={type.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-3 transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500">
                  <type.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
                  {type.title}
                </h3>
              </div>

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 h-1.5 bg-blue-600 transition-all duration-500 w-0 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
