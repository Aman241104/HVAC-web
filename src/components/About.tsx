'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Zap, HardHat, Headphones, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Years Experience", value: 8, suffix: "+" },
  { label: "On-Time Delivery", value: 100, suffix: "%" },
  { label: "Emergency Support", value: 24, suffix: "/7" },
]

const features = [
  { 
    title: "Trendsetters since 1990!", 
    subtitle: "Pioneering the industry with innovation and excellence for over three decades.",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  { 
    title: "Skilled & Trained Workforce", 
    subtitle: "Our team of experts, equipped with extensive training and skills, ensures top-notch service every time.",
    icon: HardHat,
    color: "text-red-600",
    bgColor: "bg-red-50"
  },
  { 
    title: "24/7 Dedicated Support", 
    subtitle: "We're here for you round the clock, providing unwavering support whenever you need us.",
    icon: Headphones,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50"
  }
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activeFeature, setActiveFeature] = useState<number | null>(null)

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

    // Counter Animation for Numbers
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
              valueDisplay.textContent = target.toString()
            }
          })
        })
      }
    })

  }, { scope: containerRef })

  return (
    <section id="about" ref={containerRef} className="py-16 md:py-24 bg-white relative overflow-hidden">

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
              Your Precision Cooling <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">
                Partner Since 1990.
              </span>
            </h2>
            <p className="about-text text-lg text-slate-600 mb-8 leading-relaxed">
              At VAER, we don&apos;t just install units; we engineer climate control ecosystems. Since our inception, we have set the benchmark for excellence in the HVAC industry, bridging the gap between complex architectural visions and high-performance technical execution. Each project is a testament to our attention to detail, innovative design, and seamless execution.
            </p>

            <div className="about-text space-y-4 mb-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className={`group cursor-pointer bg-white border rounded-2xl transition-all duration-300 ${
                    activeFeature === i 
                      ? 'border-blue-400 shadow-lg shadow-blue-50 scale-[1.02]' 
                      : 'border-slate-100 hover:border-slate-300'
                  }`}
                  onClick={() => setActiveFeature(activeFeature === i ? null : i)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                        {feature.title}
                      </h3>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFeature === i ? 'rotate-90 text-blue-500' : ''}`} />
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeFeature === i ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 pb-4 pt-0 pl-20">
                      <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-blue-100 pl-4">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Control Panel Stats Grid */}
          <div className="stats-grid bg-slate-200 p-[1px] rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
            <div className="bg-white rounded-[15px] overflow-hidden grid grid-cols-2 gap-[1px]">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => { statsRef.current[index] = el }}
                  className="bg-white p-4 sm:p-8 flex flex-col items-center justify-center text-center aspect-square md:aspect-auto md:h-52 hover:bg-slate-50 transition-colors duration-300 group"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold text-slate-900 mb-3 flex items-baseline tracking-tighter group-hover:text-blue-600 transition-colors">
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
