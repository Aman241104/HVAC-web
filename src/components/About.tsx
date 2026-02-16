'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Zap, Activity, Cpu, CircuitBoard } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "On-Time Delivery", value: 100, suffix: "%" },
  { label: "Emergency Support", value: 24, suffix: "/7" },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    // Animate Text and Checklist coming in from Left
    gsap.from('.about-text', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate Stat Grid coming in from Right
    gsap.from('.stats-grid', {
      x: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    // Counter Animation for Numbers — single trigger, robust approach
    const cards = statsRef.current.filter(Boolean)

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        cards.forEach((card, index) => {
          const valueDisplay = card?.querySelector('.stat-value')
          if (!valueDisplay) return

          const target = stats[index].value
          const obj = { val: 0 }

          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              valueDisplay.textContent = Math.round(obj.val).toString()
            },
            onComplete: () => {
              // Ensure final value is exact
              valueDisplay.textContent = target.toString()
            }
          })
        })
      }
    })

  }, { scope: containerRef })

  return (
    <section id="about" ref={containerRef} className="py-24 bg-white relative overflow-hidden">

      {/* Background: Technical Drawing Watermark */}
      <div className="absolute -left-20 top-20 w-[600px] h-[600px] opacity-[0.03] pointer-events-none rotate-12">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-900 fill-current">
          <path d="M100,20 C144.18,20 180,55.82 180,100 C180,144.18 144.18,180 100,180 C55.82,180 20,144.18 20,100 C20,55.82 55.82,20 100,20 Z M100,10 C50.29,10 10,50.29 10,100 C10,149.71 50.29,190 100,190 C149.71,190 190,149.71 190,100 C190,50.29 149.71,10 100,10 Z M100,40 C133.14,40 160,66.86 160,100 C160,133.14 133.14,160 100,160 C66.86,160 40,133.14 40,100 C40,66.86 66.86,40 100,40 Z M100,80 C111.05,80 120,88.95 120,100 C120,111.05 111.05,120 100,120 C88.95,120 80,111.05 80,100 C80,88.95 88.95,80 100,80 Z" />
          <rect x="95" y="0" width="10" height="200" />
          <rect x="0" y="95" width="200" height="10" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Narrative */}
          <div className="max-w-xl">
            <div className="about-text mb-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                Engineering Grade
              </span>
            </div>

            <h2 className="about-text text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              We Don&apos;t Just Install. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                We Engineer Comfort.
              </span>
            </h2>
            <p className="about-text text-lg text-slate-600 mb-8 leading-relaxed">
              Most contractors just hang a unit on the wall. We bridge the gap between architectural vision and technical performance. Using precision heat-load calculations and advanced duct design, we ensure your system is efficient, invisible, and silent.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { text: "Precision Heat Load Calculation", icon: Activity },
                { text: "Seamless Interior Integration", icon: CircuitBoard },
                { text: "Energy-Optimized VRF Systems", icon: Zap }
              ].map((item, i) => (
                <li key={i} className="about-text flex items-center bg-slate-50 border border-slate-100 rounded-xl p-3 text-slate-700 font-medium hover:border-blue-200 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-blue-600 mr-4 shadow-sm">
                    <item.icon className="w-4 h-4" />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Control Panel Stats Grid */}
          <div className="stats-grid bg-slate-200 p-[1px] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="bg-white rounded-[15px] overflow-hidden grid grid-cols-2 gap-[1px]">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => { statsRef.current[index] = el }}
                  className="bg-white p-8 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-52 hover:bg-slate-50 transition-colors duration-300 group"
                >
                  <div className="text-4xl md:text-5xl font-mono font-bold text-slate-900 mb-3 flex items-baseline tracking-tighter group-hover:text-blue-600 transition-colors">
                    <span className="stat-value">0</span>
                    <span className="text-2xl md:text-3xl ml-1 text-slate-400">{stat.suffix}</span>
                  </div>
                  <div className="text-slate-500 font-semibold text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
