'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Fan, ThermometerSnowflake, Wrench, Wind, ArrowRight, CornerDownRight } from 'lucide-react'

// Register plugins
gsap.registerPlugin(ScrollTrigger)

// Define Color Map to prevent Tailwind purging
const colorStyles = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hoverText: 'group-hover:text-blue-600',
    gradientTo: 'to-blue-50',
    iconText: 'text-blue-600'
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    hoverText: 'group-hover:text-emerald-600',
    gradientTo: 'to-emerald-50',
    iconText: 'text-emerald-600'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hoverText: 'group-hover:text-orange-600',
    gradientTo: 'to-orange-50',
    iconText: 'text-orange-600'
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    hoverText: 'group-hover:text-cyan-600',
    gradientTo: 'to-cyan-50',
    iconText: 'text-cyan-600'
  }
}

const services = [
  {
    title: 'Precision VRF Installation',
    description: 'Expert design and installation of Variable Refrigerant Flow systems for maximum efficiency in luxury homes and offices.',
    icon: Fan,
    features: ['Heat Load Calculation', 'Zoned Cooling', 'Concealed Ducting'],
    color: 'blue' as keyof typeof colorStyles,
    whatsappMessage: "I'm interested in a new VRF/HVAC installation for my space."
  },
  {
    title: 'Annual Maintenance (AMC)',
    description: 'Proactive maintenance plans to ensure your premium systems run at peak performance year-round.',
    icon: ThermometerSnowflake,
    features: ['Quarterly Deep Cleaning', 'Gas Level Checks', 'Priority Support'],
    color: 'emerald' as keyof typeof colorStyles,
    whatsappMessage: "I would like to inquire about an Annual Maintenance Contract for my HVAC systems."
  },
  {
    title: 'Rapid Repair & Service',
    description: 'Fast, diagnostic-led repair services for breakdowns. We fix what others can\'t.',
    icon: Wrench,
    features: ['24/7 Emergency Support', 'Genuine Spares', 'Technical Diagnostics'],
    color: 'orange' as keyof typeof colorStyles,
    whatsappMessage: "EMERGENCY: I need a technician for an urgent HVAC repair."
  },
  {
    title: 'Indoor Air Quality',
    description: 'Advanced filtration and ventilation solutions to keep your indoor air fresh, clean, and healthy.',
    icon: Wind,
    features: ['HEPA Filtration', 'Fresh Air Units (TFA)', 'Humidity Control'],
    color: 'cyan' as keyof typeof colorStyles,
    whatsappMessage: "I want to improve the air quality in my office/home. Tell me more about your IAQ solutions."
  }
]


export default function Services() {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Set initial hidden state via GSAP (not Tailwind) so GSAP controls visibility
    gsap.set('.section-header', { autoAlpha: 0, y: 30 })
    gsap.set('.service-card', { autoAlpha: 0, y: 50 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.to('.section-header',
      { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }
    )
      .to('.service-card',
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        '-=0.4'
      )

  }, { scope: containerRef })

  return (
    <section id="services" ref={containerRef} className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">

        <div className="section-header text-center mb-20">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Engineered for <span className="text-blue-600">Performance.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We don't just install ACs; we engineer climate control ecosystems tailored to your architectural vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => {
            const styles = colorStyles[service.color]

            return (
              <div
                key={index}
                className="service-card group relative bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white ${styles.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  {/* Icon & Index */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${styles.bg} flex items-center justify-center ${styles.iconText} group-hover:scale-110 transition-transform duration-500`}>
                      <service.icon className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold text-slate-900 mb-4 ${styles.hoverText} transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed h-20">
                    {service.description}
                  </p>

                  {/* Tech Specs */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <CornerDownRight className={`w-4 h-4 ${styles.iconText}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/919824653242?text=${encodeURIComponent(service.whatsappMessage)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`inline-flex items-center gap-2 text-sm font-bold ${styles.text} uppercase tracking-wider group/btn`}
                  >
                    Inquire Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
