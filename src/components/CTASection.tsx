'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Phone, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react'

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.cta-image', {
      x: -30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    })
    gsap.from('.cta-content', {
      x: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    })
  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 bg-slate-950 relative overflow-hidden"
    >
      {/* Engineering Background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
               backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', 
               backgroundSize: '80px 80px',
               maskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)',
               WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 100%)'
           }}>
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[3rem] shadow-2xl">
          
          {/* Left Side: Technical Impact Image */}
          <div className="cta-image relative w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <Image 
                src="/heber-davis-6V1gBwk38qU-unsplash.jpg" 
                alt="HVAC Precision Engineering" 
                fill 
                className="object-cover scale-105"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
            </div>
            
            {/* Floating Trust Card */}
            <div className="absolute -bottom-8 -right-8 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block border border-blue-400/30">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="font-black text-2xl text-white leading-none mb-1">#1 Rated</div>
                  <div className="text-blue-100 text-sm font-bold uppercase tracking-wider">Engineering Service</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: High-Conversion Content */}
          <div className="cta-content w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                    Connect With Experts
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                    Reach out <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">to our team.</span>
                </h2>
            </div>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-medium">
                Schedule a professional site evaluation and let our specialist engineers architect the perfect climate for your space.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 w-full sm:w-auto">
              {/* Main Button */}
              <a 
                href="#contact"
                className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                Request a Callback
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Contact Integration */}
              <div className="flex items-center gap-5 group py-2">
                 <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50 p-1 group-hover:border-blue-400 transition-colors">
                    <img 
                        src="https://lh3.googleusercontent.com/a-/ALV-EMisI1r-xI18rQfWvfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv_8vfv=s120-c-rp-mo-br100" 
                        alt="Expert Consultant" 
                        className="w-full h-full object-cover rounded-full"
                    />
                 </div>
                 <div className="flex flex-col items-start">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                            <Phone className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                            (+91) 98246 53242
                        </span>
                    </div>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 ml-13">Senior HVAC Consultant</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
