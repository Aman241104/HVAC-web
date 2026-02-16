'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from 'lucide-react'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: "01",
    title: "Skyline Penthouse",
    category: "VRF Installation",
    image: "/declan-sun-lhvfvvvc8EE-unsplash.jpg",
    size: "tall", // Row span 2
    area: "4,500 sqft",
    status: "Completed"
  },
  {
    id: "02",
    title: "Tech Park Office",
    category: "Ductable System",
    image: "/kien-nguyen-3HuYNNM1-8w-unsplash.jpg",
    size: "wide", // Col span 2
    area: "12,000 sqft",
    status: "In Progress"
  },
  {
    id: "03",
    title: "Lakeside Villa",
    category: "Retrofit",
    image: "/konrad-koller-wvfvIAEXyNg-unsplash.jpg",
    size: "standard", // Col span 1
    area: "3,200 sqft",
    status: "Completed"
  },
  {
    id: "04",
    title: "Boutique Showroom",
    category: "Cassette ACs",
    image: "/vadim-babenko-IUuVB1nLsQU-unsplash.jpg",
    size: "standard", // Col span 1
    area: "1,800 sqft",
    status: "Maintenance"
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean)

    gsap.fromTo(cards,
      {
        y: 60,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-slate-50 relative overflow-hidden">

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

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-blue-100">
              Featured Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Precision Installations <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Across Premium Spaces.
              </span>
            </h2>
            <p className="text-lg text-slate-600">
              From luxury villas to high-end commercial offices, we ensure our systems integrate seamlessly with your aesthetics.
            </p>
          </div>
          <a
            href="https://wa.me/919824653242?text=Hello%20VAER%20Team%2C%20I%20am%20interested%20in%20your%20premium%20HVAC%20engineering%20services.%20Can%20we%20schedule%20a%20site%20inspection%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-6 py-3 bg-transparent border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white rounded-full transition-all duration-300 font-medium cursor-pointer"
          >
            View More Projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] grid-flow-dense">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${project.size === 'tall' ? 'md:row-span-2' : ''
                } ${project.size === 'wide' ? 'md:col-span-2' : ''
                }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Corner Brackets (The Viewfinder) */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/50 group-hover:border-white transition-all duration-300 group-hover:top-5 group-hover:left-5" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white/50 group-hover:border-white transition-all duration-300 group-hover:top-5 group-hover:right-5" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-white/50 group-hover:border-white transition-all duration-300 group-hover:bottom-5 group-hover:left-5" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-white/50 group-hover:border-white transition-all duration-300 group-hover:bottom-5 group-hover:right-5" />

              {/* Project Index Tag */}
              <div className="absolute top-6 right-6 font-mono text-xs font-bold text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10 z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                PRJ-{project.id}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded-full mb-3 shadow-sm">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                  {project.title}
                </h3>

                {/* Data Reveal */}
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-sm text-slate-300 font-mono mt-2 border-t border-white/20 pt-2 flex gap-4">
                    <span>Area: {project.area}</span>
                    <span>•</span>
                    <span>Status: {project.status}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
